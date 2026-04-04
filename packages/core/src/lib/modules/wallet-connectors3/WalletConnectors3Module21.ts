import { IWalletConnectors3Module21 } from "../../../types/modules/wallet-connectors3/IWalletConnectors3Module21";

export class WalletConnectors3Module21 implements IWalletConnectors3Module21 {
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