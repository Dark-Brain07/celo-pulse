import { ICurveIntegrationService1 } from "../types/ICurveIntegrationService1";

export class CurveIntegrationService1 implements ICurveIntegrationService1 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040484085_0.8519957032196424