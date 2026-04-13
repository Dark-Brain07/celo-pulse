import { ICurveIntegrationService2 } from "../types/ICurveIntegrationService2";

export class CurveIntegrationService2 implements ICurveIntegrationService2 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040485292_0.2712327795581755