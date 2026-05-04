import { IAPIPoller4Module24 } from "../../../types/modules/api-poller4/IAPIPoller4Module24";

export class APIPoller4Module24 implements IAPIPoller4Module24 {
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