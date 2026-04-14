import { ICurveProtocol5Module3 } from "../../../types/modules/curve-protocol5/ICurveProtocol5Module3";

export class CurveProtocol5Module3 implements ICurveProtocol5Module3 {
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