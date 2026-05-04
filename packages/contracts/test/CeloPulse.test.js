const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CeloPulse Contracts", function () {
  let activityManager, rewardDistributor, microActions, leaderboard;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const ActivityManager = await ethers.getContractFactory("ActivityManager");
    activityManager = await ActivityManager.deploy();

    const RewardDistributor = await ethers.getContractFactory("RewardDistributor");
    rewardDistributor = await RewardDistributor.deploy();

    const MicroActions = await ethers.getContractFactory("MicroActions");
    microActions = await MicroActions.deploy();

    const Leaderboard = await ethers.getContractFactory("Leaderboard");
    leaderboard = await Leaderboard.deploy();
  });

  describe("ActivityManager", function () {
    it("should allow daily check-in", async function () {
      await expect(activityManager.connect(user1).dailyCheckIn())
        .to.emit(activityManager, "CheckIn");

      const activity = await activityManager.getUserActivity(user1.address);
      expect(activity.checkIns).to.equal(1);
      expect(activity.currentStreak).to.equal(1);
    });

    it("should track unique users", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      await activityManager.connect(user2).dailyCheckIn();
      expect(await activityManager.totalUniqueUsers()).to.equal(2);
    });

    it("should enforce check-in cooldown", async function () {
      await activityManager.connect(user1).dailyCheckIn();
      await expect(
        activityManager.connect(user1).dailyCheckIn()
      ).to.be.revertedWith("CeloPulse: Check-in cooldown active");
    });
  });

  describe("RewardDistributor", function () {
    it("should accept pool funding", async function () {
      await expect(
        rewardDistributor.fundPool({ value: ethers.parseEther("1.0") })
      ).to.emit(rewardDistributor, "PoolFunded");

      expect(await rewardDistributor.rewardPool()).to.equal(ethers.parseEther("1.0"));
    });

    it("should accrue rewards", async function () {
      await rewardDistributor.accrueReward(user1.address);
      const info = await rewardDistributor.getUserRewardInfo(user1.address);
      expect(info.pending).to.be.gt(0);
    });
  });

  describe("MicroActions", function () {
    it("should allow sending tips", async function () {
      await expect(
        microActions.connect(user1).sendTip(user2.address, { value: ethers.parseEther("0.001") })
      ).to.emit(microActions, "TipSent");

      const stats = await microActions.getUserStats(user1.address);
      expect(stats.tipsSent).to.equal(1);
    });

    it("should allow playing actions", async function () {
      await expect(
        microActions.connect(user1).playAction()
      ).to.emit(microActions, "ActionPerformed");

      const stats = await microActions.getUserStats(user1.address);
      expect(stats.actionsPlayed).to.equal(1);
    });

    it("should prevent tipping yourself", async function () {
      await expect(
        microActions.connect(user1).sendTip(user1.address, { value: ethers.parseEther("0.001") })
      ).to.be.revertedWith("CeloPulse: Cannot tip yourself");
    });
  });

  describe("Leaderboard", function () {
    it("should track user scores", async function () {
      await leaderboard.recordCheckIn(user1.address);
      const score = await leaderboard.getUserScore(user1.address);
      expect(score.score).to.equal(10); // CHECK_IN_POINTS = 10
    });

    it("should return top users", async function () {
      await leaderboard.recordCheckIn(user1.address);
      await leaderboard.recordTip(user2.address);

      const result = await leaderboard.getTopUsers(0, 10);
      expect(result.users.length).to.equal(2);
    });
  });
});
