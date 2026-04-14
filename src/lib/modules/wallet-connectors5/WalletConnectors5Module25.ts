import { IWalletConnectors5Module25 } from "../../../types/modules/wallet-connectors5/IWalletConnectors5Module25";

export class WalletConnectors5Module25 implements IWalletConnectors5Module25 {
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