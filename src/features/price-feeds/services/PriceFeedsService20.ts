import { IPriceFeedsService20 } from "../types/IPriceFeedsService20";

export class PriceFeedsService20 implements IPriceFeedsService20 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040890789_0.2897884824235024