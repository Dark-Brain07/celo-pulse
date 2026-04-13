import { ICurveIntegrationService3 } from "../types/ICurveIntegrationService3";

export class CurveIntegrationService3 implements ICurveIntegrationService3 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040486462_0.8294845574391374