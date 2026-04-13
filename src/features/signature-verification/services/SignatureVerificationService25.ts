import { ISignatureVerificationService25 } from "../types/ISignatureVerificationService25";

export class SignatureVerificationService25 implements ISignatureVerificationService25 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040607614_0.09540658194166074