import { IGasEstimator5Module32 } from "../../../types/modules/gas-estimator5/IGasEstimator5Module32";

export class GasEstimator5Module32 implements IGasEstimator5Module32 {
  public id = Math.random().toString(36).substring(2, 9);
  public isActive = false;
  public createdAt = Date.now();
  public metadata: Record<string, any> = {};
  
  public init() {
    this.isActive = true;
    this.metadata['initializedAt'] = Date.now();
  }
  
  public destroy() {
    this.isActive = false;
  }
}