import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { CONTRACTS } from "@/lib/contracts";

export function useReferral() {
  const { signer, address, isConnected } = useWallet();
  const [referralInput, setReferralInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!signer) return;
    setError(null);
    
    // Input Validation
    if (referralInput) {
      if (!ethers.isAddress(referralInput)) {
        setError("Invalid referral address format");
        setToast("❌ Invalid referral address format");
        setTimeout(() => setToast(null), 4000);
        return;
      }
      if (referralInput.toLowerCase() === address?.toLowerCase()) {
        setError("Cannot refer yourself");
        setToast("❌ Cannot refer yourself");
        setTimeout(() => setToast(null), 4000);
        return;
      }
    }

    setLoading(true);
    try {
      const contract = new ethers.Contract(
        CONTRACTS.REFERRAL_SYSTEM.address,
        CONTRACTS.REFERRAL_SYSTEM.abi,
        signer
      );

      let tx;
      if (referralInput) {
        tx = await contract.registerWithReferral(referralInput);
        setToast("⏳ Registering with referral...");
      } else {
        tx = await contract.register();
        setToast("⏳ Registering...");
      }

      await tx.wait();
      setToast("✅ Registered successfully! Start earning points.");
    } catch (err: any) {
      const errMsg = err.reason || "Registration failed";
      setError(errMsg);
      setToast(`❌ ${errMsg}`);
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
    error,
    toast,
    handleRegister
  };
}
