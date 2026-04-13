import { IPriceFeedsService5 } from "../types/IPriceFeedsService5";

export class PriceFeedsService5 implements IPriceFeedsService5 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040872306_0.12809092738974326