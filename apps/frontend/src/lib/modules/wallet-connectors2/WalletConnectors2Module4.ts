import { IWalletConnectors2Module4 } from "../../../types/modules/wallet-connectors2/IWalletConnectors2Module4";

export class WalletConnectors2Module4 implements IWalletConnectors2Module4 {
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