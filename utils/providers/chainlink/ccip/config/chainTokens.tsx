import logoETH from '@/public/images/networks/eth-diamond-equal-width-height.svg';
import logoBNB from '@/public/images/networks/bnb-bnb-logo.svg';
import logoAVAX from '@/public/images/networks/avalanche-avax-logo.svg';
import logoMATIC from '@/public/images/tokens/polygon-matic.svg';

const getChainTokens = (chainID: string) => {
  let chainTokens;
  // console.log('chainIDchainID', chainID);
  switch (chainID) {
    case '0x1': // 'ethereumMainnet':
      chainTokens = {
        nativeToken: 'ETH',
        symbolLogo: logoETH,
        nativeWrappedToken: 'WETH',
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0xaa36a7': // 'ethereumSepolia':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0x5': // 'ethereumGoerli':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0x2105': // 'baseMainnet':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0x14a33': // 'baseGoerli':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0xa': // 'optimismMainnet':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0x1a4': // 'optimismGoerli':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0xa4b1': // 'arbitrumMainnet':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0x66eed': // 'arbitrumGoerli':
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
      break;
    case '0xa86a': // 'avalancheMainnet':
      chainTokens = {
        nativeToken: 'AVAX',
        nativeWrappedToken: 'WAVAX',
        symbolLogo: logoAVAX,
        symbolUrl: `/images/networks/png/avalanche.png`
      };
      break;
    case '0xa869': // 'avalancheFuji':
      chainTokens = {
        nativeToken: 'AVAX',
        nativeWrappedToken: 'WAVAX',
        symbolLogo: logoAVAX,
        symbolUrl: `/images/networks/png/avalanche.png`
      };
      break;
    case '0x89': // 'polygonMainnet':
      chainTokens = {
        nativeToken: 'MATIC',
        nativeWrappedToken: 'WMATIC',
        symbolLogo: logoMATIC,
        symbolUrl: `/images/networks/png/matic.png`
      };
      break;
    case '0x13881': // 'polygonMumbai':
      chainTokens = {
        nativeToken: 'MATIC',
        nativeWrappedToken: 'WMATIC',
        symbolLogo: logoMATIC,
        symbolUrl: `/images/networks/png/matic.png`
      };
      break;
    case '0x38': // 'binanceMainnet':
      chainTokens = {
        nativeToken: 'BNB',
        nativeWrappedToken: 'WBNB',
        symbolLogo: logoBNB,
        symbolUrl: `/images/networks/png/bnb.png`
      };
      break;
    case '0x61': // 'binanceTestnet':
      chainTokens = {
        nativeToken: 'BNB',
        nativeWrappedToken: 'WBNB',
        symbolLogo: logoBNB,
        symbolUrl: `/images/networks/png/bnb.png`
      };
      break;
    default:
      console.log(`Unknown chainID: ${chainID}`);
      chainTokens = {
        nativeToken: 'ETH',
        nativeWrappedToken: 'WETH',
        symbolLogo: logoETH,
        symbolUrl: `/images/networks/png/ethereum.png`
      };
  }

  if (!chainTokens) {
    console.log(
      `chainTokens empty for chainID ${chainID} - check your environment variables`
    );
    chainTokens = {
      nativeToken: 'ETH',
      nativeWrappedToken: 'WETH',
      symbolLogo: logoETH,
      symbolUrl: `/images/networks/png/ethereum.png`
    };
  }
  return chainTokens;
};

export default getChainTokens;
