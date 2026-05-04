import { ICurveProtocol5Module36 } from "../../../types/modules/curve-protocol5/ICurveProtocol5Module36";

export class CurveProtocol5Module36 implements ICurveProtocol5Module36 {
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