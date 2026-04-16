import { IMoolaProtocol3Module4 } from "../../../types/modules/moola-protocol3/IMoolaProtocol3Module4";

export class MoolaProtocol3Module4 implements IMoolaProtocol3Module4 {
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