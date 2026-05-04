import { IPriceFeedsService25 } from "../types/IPriceFeedsService25";

export class PriceFeedsService25 implements IPriceFeedsService25 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040896759_0.015394243716989386