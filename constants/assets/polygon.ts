export type WalletTokenAddressess = {
  [key: string]: string;
};

const POLYGON_MAINNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  link: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
  dai: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  usdt: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  usdc: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  bnm: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const POLYGON_TESTNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
  link: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
  dai: '0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943',
  usdt: '0xebc0815689fa529be40ef218c1ea798720c45301',
  usdc: '0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0',
  bnm: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const isProduction = process.env.NODE_ENV === 'production';
export const polygonTokens = isProduction
  ? POLYGON_MAINNET_TOKENS
  : POLYGON_TESTNET_TOKENS;
