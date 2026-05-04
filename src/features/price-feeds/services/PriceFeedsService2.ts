import { IPriceFeedsService2 } from "../types/IPriceFeedsService2";

export class PriceFeedsService2 implements IPriceFeedsService2 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040868511_0.7380740304212989