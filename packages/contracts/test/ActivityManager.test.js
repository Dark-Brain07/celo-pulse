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

  describe("User Registration", function () {
    it("should register a new user on first check-in", async function () {
      await expect(activityManager.connect(user1).dailyCheckIn())
        .to.emit(activityManager, "NewUser");
      expect(await activityManager.totalUniqueUsers()).to.equal(1n);
    });

    it("should not re-register an existing user", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      // Advance past cooldown
      await ethers.provider.send("evm_increaseTime", [72001]);
      await ethers.provider.send("evm_mine");
      // Second check-in should NOT emit NewUser
      const tx = await activityManager.connect(user1).dailyCheckIn();
      const receipt = await tx.wait();
      const newUserEvents = receipt.logs.filter(
        (log) => log.fragment && log.fragment.name === "NewUser"
      );
      expect(newUserEvents.length).to.equal(0);
    });
  });

  describe("Check-in Cooldown", function () {
    it("should enforce the 20-hour cooldown", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      await expect(
        activityManager.connect(user1).dailyCheckIn()
      ).to.be.revertedWith("CeloPulse: Check-in cooldown active");
    });

    it("should allow check-in after cooldown expires", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      await ethers.provider.send("evm_increaseTime", [72001]);
      await ethers.provider.send("evm_mine");
      await expect(activityManager.connect(user1).dailyCheckIn()).to.not.be.reverted;
    });

    it("canCheckIn should return false during cooldown", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      expect(await activityManager.canCheckIn(user1.address)).to.equal(false);
    });
  });

  describe("Streak Tracking", function () {
    it("should start streak at 1 on first check-in", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      const activity = await activityManager.getUserActivity(user1.address);
      expect(activity.currentStreak).to.equal(1n);
    });

    it("should increment streak within the 48h window", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      await ethers.provider.send("evm_increaseTime", [72001]);
      await ethers.provider.send("evm_mine");
      await activityManager.connect(user1).dailyCheckIn();
      const activity = await activityManager.getUserActivity(user1.address);
      expect(activity.currentStreak).to.equal(2n);
    });

    it("should reset streak after missing the 48h window", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      // Wait 49 hours — beyond the 48h grace period
      await ethers.provider.send("evm_increaseTime", [49 * 3600]);
      await ethers.provider.send("evm_mine");
      await activityManager.connect(user1).dailyCheckIn();
      const activity = await activityManager.getUserActivity(user1.address);
      expect(activity.currentStreak).to.equal(1n);
    });

    it("should track longest streak correctly", async function () {
      // Build a 3-day streak
      await activityManager.connect(user1).dailyCheckIn();
      for (let i = 0; i < 2; i++) {
        await ethers.provider.send("evm_increaseTime", [72001]);
        await ethers.provider.send("evm_mine");
        await activityManager.connect(user1).dailyCheckIn();
      }
      const activity = await activityManager.getUserActivity(user1.address);
      expect(activity.longestStreak).to.equal(3n);
    });
  });

  describe("Global Counters", function () {
    it("should increment totalCheckIns per check-in", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      await activityManager.connect(user2).dailyCheckIn();
      expect(await activityManager.totalCheckIns()).to.equal(2n);
    });

    it("should track active users list", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      await activityManager.connect(user2).dailyCheckIn();
      expect(await activityManager.getActiveUsersCount()).to.equal(2n);
    });
  });

  describe("Record Action (External)", function () {
    it("should allow recording external actions", async function () {
      await activityManager.recordAction(user1.address);
      const activity = await activityManager.getUserActivity(user1.address);
      expect(activity.actions).to.equal(1n);
    });

    it("should auto-register user when recording action", async function () {
      await activityManager.recordAction(user1.address);
      expect(await activityManager.totalUniqueUsers()).to.equal(1n);
    });
  });
});
