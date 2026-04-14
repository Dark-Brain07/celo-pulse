import { ICurveProtocol5Module6 } from "../../../types/modules/curve-protocol5/ICurveProtocol5Module6";

export class CurveProtocol5Module6 implements ICurveProtocol5Module6 {
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