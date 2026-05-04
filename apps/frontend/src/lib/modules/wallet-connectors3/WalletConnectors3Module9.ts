import { IWalletConnectors3Module9 } from "../../../types/modules/wallet-connectors3/IWalletConnectors3Module9";

export class WalletConnectors3Module9 implements IWalletConnectors3Module9 {
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