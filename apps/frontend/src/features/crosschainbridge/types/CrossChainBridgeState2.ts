export interface ICrossChainBridgeState2 {
  isLoading: boolean;
  hasError: boolean;
  dataPayload: null | Record<string, unknown>;
  lastUpdated: number;
}