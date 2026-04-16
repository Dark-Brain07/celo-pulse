const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying CeloPulse contracts to", hre.network.name, "...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Deployer:", deployer.address);
  console.log("💰 Balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "CELO\n");

  const deployed = {};

  // 1. Deploy ActivityManager
  console.log("1️⃣  Deploying ActivityManager...");
  const ActivityManager = await hre.ethers.getContractFactory("ActivityManager");
  const activityManager = await ActivityManager.deploy();
  await activityManager.waitForDeployment();
  deployed.activityManager = await activityManager.getAddress();
  console.log("   ✅ ActivityManager:", deployed.activityManager);

  // 2. Deploy RewardDistributor
  console.log("2️⃣  Deploying RewardDistributor...");
  const RewardDistributor = await hre.ethers.getContractFactory("RewardDistributor");
  const rewardDistributor = await RewardDistributor.deploy();
  await rewardDistributor.waitForDeployment();
  deployed.rewardDistributor = await rewardDistributor.getAddress();
  console.log("   ✅ RewardDistributor:", deployed.rewardDistributor);

  // 3. Deploy MicroActions
  console.log("3️⃣  Deploying MicroActions...");
  const MicroActions = await hre.ethers.getContractFactory("MicroActions");
  const microActions = await MicroActions.deploy();
  await microActions.waitForDeployment();
  deployed.microActions = await microActions.getAddress();
  console.log("   ✅ MicroActions:", deployed.microActions);

  // 4. Deploy Leaderboard
  console.log("4️⃣  Deploying Leaderboard...");
  const Leaderboard = await hre.ethers.getContractFactory("Leaderboard");
  const leaderboard = await Leaderboard.deploy();
  await leaderboard.waitForDeployment();
  deployed.leaderboard = await leaderboard.getAddress();
  console.log("   ✅ Leaderboard:", deployed.leaderboard);

  // 5. Deploy ReferralSystem
  console.log("5️⃣  Deploying ReferralSystem...");
  const ReferralSystem = await hre.ethers.getContractFactory("ReferralSystem");
  const referralSystem = await ReferralSystem.deploy();
  await referralSystem.waitForDeployment();
  deployed.referralSystem = await referralSystem.getAddress();
  console.log("   ✅ ReferralSystem:", deployed.referralSystem);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 ALL 5 CONTRACTS DEPLOYED SUCCESSFULLY!");
  console.log("=".repeat(60));
  console.log(`
Add these to your .env:

NEXT_PUBLIC_CONTRACT_ACTIVITY_MANAGER=${deployed.activityManager}
NEXT_PUBLIC_CONTRACT_REWARD_DISTRIBUTOR=${deployed.rewardDistributor}
NEXT_PUBLIC_CONTRACT_MICRO_ACTIONS=${deployed.microActions}
NEXT_PUBLIC_CONTRACT_LEADERBOARD=${deployed.leaderboard}
NEXT_PUBLIC_CONTRACT_REFERRAL_SYSTEM=${deployed.referralSystem}
  `);

  // ─── Blockscout Verification ───
  if (hre.network.name !== "hardhat") {
    console.log("\n🔍 Verifying contracts on Blockscout...\n");

    const contracts = [
      { name: "ActivityManager", address: deployed.activityManager },
      { name: "RewardDistributor", address: deployed.rewardDistributor },
      { name: "MicroActions", address: deployed.microActions },
      { name: "Leaderboard", address: deployed.leaderboard },
      { name: "ReferralSystem", address: deployed.referralSystem },
    ];

    for (const contract of contracts) {
      try {
        console.log(`   Verifying ${contract.name}...`);
        await hre.run("verify:verify", {
          address: contract.address,
          constructorArguments: [],
        });
        console.log(`   ✅ ${contract.name} verified!`);
      } catch (err) {
        if (err.message.includes("Already Verified")) {
          console.log(`   ℹ️ ${contract.name} already verified.`);
        } else {
          console.log(`   ⚠️ ${contract.name} verification failed:`, err.message);
        }
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
