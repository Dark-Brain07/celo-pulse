import { IGasEstimator2Module12 } from "../../../types/modules/gas-estimator2/IGasEstimator2Module12";

export class GasEstimator2Module12 implements IGasEstimator2Module12 {
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