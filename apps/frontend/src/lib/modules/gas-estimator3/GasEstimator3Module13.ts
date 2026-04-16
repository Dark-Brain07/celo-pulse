import { IGasEstimator3Module13 } from "../../../types/modules/gas-estimator3/IGasEstimator3Module13";

export class GasEstimator3Module13 implements IGasEstimator3Module13 {
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