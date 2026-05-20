const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ActivityManager", function () {
  let activityManager;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("ActivityManager");
    activityManager = await Factory.deploy();
    await activityManager.waitForDeployment();
  });

  describe("Activity Tracking", function () {
    it("should record activity and emit event", async function () {
      await expect(activityManager.connect(user1).recordActivity())
        .to.emit(activityManager, "ActivityRecorded")
        .withArgs(user1.address, 1n, anyValue);
      
      const stats = await activityManager.getUserStats(user1.address);
      expect(stats.interactions).to.equal(1n);
    });

    it("should increment total interactions", async function () {
      await activityManager.connect(user1).recordActivity();
      await activityManager.connect(user2).recordActivity();
      expect(await activityManager.totalInteractions()).to.equal(2n);
    });
  });

  describe("Tiering System", function () {
    it("should start at Bronze tier (0)", async function () {
      const stats = await activityManager.getUserStats(user1.address);
      expect(stats.tier).to.equal(0); // Bronze
    });

    it("should upgrade to Silver tier (1) after 10 interactions", async function () {
      for (let i = 0; i < 9; i++) {
        await activityManager.connect(user1).recordActivity();
      }
      // 10th interaction triggers upgrade
      await expect(activityManager.connect(user1).recordActivity())
        .to.emit(activityManager, "TierUpdated")
        .withArgs(user1.address, 1, anyValue);
      
      const stats = await activityManager.getUserStats(user1.address);
      expect(stats.tier).to.equal(1);
    });

    it("should upgrade to Gold tier (2) after 50 interactions", async function () {
      // 50 interactions
      for (let i = 0; i < 50; i++) {
        await activityManager.connect(user1).recordActivity();
      }
      const stats = await activityManager.getUserStats(user1.address);
      expect(stats.tier).to.equal(2);
    });

    it("should upgrade to Platinum tier (3) after 100 interactions", async function () {
      // 100 interactions
      for (let i = 0; i < 100; i++) {
        await activityManager.connect(user1).recordActivity();
      }
      const stats = await activityManager.getUserStats(user1.address);
      expect(stats.tier).to.equal(3);
    });
  });

  describe("Pausability", function () {
    it("should allow owner to pause and unpause", async function () {
      await activityManager.pause();
      await expect(activityManager.connect(user1).recordActivity())
        .to.be.revertedWithCustomError(activityManager, "EnforcedPause");
      
      await activityManager.unpause();
      await expect(activityManager.connect(user1).recordActivity()).to.not.be.reverted;
    });

    it("should only allow owner to pause", async function () {
      await expect(activityManager.connect(user1).pause())
        .to.be.revertedWithCustomError(activityManager, "OwnableUnauthorizedAccount");
    });
  describe("Stress Testing", function () {
    it("should handle large volumes of sequential interactions", async function () {
      const largeCount = 150;
      for (let i = 0; i < largeCount; i++) {
        await activityManager.connect(user1).recordActivity();
      }
      const stats = await activityManager.getUserStats(user1.address);
      expect(stats.interactions).to.equal(BigInt(largeCount));
      expect(stats.tier).to.equal(3); // Platinum
    });

    it("should handle multi-user concurrent-like interactions", async function () {
      const users = await ethers.getSigners();
      // Test with first 10 signers
      for (let i = 0; i < 10; i++) {
        await activityManager.connect(users[i]).recordActivity();
      }
      expect(await activityManager.totalInteractions()).to.equal(10n);
    });
    });
  });

  describe("Edge Cases", function () {
    it("should revert setGasPriceOracle when given a zero address", async function () {
      await expect(activityManager.connect(owner).setGasPriceOracle("0x0000000000000000000000000000000000000000"))
        .to.be.revertedWith("Invalid oracle address");
    });

    it("should allow querying stats for a user with zero activity", async function () {
      const stats = await activityManager.getUserStats(user2.address);
      expect(stats.interactions).to.equal(0n);
      expect(stats.lastActive).to.equal(0n);
      expect(stats.tier).to.equal(0);
    });
  });
});

// Helper for matching timestamps
const anyValue = () => true;
