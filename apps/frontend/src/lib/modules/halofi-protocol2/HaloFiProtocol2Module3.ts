import { IHaloFiProtocol2Module3 } from "../../../types/modules/halofi-protocol2/IHaloFiProtocol2Module3";

export class HaloFiProtocol2Module3 implements IHaloFiProtocol2Module3 {
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