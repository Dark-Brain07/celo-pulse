import { IWalletConnectors5Module32 } from "../../../types/modules/wallet-connectors5/IWalletConnectors5Module32";

export class WalletConnectors5Module32 implements IWalletConnectors5Module32 {
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