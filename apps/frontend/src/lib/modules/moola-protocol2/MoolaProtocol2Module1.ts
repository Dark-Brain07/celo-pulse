import { IMoolaProtocol2Module1 } from "../../../types/modules/moola-protocol2/IMoolaProtocol2Module1";

export class MoolaProtocol2Module1 implements IMoolaProtocol2Module1 {
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