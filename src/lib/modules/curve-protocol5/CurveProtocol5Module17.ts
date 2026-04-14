import { ICurveProtocol5Module17 } from "../../../types/modules/curve-protocol5/ICurveProtocol5Module17";

export class CurveProtocol5Module17 implements ICurveProtocol5Module17 {
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