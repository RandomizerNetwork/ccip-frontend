import { IS_LOCAL } from '@/constants/networks';

const supportedNetworks = [
  'ethereumMainnet',
  'ethereumSepolia',
  'polygonMainnet',
  'polygonMumbai',
  'binanceMainnet',
  'binanceTestnet',
  'avalancheMainnet',
  'avalancheFuji',
  'arbitrumMainnet',
  'arbitrumGoerli',
  'optimismMainnet',
  'optimismGoerli',
  'baseMainnet',
  'baseGoerli',
];

const ethereumMainnet = {
  networkName: 'Ethereum',
  networkStage: 'Mainnet',
  address: '0xE561d5E02207fb5eB32cca20a699E0d8919a1476',
  chainSelector: '5009297550715157269',
  lanes: [
    'optimismMainnet',
    'polygonMainnet',
    'avalancheMainnet',
    'arbitrumMainnet',
    'binanceMainnet',
    'baseMainnet',
  ],
  feeTokens: {
    ETH: '',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '0x94025780a1aB58868D9B2dBBB775f44b32e8E6e5',
  },
};

const ethereumSepolia = {
  networkName: 'Ethereum',
  networkStage: 'Sepolia',
  address: '0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59',
  chainSelector: '16015286601757825753',
  lanes: [
    'polygonMumbai',
    // 'arbitrumGoerli',
    'avalancheFuji',
    'binanceTestnet',
    'optimismGoerli',
    'baseGoerli',
  ],
  feeTokens: {
    ETH: '',
    WETH: '0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534',
    LINK: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05',
  },
};

const ethereumGoerli = {
  networkName: 'Ethereum',
  networkStage: 'Goerli',
  address: '0xd0daae2231e9cb96b94c8512223533293c3693bf',
  chainSelector: '16015286601757825753',
  lanes: ['arbitrumGoerli'],
  feeTokens: {
    ETH: '',
    WETH: '0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534',
    LINK: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05',
  },
};

const baseMainnet = {
  networkName: 'Base',
  networkStage: 'Mainnet',
  address: '15971525489660198786',
  chainSelector: '15971525489660198786',
  lanes: ['ethereumMainnet', 'arbitrumMainnet', 'optimismMainnet'],
  feeTokens: {
    ETH: '',
    WETH: '0x4200000000000000000000000000000000000006',
    LINK: '0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '',
  },
};

const baseGoerli = {
  networkName: 'Base',
  networkStage: 'Testnet',
  address: '0x80af2f44ed0469018922c9f483dc5a909862fdc2',
  chainSelector: '5790810961207155433',
  lanes: ['ethereumSepolia', 'optimismGoerli', 'binanceTestnet', 'avalancheFuji'],
  feeTokens: {
    ETH: '',
    WETH: '0x4200000000000000000000000000000000000006',
    LINK: '0xd886e2286fd1073df82462ea1822119600af80b6',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "0xacdF87a09D3e8b0F297F053Fc4ed79feA8655510",
  whitelistedTokens: {
    BnM: '0xbf9036529123de264bfa0fc7362fe25b650d4b16',
  },
};

const optimismMainnet = {
  networkName: 'Optimism',
  networkStage: 'Mainnet',
  address: '0x261c05167db67B2b619f9d312e0753f3721ad6E8',
  chainSelector: '3734403246176062136',
  lanes: ['ethereumMainnet', 'polygonMainnet', 'baseMainnet'],
  feeTokens: {
    ETH: '',
    WETH: '0x4200000000000000000000000000000000000006',
    LINK: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '',
  },
};

const optimismGoerli = {
  networkName: 'Optimism',
  networkStage: 'Testnet',
  address: '0xcc5a0b910d9e9504a7561934bed294c51285a78d',
  chainSelector: '2664363617261496610',
  lanes: [
    'ethereumSepolia', 
    // 'arbitrumGoerli', 
    'avalancheFuji',
    'polygonMumbai',
    'baseGoerli'
  ],
  feeTokens: {
    ETH: '',
    WETH: '0x4200000000000000000000000000000000000006',
    LINK: '0xdc2CC710e42857672E7907CF474a69B63B93089f',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "0x5A4aa018E0860174f2cDe0b0fE714d39A1b620f4",
  whitelistedTokens: {
    BnM: '0xaBfE9D11A2f1D61990D1d253EC98B5Da00304F16',
  },
};

const avalancheMainnet = {
  networkName: 'Avalanche',
  networkStage: 'Mainnet',
  address: '0x27F39D0af3303703750D4001fCc1844c6491563c',
  chainSelector: '6433500567565415381',
  lanes: ['ethereumMainnet', 'polygonMainnet', 'binanceMainnet'],
  feeTokens: {
    AVAX: '',
    WAVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    LINK: '0x5947BB275c521040051D82396192181b413227A3',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '',
  },
};

const avalancheFuji = {
  networkName: 'Avalanche',
  networkStage: 'Fuji',
  address: '0xf694e193200268f9a4868e4aa017a0118c9a8177',
  chainSelector: '14767482510784806043',
  lanes: [
    'ethereumSepolia', 
    'optimismGoerli', 
    'polygonMumbai',
    'binanceTestnet',
    'baseGoerli'
  ],
  feeTokens: {
    AVAX: '',
    WAVAX: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    LINK: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "0x8c4Cd8Af8ECa53e5b9f4969691C31F6eB8A56D26",
  whitelistedTokens: {
    BnM: '0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4',
  },
};

const arbitrumMainnet = {
  networkName: 'Arbitrum',
  networkStage: 'Mainnet',
  address: '0xE92634289A1841A979C11C2f618B33D376e4Ba85',
  chainSelector: '4949039107694359620',
  lanes: ['ethereumMainnet'],
  feeTokens: {
    ETH: '',
    WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    LINK: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '',
  },
};

const arbitrumGoerli = {
  networkName: 'Arbitrum',
  networkStage: 'Testnet',
  address: '0x88e492127709447a5abefdab8788a15b4567589e',
  chainSelector: '6101244977088475029',
  lanes: ['optimismGoerli', 'ethereumGoerli'],
  feeTokens: {
    ETH: '',
    WETH: '0x32d5D5978905d9c6c2D4C417F0E06Fe768a4FB5a',
    LINK: '0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '0x0579b4c1C8AcbfF13c6253f1B10d66896Bf399Ef',
  },
};

const polygonMainnet = {
  networkName: 'Polygon',
  networkStage: 'Mainnet',
  address: '0x3C3D92629A02a8D95D5CB9650fe49C3544f69B43',
  chainSelector: '4051577828743386545',
  lanes: [
    'ethereumMainnet',
    'avalancheMainnet',
    'optimismMainnet',
    'binanceMainnet',
  ],
  feeTokens: {
    MATIC: '',
    WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    LINK: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '',
  },
};

const polygonMumbai = {
  networkName: 'Polygon',
  networkStage: 'Mumbai',
  address: '0x1035cabc275068e0f4b745a29cedf38e13af41b1',
  chainSelector: '12532609583862916517',
  lanes: [
    'ethereumSepolia',
    'avalancheFuji',
    'binanceTestnet',
    'optimismGoerli',
  ],
  feeTokens: {
    MATIC: '',
    WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    LINK: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "0xE956a0f20Cf9f9b7c782596085075fBeDeEad687",
  whitelistedTokens: {
    BnM: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
  },
};

const binanceMainnet = {
  networkName: 'Binance',
  networkStage: 'Mainnet',
  address: '0x536d7E53D0aDeB1F20E7c81fea45d02eC9dBD698',
  chainSelector: '11344663589394136015',
  lanes: [
    'ethereumMainnet',
    'avalancheMainnet',
    'polygonMainnet',
    'baseMainnet',
  ],
  feeTokens: {
    BNB: '',
    WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    LINK: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "",
  whitelistedTokens: {
    BnM: '',
  },
};

const binanceTestnet = {
  networkName: 'Binance',
  networkStage: 'Testnet',
  address: '0xe1053ae1857476f36a3c62580ff9b016e8ee8f6f',
  chainSelector: '13264668187771770619',
  lanes: [
    'ethereumSepolia',
    'avalancheFuji',
    'polygonMumbai',
    'baseGoerli'
  ],
  feeTokens: {
    BNB: '',
    WBNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    LINK: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
  },
  deterministicFactory: "0x9C51DBE256Cd4501b4A3d4E6E45A45CEe8A11C52",
  ccipTokenSenderContract: "0x53365D39C540B240f3cBa46E92Dc2c424491C4e4",
  whitelistedTokens: {
    BnM: '0xbfa2acd33ed6eec0ed3cc06bf1ac38d22b36b9e9',
  },
};

const getRouterConfig = (network: string) => {
  // console.log(`Network: ${network}`);
  switch (network) {
    case 'ethereumMainnet':
      return ethereumMainnet;
    case 'ethereumSepolia':
      return ethereumSepolia;
    case 'ethereumGoerli':
      return ethereumGoerli;
    case 'baseMainnet':
      return baseMainnet;
    case 'baseGoerli':
      return baseGoerli;
    case 'optimismMainnet':
      return optimismMainnet;
    case 'optimismGoerli':
      return optimismGoerli;
    case 'arbitrumMainnet':
      return arbitrumMainnet;
    case 'arbitrumGoerli':
      return arbitrumGoerli;
    case 'avalancheMainnet':
      return avalancheMainnet;
    case 'avalancheFuji':
      return avalancheFuji;
    case 'polygonMainnet':
      return polygonMainnet;
    case 'polygonMumbai':
      return polygonMumbai;
    case 'binanceMainnet':
      return binanceMainnet;
    case 'binanceTestnet':
      return binanceTestnet;
    default:
      return IS_LOCAL ? ethereumSepolia : ethereumMainnet;
  }
};

// Separate the testnets and mainnets
const supportedTestnets = supportedNetworks.filter(
  network =>
    network.toLowerCase().includes('testnet') ||
    network.endsWith('Goerli') ||
    network.endsWith('Sepolia') ||
    network.endsWith('Fuji') ||
    network.endsWith('Mumbai')
);

const supportedMainnet = supportedNetworks.filter(network =>
  network.toLowerCase().includes('mainnet')
);

export type FeeTokens =
  | { ETH: string; WETH: string; LINK: string }
  | { AVAX: string; WAVAX: string; LINK: string }
  | { MATIC: string; WMATIC: string; LINK: string }
  | { BNB: string; WBNB: string; LINK: string };

const ccipRouterConfig = {
  getRouterConfig,
  supportedNetworks,
  supportedTestnets,
  supportedMainnet,
};

export default ccipRouterConfig;
