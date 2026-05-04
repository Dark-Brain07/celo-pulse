import { ICurveProtocol2Module14 } from "../../../types/modules/curve-protocol2/ICurveProtocol2Module14";

export class CurveProtocol2Module14 implements ICurveProtocol2Module14 {
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