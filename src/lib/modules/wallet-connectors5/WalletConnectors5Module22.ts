import { IWalletConnectors5Module22 } from "../../../types/modules/wallet-connectors5/IWalletConnectors5Module22";

export class WalletConnectors5Module22 implements IWalletConnectors5Module22 {
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