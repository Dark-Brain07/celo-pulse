import { ILoggingSentry5Module14 } from "../../../types/modules/logging-sentry5/ILoggingSentry5Module14";

export class LoggingSentry5Module14 implements ILoggingSentry5Module14 {
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