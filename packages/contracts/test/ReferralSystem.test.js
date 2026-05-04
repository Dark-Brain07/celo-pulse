const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReferralSystem", function () {
  let referralSystem;
  let owner, referrer, referee, user3;

  beforeEach(async function () {
    [owner, referrer, referee, user3] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("ReferralSystem");
    referralSystem = await Factory.deploy();
    await referralSystem.waitForDeployment();
  });

  describe("Registration Without Referral", function () {
    it("should allow a user to register independently", async function () {
      await expect(referralSystem.connect(referrer).register())
        .to.emit(referralSystem, "UserRegistered");
      expect(await referralSystem.totalRegistered()).to.equal(1n);
    });

    it("should reject duplicate registration", async function () {
      await referralSystem.connect(referrer).register();
      await expect(
        referralSystem.connect(referrer).register()
      ).to.be.revertedWith("CeloPulse: Already registered");
    });
  });

  describe("Registration With Referral", function () {
    beforeEach(async function () {
      // Register the referrer first
      await referralSystem.connect(referrer).register();
    });

    it("should register a user with a valid referrer", async function () {
      await expect(
        referralSystem.connect(referee).registerWithReferral(referrer.address)
      ).to.emit(referralSystem, "UserRegistered");

      expect(await referralSystem.totalReferrals()).to.equal(1n);
    });

    it("should reject self-referral", async function () {
      await expect(
        referralSystem.connect(referee).registerWithReferral(referee.address)
      ).to.be.revertedWith("CeloPulse: Cannot refer yourself");
    });

    it("should reject zero-address referrer", async function () {
      await expect(
        referralSystem.connect(referee).registerWithReferral(ethers.ZeroAddress)
      ).to.be.revertedWith("CeloPulse: Invalid referrer");
    });

    it("should track referrer's referred users", async function () {
      await referralSystem.connect(referee).registerWithReferral(referrer.address);
      const referred = await referralSystem.getReferredUsers(referrer.address);
      expect(referred.length).to.equal(1);
      expect(referred[0]).to.equal(referee.address);
    });

    it("should increment referrer's referral count", async function () {
      await referralSystem.connect(referee).registerWithReferral(referrer.address);
      const info = await referralSystem.getUserReferralInfo(referrer.address);
      expect(info.referralCount).to.equal(1n);
    });
  });

  describe("Reward Distribution", function () {
    beforeEach(async function () {
      await referralSystem.connect(referrer).register();
      // Fund the reward pool
      await referralSystem.fundPool({ value: ethers.parseEther("1.0") });
    });

    it("should pay rewards when pool is funded", async function () {
      const referrerBalBefore = await ethers.provider.getBalance(referrer.address);
      await referralSystem.connect(referee).registerWithReferral(referrer.address);
      const referrerBalAfter = await ethers.provider.getBalance(referrer.address);

      // Referrer should have received 0.0005 CELO
      expect(referrerBalAfter).to.be.gt(referrerBalBefore);
    });

    it("should emit ReferralRewardPaid event", async function () {
      await expect(
        referralSystem.connect(referee).registerWithReferral(referrer.address)
      ).to.emit(referralSystem, "ReferralRewardPaid");
    });

    it("should decrease the reward pool after payout", async function () {
      const poolBefore = await referralSystem.rewardPool();
      await referralSystem.connect(referee).registerWithReferral(referrer.address);
      const poolAfter = await referralSystem.rewardPool();
      expect(poolAfter).to.be.lt(poolBefore);
    });
  });

  describe("Pool Funding", function () {
    it("should accept direct ETH transfers to fund the pool", async function () {
      await expect(
        owner.sendTransaction({
          to: await referralSystem.getAddress(),
          value: ethers.parseEther("0.5"),
        })
      ).to.emit(referralSystem, "PoolFunded");
    });

    it("should accept funding via fundPool()", async function () {
      await referralSystem.fundPool({ value: ethers.parseEther("0.1") });
      expect(await referralSystem.rewardPool()).to.equal(ethers.parseEther("0.1"));
    });
  });

  describe("Admin Functions", function () {
    it("should allow owner to set reward amounts", async function () {
      await referralSystem.connect(owner).setRewards(
        ethers.parseEther("0.001"),
        ethers.parseEther("0.0005")
      );
      expect(await referralSystem.referrerReward()).to.equal(ethers.parseEther("0.001"));
      expect(await referralSystem.refereeReward()).to.equal(ethers.parseEther("0.0005"));
    });

    it("should reject non-owner from setting rewards", async function () {
      await expect(
        referralSystem.connect(referee).setRewards(100, 50)
      ).to.be.reverted;
    });
  });
});

async function getTimestamp() {
  const block = await ethers.provider.getBlock("latest");
  return BigInt(block.timestamp);
}
