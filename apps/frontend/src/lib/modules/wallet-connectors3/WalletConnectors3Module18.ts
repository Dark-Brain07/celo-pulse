import { IWalletConnectors3Module18 } from "../../../types/modules/wallet-connectors3/IWalletConnectors3Module18";

export class WalletConnectors3Module18 implements IWalletConnectors3Module18 {
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