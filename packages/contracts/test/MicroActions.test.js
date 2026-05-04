const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MicroActions", function () {
  let microActions;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MicroActions");
    microActions = await Factory.deploy();
    await microActions.waitForDeployment();
  });

  describe("Micro-Tips", function () {
    it("should allow sending a tip to another user", async function () {
      const tipAmount = ethers.parseEther("0.001");
      await expect(
        microActions.connect(user1).sendTip(user2.address, { value: tipAmount })
      ).to.emit(microActions, "TipSent")
        .withArgs(user1.address, user2.address, tipAmount, await getTimestamp());
    });

    it("should reject zero-value tips", async function () {
      await expect(
        microActions.connect(user1).sendTip(user2.address, { value: 0 })
      ).to.be.revertedWith("CeloPulse: Tip must be > 0");
    });

    it("should reject self-tipping", async function () {
      await expect(
        microActions.connect(user1).sendTip(user1.address, { value: 100 })
      ).to.be.revertedWith("CeloPulse: Cannot tip yourself");
    });

    it("should track tip stats for sender and receiver", async function () {
      const tipAmount = ethers.parseEther("0.001");
      await microActions.connect(user1).sendTip(user2.address, { value: tipAmount });

      const senderStats = await microActions.getUserStats(user1.address);
      expect(senderStats.tipsSent).to.equal(1n);
      expect(senderStats.tipAmount).to.equal(tipAmount);

      const receiverStats = await microActions.getUserStats(user2.address);
      expect(receiverStats.tipsReceived).to.equal(1n);
    });

    it("should increment global tip counters", async function () {
      const tipAmount = ethers.parseEther("0.002");
      await microActions.connect(user1).sendTip(user2.address, { value: tipAmount });

      const globalStats = await microActions.getGlobalStats();
      expect(globalStats.tips).to.equal(1n);
      expect(globalStats.volume).to.equal(tipAmount);
    });
  });

  describe("Play Action", function () {
    it("should allow playing an action", async function () {
      await expect(microActions.connect(user1).playAction())
        .to.emit(microActions, "ActionPerformed");
    });

    it("should enforce 30-second cooldown", async function () {
      await microActions.connect(user1).playAction();
      await expect(
        microActions.connect(user1).playAction()
      ).to.be.revertedWith("CeloPulse: Action cooldown active");
    });

    it("should allow action after cooldown", async function () {
      await microActions.connect(user1).playAction();
      await ethers.provider.send("evm_increaseTime", [31]);
      await ethers.provider.send("evm_mine");
      await expect(microActions.connect(user1).playAction()).to.not.be.reverted;
    });

    it("should emit ActionCombo every 5 actions", async function () {
      for (let i = 0; i < 4; i++) {
        await microActions.connect(user1).playAction();
        await ethers.provider.send("evm_increaseTime", [31]);
        await ethers.provider.send("evm_mine");
      }
      // Fifth action should trigger combo
      await expect(microActions.connect(user1).playAction())
        .to.emit(microActions, "ActionCombo");
    });

    it("should track total actions globally", async function () {
      await microActions.connect(user1).playAction();
      await microActions.connect(user2).playAction();
      expect(await microActions.totalActions()).to.equal(2n);
    });
  });

  describe("Quick React", function () {
    it("should allow valid reaction types (1-5)", async function () {
      await expect(microActions.connect(user1).quickReact(3)).to.not.be.reverted;
    });

    it("should reject invalid reaction type 0", async function () {
      await expect(
        microActions.connect(user1).quickReact(0)
      ).to.be.revertedWith("CeloPulse: Invalid reaction");
    });

    it("should reject invalid reaction type 6", async function () {
      await expect(
        microActions.connect(user1).quickReact(6)
      ).to.be.revertedWith("CeloPulse: Invalid reaction");
    });

    it("should share cooldown with playAction", async function () {
      await microActions.connect(user1).playAction();
      await expect(
        microActions.connect(user1).quickReact(1)
      ).to.be.revertedWith("CeloPulse: Cooldown active");
    });
  });

  describe("View Functions", function () {
    it("canPlayAction should return true initially", async function () {
      expect(await microActions.canPlayAction(user1.address)).to.equal(true);
    });

    it("canPlayAction should return false during cooldown", async function () {
      await microActions.connect(user1).playAction();
      expect(await microActions.canPlayAction(user1.address)).to.equal(false);
    });
  });
});

// Helper to get latest block timestamp
async function getTimestamp() {
  const block = await ethers.provider.getBlock("latest");
  return BigInt(block.timestamp);
}
