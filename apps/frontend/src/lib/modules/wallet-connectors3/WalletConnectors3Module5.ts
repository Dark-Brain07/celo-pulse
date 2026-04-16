import { IWalletConnectors3Module5 } from "../../../types/modules/wallet-connectors3/IWalletConnectors3Module5";

export class WalletConnectors3Module5 implements IWalletConnectors3Module5 {
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