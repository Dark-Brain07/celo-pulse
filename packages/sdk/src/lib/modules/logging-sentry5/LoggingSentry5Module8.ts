import { ILoggingSentry5Module8 } from "../../../types/modules/logging-sentry5/ILoggingSentry5Module8";

export class LoggingSentry5Module8 implements ILoggingSentry5Module8 {
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