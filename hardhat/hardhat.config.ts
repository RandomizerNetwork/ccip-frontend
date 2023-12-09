import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

import dotenv from "dotenv";
dotenv.config();

const {
  REPORT_GAS_TOKEN,
  REPORT_GAS_API,
  ALCHEMY_MAINNET,
  ALCHEMY_GOERLI,
  ALCHEMY_POLYGON,
  ALCHEMY_MUMBAI,
  PRIVATE_KEY,
  PRIVATE_KEY_2,
  REPORT_GAS,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  CMC,
  ALCHEMY_SEPOLIA,
  FUJI,
  FUJI_EXPLORER_API_KEY
} = process.env;

const config: HardhatUserConfig = {
  networks: {
    localFork: {
      url: "http://127.0.0.1:8545/",
      accounts: [PRIVATE_KEY!],
    },
    mainnet: {
      url: ALCHEMY_MAINNET!,
      accounts: [PRIVATE_KEY!],
      gasPrice: 30000000000, // 30 GWEI
    },
    goerli: {
      url: ALCHEMY_GOERLI!,
      accounts: [PRIVATE_KEY!],
      gasPrice: 30000000000, // 30 GWEI
    },
    polyMainnet: {
      chainId: 137,
      url: ALCHEMY_POLYGON!,
      accounts: [PRIVATE_KEY!],
      gasPrice: 200000000000, // 200 GWEI
    },
    polygonMumbai: {
      chainId: 80001,
      url: ALCHEMY_MUMBAI!,
      accounts: [
        PRIVATE_KEY!,
        PRIVATE_KEY_2!
      ],
    },
    ethereumSepolia: {
      chainId: 11155111,
      url: ALCHEMY_SEPOLIA!,
      accounts: [PRIVATE_KEY!],
      // gasPrice: 30000000000, // 30 GWEI
    },
    fuji: {
      chainId: 43113,
      url: FUJI!,
      accounts: [PRIVATE_KEY!],
      gasPrice: 30000000000, // 30 GWEI
    },
  },
  mocha: {
    timeout: 100000000,
  },
  gasReporter: {
    enabled: REPORT_GAS ? true : false,
    coinmarketcap: CMC,
    currency: "USD",
    outputFile: "gas-report.txt",
    gasPriceApi: REPORT_GAS_API,
    token: REPORT_GAS_TOKEN,
    noColors: true,
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY!,
      goerli: ETHERSCAN_API_KEY!,
      ethereumSepolia: ETHERSCAN_API_KEY!,
      polyMainnet: POLYGONSCAN_API_KEY!,
      polygonMumbai: POLYGONSCAN_API_KEY!,
      fuji: FUJI_EXPLORER_API_KEY!,
    },
    customChains: [
      {
        network: "ethereumSepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://api-sepolia.etherscan.io",
        },
      },
      {
        network: "polygonMumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://api-testnet.polygonscan.com",
        },
      },
      {
        network: "polyMainnet",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://api.polygonscan.com",
        },
      },
      {
        network: "fuji",
        chainId: 43113,
        urls: {
          apiURL: "https://api-testnet.snowtrace.io/api",
          browserURL: "https://testnet.snowtrace.io/",
        },
      },
    ],
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      }
    ],
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    cache: "./cache",
    tests: "./test",
  }
};

export default config;
