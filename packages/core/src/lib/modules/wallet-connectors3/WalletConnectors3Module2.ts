import { IWalletConnectors3Module2 } from "../../../types/modules/wallet-connectors3/IWalletConnectors3Module2";

export class WalletConnectors3Module2 implements IWalletConnectors3Module2 {
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