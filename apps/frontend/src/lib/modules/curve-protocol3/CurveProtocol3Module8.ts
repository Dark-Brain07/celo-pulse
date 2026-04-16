import { ICurveProtocol3Module8 } from "../../../types/modules/curve-protocol3/ICurveProtocol3Module8";

export class CurveProtocol3Module8 implements ICurveProtocol3Module8 {
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