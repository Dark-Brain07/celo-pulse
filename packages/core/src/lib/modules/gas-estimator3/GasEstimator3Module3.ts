import { IGasEstimator3Module3 } from "../../../types/modules/gas-estimator3/IGasEstimator3Module3";

export class GasEstimator3Module3 implements IGasEstimator3Module3 {
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