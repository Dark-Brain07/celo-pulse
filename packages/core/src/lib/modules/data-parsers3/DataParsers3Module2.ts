import { IDataParsers3Module2 } from "../../../types/modules/data-parsers3/IDataParsers3Module2";

export class DataParsers3Module2 implements IDataParsers3Module2 {
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