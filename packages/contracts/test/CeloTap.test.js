const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CeloTap Contract", function () {
  let celoTap;
  let owner, user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    const CeloTap = await ethers.getContractFactory("CeloTap");
    celoTap = await CeloTap.deploy();
  });

  describe("Operations", function () {
    it("should successfully emit Tap event on tap()", async function () {
      await expect(celoTap.connect(user1).tap())
        .to.emit(celoTap, "Tap")
        .withArgs(user1.address);
    });

    it("should successfully emit Beat event on beat()", async function () {
      await expect(celoTap.connect(user1).beat())
        .to.emit(celoTap, "Beat")
        .withArgs(user1.address);
    });

    it("should successfully emit Signal event on signal()", async function () {
      await expect(celoTap.connect(user1).signal())
        .to.emit(celoTap, "Signal")
        .withArgs(user1.address);
    });

    it("should verify PROJECT_ID constant value", async function () {
      const projectId = await celoTap.PROJECT_ID();
      expect(projectId).to.equal("CeloTap-RJ-2026Q2");
    });
  });
});
