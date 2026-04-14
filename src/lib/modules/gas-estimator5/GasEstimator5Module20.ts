import { IGasEstimator5Module20 } from "../../../types/modules/gas-estimator5/IGasEstimator5Module20";

export class GasEstimator5Module20 implements IGasEstimator5Module20 {
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