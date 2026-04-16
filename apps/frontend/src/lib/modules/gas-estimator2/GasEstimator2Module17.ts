import { IGasEstimator2Module17 } from "../../../types/modules/gas-estimator2/IGasEstimator2Module17";

export class GasEstimator2Module17 implements IGasEstimator2Module17 {
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