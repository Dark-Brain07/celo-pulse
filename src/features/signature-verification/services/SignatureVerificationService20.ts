import { ISignatureVerificationService20 } from "../types/ISignatureVerificationService20";

export class SignatureVerificationService20 implements ISignatureVerificationService20 {
  public id = Math.random().toString(36);
  public status = 'active';
  public timestamp = Date.now();
}
// Ts: 1776040601791_0.6963324981706642