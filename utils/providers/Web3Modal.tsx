"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { useEffect, useState } from "react";

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT!;

// 2. Set chains
const mainnetChains = [
  {
    chainId: 1,
    currency: "ETH",
    name: "Ethereum",
    explorerUrl: "https://etherscan.io/",
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env
      .NEXT_PUBLIC_ALCHEMY_ETHEREUM_MAINNET!}`,
  },
  {
    chainId: 137,
    currency: "MATIC",
    name: "Polygon",
    explorerUrl: "https://polygonscan.com/",
    rpcUrl: "https://polygon.llamarpc.com/",
  },
  {
    chainId: 56,
    currency: "BNB",
    name: "Binance",
    explorerUrl: "https://bscscan.com/",
    rpcUrl: "https://binance.llamarpc.com",
  },
  {
    chainId: 43114,
    currency: "AVAX",
    name: "Avalanche",
    explorerUrl: "https://snowtrace.io/",
    rpcUrl: "https://avalanche.drpc.org/",
  },
  {
    chainId: 10,
    currency: "OP",
    name: "Optimism",
    explorerUrl: "https://optimistic.etherscan.io/",
    rpcUrl: "https://optimism.llamarpc.com",
  },
  {
    chainId: 42161,
    currency: "ARB",
    name: "Arbitum Mainnet",
    explorerUrl: "https://arbiscan.io/",
    rpcUrl: "https://arbitrum.llamarpc.com",
    // rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_MAINNET_RPC_URL!,
  },
  {
    chainId: 8453,
    currency: "BASE",
    name: "Base",
    explorerUrl: "https://basescan.org/",
    rpcUrl: "https://base.llamarpc.com",
  },
];

const testnetChains = [
  {
    chainId: 11155111,
    currency: "ETH",
    name: "Sepolia Testnet",
    explorerUrl: "https://sepolia.etherscan.io/",
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env
      .NEXT_PUBLIC_ALCHEMY_ETHEREUM_SEPOLIA!}`,
  },
  {
    chainId: 80001,
    currency: "MATIC",
    name: "Polygon Testnet",
    explorerUrl: "https://mumbai.polygonscan.com/",
    // rpcUrl: 'https://polygon-mumbai-pokt.nodies.app',
    rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env
      .NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET!}`,
  },
  {
    chainId: 97,
    currency: "BNB",
    name: "Binance Testnet",
    explorerUrl: "https://testnet.bscscan.com/",
    rpcUrl: "https://bsc-testnet.publicnode.com",
  },
  {
    chainId: 43113,
    currency: "AVAX",
    name: "Avalanche Testnet",
    explorerUrl: "https://testnet.snowtrace.io/",
    rpcUrl: "https://endpoints.omniatech.io/v1/avax/fuji/public",
  },
  {
    chainId: 420,
    currency: "OP",
    name: "Optimism Testnet",
    explorerUrl: "https://goerli-optimism.etherscan.io/",
    rpcUrl: "https://goerli.optimism.io",
  },
  {
    chainId: 421613,
    currency: "ARB",
    name: "Arbitrum Testnet",
    explorerUrl: "https://goerli.arbiscan.io/",
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_TESTNET_RPC_URL!,
  },
  {
    chainId: 84531,
    currency: "BASE",
    name: "Base Testnet",
    explorerUrl: "https://goerli.basescan.org/",
    rpcUrl: "https://base-goerli.publicnode.com",
  },
  // {
  //   chainId: 31337,
  //   currency: 'LOCAL',
  //   name: 'Mainnet Fork',
  //   explorerUrl: 'https://etherscan.io',
  //   rpcUrl: 'http://127.0.0.1:8545',
  // },
];

// const liveChains = IS_LOCAL ? testnetChains : mainnetChains;
export const liveChains =
  process.env.NEXT_PUBLIC_DEVELOPMENT_NODE_ENV === "development"
    ? testnetChains
    : mainnetChains;

// 3. Create modal
const metadata = {
  name: "Chainlink CCIP",
  description:
    "Chainlink Cross-Chain Interoperability Protocol (CCIP) Frontend for Constellation Hackathon",
  url: "https://ccip.randomizer.network",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: liveChains,
  projectId,
  chainImages: {
    11155111: "/images/networks/ethereum-eth-logo-diamond-purple.svg",
    80001: "/images/networks/polygon-matic-logo.svg",
  },
  termsConditionsUrl: "https://www.randomizer.network/terms-and-conditions",
  privacyPolicyUrl: "https://www.randomizer.network/privacy-policy",
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#FFFFFF",
    "--w3m-color-mix-strength": 20,
  },
});

export function Web3ModalProvider({ children }: any) {
  return <>{children}</>
}
