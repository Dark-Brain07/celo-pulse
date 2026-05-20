const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * SDK Integration Tests
 * Verifies that the on-chain logic remains compatible with the off-chain SDK expectations.
 */
describe("SDK Integration", function () {
  let activityManager;
  let microActions;
  let leaderboard;
  let owner, user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    const ActivityManager = await ethers.getContractFactory("ActivityManager");
    activityManager = await ActivityManager.deploy();

    const MicroActions = await ethers.getContractFactory("MicroActions");
    microActions = await MicroActions.deploy();

    const Leaderboard = await ethers.getContractFactory("Leaderboard");
    leaderboard = await Leaderboard.deploy();
  });

  it("should provide consistent stats for SDK consumption", async function () {
    await activityManager.connect(user1).recordActivity();
    
    const stats = await activityManager.getUserStats(user1.address);
    expect(stats.interactions).to.equal(1);
    expect(stats.tier).to.equal(0); // Bronze
  });

  it("should track micro-actions correctly for SDK analytics", async function () {
    await microActions.connect(user1).playAction();
    const stats = await microActions.getUserStats(user1.address);
    expect(stats.actionsPlayed).to.equal(1);
  });

  it("should verify administrative gas price oracle setter for SDK discovery", async function () {
    const dummyOracle = "0x0000000000000000000000000000000000000001";
    await activityManager.setGasPriceOracle(dummyOracle);
    expect(await activityManager.gasPriceOracle()).to.equal(dummyOracle);
  });

  it("should integrate Leaderboard points correctly on check-in activities", async function () {
    await leaderboard.connect(owner).recordCheckIn(user1.address);
    const scoreInfo = await leaderboard.getUserScore(user1.address);
    expect(scoreInfo.score).to.equal(10n); // CHECK_IN_POINTS = 10
    expect(scoreInfo.isActive).to.equal(true);
  });
});
