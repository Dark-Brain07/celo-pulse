import { IWalletConnectors5Module1 } from "../../../types/modules/wallet-connectors5/IWalletConnectors5Module1";

export class WalletConnectors5Module1 implements IWalletConnectors5Module1 {
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