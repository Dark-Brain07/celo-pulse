import { ICurveProtocol2Module21 } from "../../../types/modules/curve-protocol2/ICurveProtocol2Module21";

export class CurveProtocol2Module21 implements ICurveProtocol2Module21 {
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