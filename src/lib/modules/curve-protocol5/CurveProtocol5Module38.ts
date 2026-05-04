import { ICurveProtocol5Module38 } from "../../../types/modules/curve-protocol5/ICurveProtocol5Module38";

export class CurveProtocol5Module38 implements ICurveProtocol5Module38 {
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