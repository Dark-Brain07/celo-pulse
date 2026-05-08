import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { CONTRACTS } from "@/lib/contracts";

export function useReferral() {
  const { signer, address, isConnected } = useWallet();
  const [referralInput, setReferralInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!signer) return;
    setLoading(true);
    try {
      const contract = new ethers.Contract(
        CONTRACTS.REFERRAL_SYSTEM.address,
        CONTRACTS.REFERRAL_SYSTEM.abi,
        signer
      );

      let tx;
      if (referralInput && ethers.isAddress(referralInput)) {
        tx = await contract.registerWithReferral(referralInput);
        setToast("⏳ Registering with referral...");
      } else {
        tx = await contract.register();
        setToast("⏳ Registering...");
      }

      await tx.wait();
      setToast("✅ Registered successfully! Start earning points.");
    } catch (err: any) {
      setToast(`❌ ${err.reason || "Registration failed"}`);
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return {
    address,
    isConnected,
    referralInput,
    setReferralInput,
    loading,
    toast,
    handleRegister
  };
}
