import { ICurveProtocol3Module21 } from "../../../types/modules/curve-protocol3/ICurveProtocol3Module21";

export class CurveProtocol3Module21 implements ICurveProtocol3Module21 {
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