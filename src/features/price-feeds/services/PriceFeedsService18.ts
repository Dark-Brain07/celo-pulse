import { IPriceFeedsService18 } from "../types/IPriceFeedsService18";

export class PriceFeedsService18 implements IPriceFeedsService18 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040888378_0.6278161418978463