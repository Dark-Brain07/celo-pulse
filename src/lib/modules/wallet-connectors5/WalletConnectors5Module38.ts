import { IWalletConnectors5Module38 } from "../../../types/modules/wallet-connectors5/IWalletConnectors5Module38";

export class WalletConnectors5Module38 implements IWalletConnectors5Module38 {
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