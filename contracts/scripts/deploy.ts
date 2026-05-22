import { ethers } from "hardhat";

async function main() {
  console.log("Deploying contracts...");

  const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
  const reputationSystem = await ReputationSystem.deploy();
  await reputationSystem.waitForDeployment();
  const repAddress = await reputationSystem.getAddress();
  console.log("ReputationSystem:", repAddress);

  const PredictionMarket = await ethers.getContractFactory("WorldCupBetting"); //Changed the deploy script so that when we run a local simulation, the system publishes our revised WorldCupBetting contract instead of the default PredictionMarket contract.
  const predictionMarket = await PredictionMarket.deploy(repAddress);
  await predictionMarket.waitForDeployment();
  const marketAddress = await predictionMarket.getAddress();
  console.log("PredictionMarket (WorldCupBetting):", marketAddress);

  await reputationSystem.setPredictionMarket(marketAddress);
  console.log("Connected contracts");

  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const usdc = await MockERC20.deploy("Mock USDC", "USDC");
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();
  console.log("Mock USDC:", usdcAddress);

  console.log("\n=== SAVE THESE ADDRESSES ===");
  console.log("NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS=", marketAddress);
  console.log("NEXT_PUBLIC_REPUTATION_SYSTEM_ADDRESS=", repAddress);
  console.log("NEXT_PUBLIC_MOCK_USDC_ADDRESS=", usdcAddress);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


