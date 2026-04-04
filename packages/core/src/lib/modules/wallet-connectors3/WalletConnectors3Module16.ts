import { IWalletConnectors3Module16 } from "../../../types/modules/wallet-connectors3/IWalletConnectors3Module16";

export class WalletConnectors3Module16 implements IWalletConnectors3Module16 {
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