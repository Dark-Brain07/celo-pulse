import { IGasEstimator2Module22 } from "../../../types/modules/gas-estimator2/IGasEstimator2Module22";

export class GasEstimator2Module22 implements IGasEstimator2Module22 {
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