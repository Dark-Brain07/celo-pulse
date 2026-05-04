import { IGasEstimator5Module26 } from "../../../types/modules/gas-estimator5/IGasEstimator5Module26";

export class GasEstimator5Module26 implements IGasEstimator5Module26 {
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