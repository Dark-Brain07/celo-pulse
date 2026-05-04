import { IGasEstimator2Module13 } from "../../../types/modules/gas-estimator2/IGasEstimator2Module13";

export class GasEstimator2Module13 implements IGasEstimator2Module13 {
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