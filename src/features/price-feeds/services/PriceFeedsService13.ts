import { IPriceFeedsService13 } from "../types/IPriceFeedsService13";

export class PriceFeedsService13 implements IPriceFeedsService13 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040882082_0.29994302170503495