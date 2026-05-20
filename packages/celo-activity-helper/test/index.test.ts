import { CeloActivityHelper } from "../src/index";

describe("CeloActivityHelper Unit Tests", () => {
  let mockSignerOrProvider: any;
  let helper: CeloActivityHelper;

  beforeEach(() => {
    mockSignerOrProvider = {};
    // Instantiate helper with dummy addresses
    helper = new CeloActivityHelper(
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
      "0x0000000000000000000000000000000000000003",
      mockSignerOrProvider
    );
  });

  describe("calculateGasSavings", () => {
    it("should calculate correct savings for 100 transactions", () => {
      const results = helper.calculateGasSavings(100);
      expect(results.ethCostUSD).toBe(250);
      expect(results.celoCostUSD).toBe(0.1);
      expect(results.savingsUSD).toBe(249.9);
      expect(results.multiplier).toBe(2500);
    });

    it("should return zero when transaction count is zero", () => {
      const results = helper.calculateGasSavings(0);
      expect(results.ethCostUSD).toBe(0);
      expect(results.celoCostUSD).toBe(0);
      expect(results.savingsUSD).toBe(0);
    });

    it("should throw an error for negative inputs", () => {
      expect(() => helper.calculateGasSavings(-5)).toThrow("Transaction count cannot be negative");
    });
  });

  describe("calculateRealTimeGasSavings", () => {
    it("should calculate detailed savings correctly", () => {
      const gasUsed = 21000n;
      const celoGasPriceWei = 5000000000n; // 5 Gwei
      const ethGasPriceGwei = 30;

      const results = helper.calculateRealTimeGasSavings(gasUsed, celoGasPriceWei, ethGasPriceGwei);

      expect(results.gasUsed).toBe("21000");
      expect(results.celoCostUSD).toBeCloseTo((Number(gasUsed * celoGasPriceWei) / 1e18) * 0.85);
      expect(results.ethCostUSD).toBeCloseTo((Number(gasUsed * BigInt(ethGasPriceGwei) * 1000000000n) / 1e18) * 3200);
      expect(results.savingsUSD).toBe(results.ethCostUSD - results.celoCostUSD);
      expect(results.percentSavings).toBeGreaterThan(99);
    });
  });
});
