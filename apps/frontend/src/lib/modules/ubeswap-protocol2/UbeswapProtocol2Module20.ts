import { IUbeswapProtocol2Module20 } from "../../../types/modules/ubeswap-protocol2/IUbeswapProtocol2Module20";

export class UbeswapProtocol2Module20 implements IUbeswapProtocol2Module20 {
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