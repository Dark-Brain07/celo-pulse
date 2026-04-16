"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers, BrowserProvider } from "ethers";

// ─── MiniPay Fee Abstraction ───
// USDm (cUSD) address for paying gas fees instead of CELO
export const CUSD_FEE_CURRENCY = {
  mainnet: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  alfajores: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
};

export interface WalletState {
  address: string | null;
  chainId: number | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  isMiniPay: boolean;
  error: Error | null;
  provider: BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

const INITIAL_STATE: WalletState = {
  address: null,
  chainId: null,
  balance: null,
  isConnected: false,
  isConnecting: true,
  isMiniPay: false,
  error: null,
  provider: null,
  signer: null,
};

/**
 * Detects if the current browser environment is MiniPay
 * MiniPay injects window.ethereum with isMiniPay = true
 */
function detectMiniPay(): boolean {
  if (typeof window === "undefined") return false;
  const eth = (window as any).ethereum;
  return !!(eth && eth.isMiniPay);
}

/**
 * Returns the correct feeCurrency address for USDm based on chain ID.
 * Use this in transaction overrides when running inside MiniPay.
 */
export function getFeeCurrency(chainId: number | null): string | undefined {
  if (chainId === 42220) return CUSD_FEE_CURRENCY.mainnet;
  if (chainId === 44787) return CUSD_FEE_CURRENCY.alfajores;
  return undefined;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>(INITIAL_STATE);

  useEffect(() => {
    const { ethereum } = window as any;
    
    if (ethereum) {
      const isMiniPay = detectMiniPay();
      const provider = new ethers.BrowserProvider(ethereum);
      
      const checkConnection = async () => {
        try {
          // MiniPay auto-connects — no popup needed
          if (isMiniPay) {
            await provider.send("eth_requestAccounts", []);
          }

          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            const balanceWei = await provider.getBalance(accounts[0].address);
            const balanceCelo = ethers.formatEther(balanceWei);

            setState({
              address: accounts[0].address,
              chainId: Number(network.chainId),
              balance: balanceCelo,
              isConnected: true,
              isConnecting: false,
              isMiniPay,
              error: null,
              provider,
              signer,
            });

            if (isMiniPay) {
              console.log("🟢 MiniPay detected — auto-connected, fee abstraction enabled");
            }
          } else {
            setState((prev) => ({ ...prev, isConnecting: false, isMiniPay }));
          }
        } catch (error) {
          console.error("Failed to check connection:", error);
          setState((prev) => ({ ...prev, isConnecting: false, isMiniPay, error: error as Error }));
        }
      };

      checkConnection();

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setState({ ...INITIAL_STATE, isConnecting: false, isMiniPay });
        } else {
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainChanged);

      return () => {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
        ethereum.removeListener("chainChanged", handleChainChanged);
      };
    } else {
      setState((prev) => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        throw new Error("No crypto wallet found. Please install MetaMask, MiniPay, or a Celo-compatible wallet.");
      }

      const isMiniPay = detectMiniPay();
      const provider = new ethers.BrowserProvider(ethereum);
      await provider.send("eth_requestAccounts", []);
      
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const address = await signer.getAddress();
      const balanceWei = await provider.getBalance(address);
      
      setState({
        address,
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balanceWei),
        isConnected: true,
        isConnecting: false,
        isMiniPay,
        error: null,
        provider,
        signer,
      });
    } catch (error) {
      setState((prev) => ({ 
        ...prev, 
        isConnecting: false, 
        error: error instanceof Error ? error : new Error("Failed to connect wallet") 
      }));
    }
  }, []);

  return { ...state, connect };
}
