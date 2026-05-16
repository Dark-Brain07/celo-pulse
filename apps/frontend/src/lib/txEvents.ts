import { ITxSuccessEventPayload } from "./types";

const CELOPULSE_TX_SUCCESS_EVENT = "celopulse-tx-success";

/**
 * Dispatch a transaction success event to notify all listening UI components
 */
export function dispatchTxSuccess(payload: ITxSuccessEventPayload) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent<ITxSuccessEventPayload>(CELOPULSE_TX_SUCCESS_EVENT, {
      detail: payload,
    });
    window.dispatchEvent(event);
  }
}

/**
 * Subscribe to transaction success events
 * @returns an unsubscribe function
 */
export function subscribeTxSuccess(callback: (payload: ITxSuccessEventPayload) => void) {
  if (typeof window === "undefined") return () => {};

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ITxSuccessEventPayload>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };

  window.addEventListener(CELOPULSE_TX_SUCCESS_EVENT, handler);
  return () => {
    window.removeEventListener(CELOPULSE_TX_SUCCESS_EVENT, handler);
  };
}
