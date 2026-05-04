import { ILoggingSentry5Module23 } from "../../../types/modules/logging-sentry5/ILoggingSentry5Module23";

export class LoggingSentry5Module23 implements ILoggingSentry5Module23 {
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