import { IStateWallet2Module1 } from "../../../types/modules/state-wallet2/IStateWallet2Module1";

export class StateWallet2Module1 implements IStateWallet2Module1 {
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