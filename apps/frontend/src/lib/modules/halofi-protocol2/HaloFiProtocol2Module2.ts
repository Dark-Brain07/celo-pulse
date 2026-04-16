import { IHaloFiProtocol2Module2 } from "../../../types/modules/halofi-protocol2/IHaloFiProtocol2Module2";

export class HaloFiProtocol2Module2 implements IHaloFiProtocol2Module2 {
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