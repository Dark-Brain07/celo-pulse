import { IGasEstimator2Module23 } from "../../../types/modules/gas-estimator2/IGasEstimator2Module23";

export class GasEstimator2Module23 implements IGasEstimator2Module23 {
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