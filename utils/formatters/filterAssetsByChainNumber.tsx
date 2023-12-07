import { ethereumTokens } from '@/constants/assets/ethereum';
import { polygonTokens } from '@/constants/assets/polygon';
import { arbitrumTokens } from '@/constants/assets/arbitrum';
import { avalancheTokens } from '@/constants/assets/avalanche';
import { binanceTokens } from '@/constants/assets/binance';
import { baseTokens } from '@/constants/assets/base';
import { optimismTokens } from '@/constants/assets/optimism';
import { TokenBalances } from '@/utils/types/balances';

export const assets = {
  ethereumTokens,
  polygonTokens,
  arbitrumTokens,
  avalancheTokens,
  binanceTokens,
  baseTokens,
  optimismTokens,
};

export const filterAssetsByChainNumber = (chainId: number): TokenBalances => {
  let nativeAssets;
  switch (chainId) {
    case 1: // 'ethereumMainnet'
      nativeAssets = {
        nativeCoin: ethereumTokens.nativeCoin,
        wrappedCoin: ethereumTokens.wrappedCoin,
        dai: ethereumTokens.dai,
        usdt: ethereumTokens.usdt,
        usdc: ethereumTokens.usdc,
        link: ethereumTokens.link,
        bnm: ethereumTokens.bnm,
      };
      break;
    case 11155111: // 'ethereumSepolia'
      nativeAssets = {
        nativeCoin: ethereumTokens.nativeCoin,
        wrappedCoin: ethereumTokens.wrappedCoin,
        dai: ethereumTokens.dai,
        usdt: ethereumTokens.usdt,
        usdc: ethereumTokens.usdc,
        link: ethereumTokens.link,
        bnm: ethereumTokens.bnm,
      };
      break;
    case 8453: // 'baseMainnet'
      nativeAssets = {
        nativeCoin: baseTokens.nativeCoin,
        wrappedCoin: baseTokens.wrappedCoin,
        dai: baseTokens.dai,
        usdt: baseTokens.usdt,
        usdc: baseTokens.usdc,
        link: baseTokens.link,
        bnm: baseTokens.bnm,
      };
      break;
    case 84531: // 'baseGoerli'
      nativeAssets = {
        nativeCoin: baseTokens.nativeCoin,
        wrappedCoin: baseTokens.wrappedCoin,
        dai: baseTokens.dai,
        usdt: baseTokens.usdt,
        usdc: baseTokens.usdc,
        link: baseTokens.link,
        bnm: baseTokens.bnm,
      };
      break;
    case 10: // 'optimismMainnet'
      nativeAssets = {
        nativeCoin: optimismTokens.nativeCoin,
        wrappedCoin: optimismTokens.wrappedCoin,
        dai: optimismTokens.dai,
        usdt: optimismTokens.usdt,
        usdc: optimismTokens.usdc,
        link: optimismTokens.link,
        bnm: optimismTokens.bnm,
      };
      break;
    case 420: // 'optimismGoerli'
      nativeAssets = {
        nativeCoin: optimismTokens.nativeCoin,
        wrappedCoin: optimismTokens.wrappedCoin,
        dai: optimismTokens.dai,
        usdt: optimismTokens.usdt,
        usdc: optimismTokens.usdc,
        link: optimismTokens.link,
        bnm: optimismTokens.bnm,
      };
      break;
    case 42161: // 'arbitrumMainnet'
      nativeAssets = {
        nativeCoin: arbitrumTokens.nativeCoin,
        wrappedCoin: arbitrumTokens.wrappedCoin,
        dai: arbitrumTokens.dai,
        usdt: arbitrumTokens.usdt,
        usdc: arbitrumTokens.usdc,
        link: arbitrumTokens.link,
        bnm: arbitrumTokens.bnm,
      };
      break;
    case 421613: // 'arbitrumGoerli'
      nativeAssets = {
        nativeCoin: arbitrumTokens.nativeCoin,
        wrappedCoin: arbitrumTokens.wrappedCoin,
        dai: arbitrumTokens.dai,
        usdt: arbitrumTokens.usdt,
        usdc: arbitrumTokens.usdc,
        link: arbitrumTokens.link,
        bnm: arbitrumTokens.bnm,
      };
      break;
    case 43114: // 'avalancheMainnet'
      nativeAssets = {
        nativeCoin: avalancheTokens.nativeCoin,
        wrappedCoin: avalancheTokens.wrappedCoin,
        dai: avalancheTokens.dai,
        usdt: avalancheTokens.usdt,
        usdc: avalancheTokens.usdc,
        link: avalancheTokens.link,
        bnm: avalancheTokens.bnm,
      };
      break;
    case 43113: // 'avalancheFuji'
      nativeAssets = {
        nativeCoin: avalancheTokens.nativeCoin,
        wrappedCoin: avalancheTokens.wrappedCoin,
        dai: avalancheTokens.dai,
        usdt: avalancheTokens.usdt,
        usdc: avalancheTokens.usdc,
        link: avalancheTokens.link,
        bnm: avalancheTokens.bnm,
      };
      break;
    case 137: // 'polygonMainnet'
      nativeAssets = {
        nativeCoin: polygonTokens.nativeCoin,
        wrappedCoin: polygonTokens.wrappedCoin,
        dai: polygonTokens.dai,
        usdt: polygonTokens.usdt,
        usdc: polygonTokens.usdc,
        link: polygonTokens.link,
        bnm: polygonTokens.bnm,
      };
      break;
    case 80001: // 'polygonMumbai'
      nativeAssets = {
        nativeCoin: polygonTokens.nativeCoin,
        wrappedCoin: polygonTokens.wrappedCoin,
        dai: polygonTokens.dai,
        usdt: polygonTokens.usdt,
        usdc: polygonTokens.usdc,
        link: polygonTokens.link,
        bnm: polygonTokens.bnm,
      };
      break;
    case 56: // 'binanceMainnet'
      nativeAssets = {
        nativeCoin: binanceTokens.nativeCoin,
        wrappedCoin: binanceTokens.wrappedCoin,
        dai: binanceTokens.dai,
        usdt: binanceTokens.usdt,
        usdc: binanceTokens.usdc,
        link: binanceTokens.link,
        bnm: binanceTokens.bnm,
      };
      break;
    case 97: // 'binanceTestnet'
      nativeAssets = {
        nativeCoin: binanceTokens.nativeCoin,
        wrappedCoin: binanceTokens.wrappedCoin,
        dai: binanceTokens.dai,
        usdt: binanceTokens.usdt,
        usdc: binanceTokens.usdc,
        link: binanceTokens.link,
        bnm: binanceTokens.bnm,
      };
      break;
    default:
      console.log(`Unknown chainID: ${chainId}`);
      nativeAssets = {
        nativeCoin: polygonTokens.wrappedCoin,
        wrappedCoin: polygonTokens.wrappedCoin,
        dai: polygonTokens.dai,
        usdt: polygonTokens.usdt,
        usdc: polygonTokens.usdc,
        link: polygonTokens.link,
        bnm: polygonTokens.bnm,
      };
      break;
  }

  if (!nativeAssets) {
    console.log(
      `nativeAssets empty for chainID ${chainId} - check your environment variables`
    );
    nativeAssets = {
      nativeCoin: polygonTokens.wrappedCoin,
      wrappedCoin: polygonTokens.wrappedCoin,
      dai: polygonTokens.dai,
      usdt: polygonTokens.usdt,
      usdc: polygonTokens.usdc,
      link: polygonTokens.link,
      bnm: polygonTokens.bnm,
    };
  }

  return nativeAssets;
};
