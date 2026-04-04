"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers, BrowserProvider } from "ethers";

export interface WalletState {
  address: string | null;
  chainId: number | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  provider: BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

const INITIAL_STATE: WalletState = {
  address: null,
  chainId: null,
  balance: null,
  isConnected: false,
  isConnecting: true, // Optimistically assuming we might be connecting on load
  error: null,
  provider: null,
  signer: null,
};

export function useWallet() {
  const [state, setState] = useState<WalletState>(INITIAL_STATE);

  useEffect(() => {
    // Check if ethereum object exists on window
    const { ethereum } = window as any;
    
    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      
      const checkConnection = async () => {
        try {
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
              error: null,
              provider,
              signer,
            });
          } else {
            setState((prev) => ({ ...prev, isConnecting: false }));
          }
        } catch (error) {
          console.error("Failed to check connection:", error);
          setState((prev) => ({ ...prev, isConnecting: false, error: error as Error }));
        }
      };

      checkConnection();

      // Listen for account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Disconnected
          setState({ ...INITIAL_STATE, isConnecting: false });
        } else {
          // Re-check connection to get new signer/balance
          checkConnection();
        }
      };

      // Listen for chain changes
      const handleChainChanged = () => {
        // Recommendation from MetaMask is to reload the page on chain change
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
        throw new Error("No crypto wallet found. Please install MetaMask or a Celo-compatible wallet.");
      }

      const provider = new ethers.BrowserProvider(ethereum);
      // Request account access
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
