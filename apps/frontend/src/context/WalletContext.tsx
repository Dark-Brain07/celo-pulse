"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { CELO_CHAIN } from "@/lib/contracts";

// ─── MiniPay Fee Abstraction (cUSD) ───
// Allows MiniPay users to pay gas in cUSD instead of CELO
const CUSD_FEE_CURRENCY: Record<number, string> = {
  42220: "0x765DE816845861e75A25fCA122bb6898B8B1282a",  // Celo Mainnet
  44787: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",  // Alfajores Testnet
};

interface WalletContextType {
  address: string | null;
  signer: ethers.Signer | null;
  provider: ethers.BrowserProvider | null;
  isConnecting: boolean;
  isConnected: boolean;
  isMiniPay: boolean;
  chainId: number | null;
  balance: string;
  feeCurrency: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  signer: null,
  provider: null,
  isConnecting: false,
  isConnected: false,
  isMiniPay: false,
  chainId: null,
  balance: "0",
  feeCurrency: undefined,
  connect: async () => {},
  disconnect: () => {},
});

/**
 * Detects if the app is running inside MiniPay's WebView.
 * MiniPay injects window.ethereum with isMiniPay = true.
 */
function detectMiniPay(): boolean {
  if (typeof window === "undefined") return false;
  const eth = (window as any).ethereum;
  return !!(eth && eth.isMiniPay);
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState("0");
  const [isMiniPay, setIsMiniPay] = useState(false);

  // Get the correct feeCurrency address for the current chain
  const feeCurrency = isMiniPay && chainId ? CUSD_FEE_CURRENCY[chainId] : undefined;

  const switchToCelo = async (browserProvider: ethers.BrowserProvider) => {
    // Skip chain switching inside MiniPay — it's always on Celo
    if (detectMiniPay()) return;

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CELO_CHAIN.chainIdHex }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: CELO_CHAIN.chainIdHex,
            chainName: CELO_CHAIN.name,
            rpcUrls: [CELO_CHAIN.rpcUrl],
            blockExplorerUrls: [CELO_CHAIN.blockExplorer],
            nativeCurrency: CELO_CHAIN.nativeCurrency,
          }],
        });
      }
    }
  };

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("Please install MetaMask, MiniPay, or a Celo-compatible wallet!");
      return;
    }

    const miniPayDetected = detectMiniPay();
    setIsMiniPay(miniPayDetected);
    setIsConnecting(true);

    try {
      const browserProvider = new ethers.BrowserProvider((window as any).ethereum);
      await browserProvider.send("eth_requestAccounts", []);

      // Don't switch chains in MiniPay — it's always on Celo
      if (!miniPayDetected) {
        await switchToCelo(browserProvider);
      }

      const network = await browserProvider.getNetwork();
      const walletSigner = await browserProvider.getSigner();
      const walletAddress = await walletSigner.getAddress();
      const rawBalance = await browserProvider.getBalance(walletAddress);

      setProvider(browserProvider);
      setSigner(walletSigner);
      setAddress(walletAddress);
      setChainId(Number(network.chainId));
      setBalance(ethers.formatEther(rawBalance));

      if (miniPayDetected) {
        console.log("🟢 MiniPay detected — fee abstraction enabled (cUSD gas)");
      }
    } catch (err) {
      console.error("Connection failed:", err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setSigner(null);
    setProvider(null);
    setChainId(null);
    setBalance("0");
    setIsMiniPay(false);
  }, []);

  // Auto-connect if MiniPay is detected
  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return;

    const eth = (window as any).ethereum;
    const miniPayDetected = detectMiniPay();

    // MiniPay auto-connects without user interaction
    if (miniPayDetected) {
      connect();
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) disconnect();
      else connect();
    };

    const handleChainChanged = () => connect();

    eth.on("accountsChanged", handleAccountsChanged);
    eth.on("chainChanged", handleChainChanged);

    return () => {
      eth.removeListener("accountsChanged", handleAccountsChanged);
      eth.removeListener("chainChanged", handleChainChanged);
    };
  }, [connect, disconnect]);

  return (
    <WalletContext.Provider
      value={{
        address,
        signer,
        provider,
        isConnecting,
        isConnected: !!address,
        isMiniPay,
        chainId,
        balance,
        feeCurrency,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
