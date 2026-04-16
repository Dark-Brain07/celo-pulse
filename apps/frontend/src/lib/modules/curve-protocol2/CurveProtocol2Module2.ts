import { ICurveProtocol2Module2 } from "../../../types/modules/curve-protocol2/ICurveProtocol2Module2";

export class CurveProtocol2Module2 implements ICurveProtocol2Module2 {
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