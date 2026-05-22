import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Prediction Market",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "c0f8641977717462c14175ed73010b98", //Enter a fallback projectId from WalletConnect to avoid application crash (error No projectId found ). 
  chains: [hardhat,sepolia], //add Hardhat so that this application can i running and testing into my local host
  ssr: true,
});
