import { IAPIPoller4Module16 } from "../../../types/modules/api-poller4/IAPIPoller4Module16";

export class APIPoller4Module16 implements IAPIPoller4Module16 {
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