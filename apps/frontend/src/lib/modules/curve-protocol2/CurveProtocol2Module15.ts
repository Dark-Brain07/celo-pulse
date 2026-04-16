import { ICurveProtocol2Module15 } from "../../../types/modules/curve-protocol2/ICurveProtocol2Module15";

export class CurveProtocol2Module15 implements ICurveProtocol2Module15 {
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