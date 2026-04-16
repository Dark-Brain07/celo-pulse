import { IWalletConnectors3Module11 } from "../../../types/modules/wallet-connectors3/IWalletConnectors3Module11";

export class WalletConnectors3Module11 implements IWalletConnectors3Module11 {
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