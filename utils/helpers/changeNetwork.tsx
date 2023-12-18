import { ExternalProvider } from "@ethersproject/providers";
import getChainsByID from "../providers/chainlink/ccip/config/chainsByID";
import ccipConfig from "../providers/chainlink/ccip/config";
import getChainTokens from "../providers/chainlink/ccip/config/chainTokens";
import getChainsExplorer from "../providers/chainlink/ccip/config/chainsExplorer";
// import getChainID from "../providers/chainlink/ccip/config/chains";

type AddEthereumChainParameter = {
  // The chain ID as a 0x-prefixed hexadecimal string, per the eth_chainId method. MetaMask compares this chain ID value with the eth_chainId return value. If these values aren't identical, MetaMask rejects the request.
  chainId: string,

  // (Optional) One or more URLs pointing to block explorer sites for the chain.
  blockExplorerUrls: string[],

  // (Optional) A human-readable name for the chain.
  chainName: string,

  // (Optional) One or more URLs pointing to reasonably sized images that can be used to visually identify the chain.
  iconUrls: string[],

  // (Optional) Describes the native currency of the chain using the name, symbol, and decimals fields.
  nativeCurrency: {
    decimals: number,
    name: string,
    symbol: string,
  }

  // One or more URLs pointing to RPC endpoints that can be used to communicate with the chain. At least one item is required, and only the first item is used.
  rpcUrls: (string | undefined)[]
}

type EthereumProviderError = {
  code: number;
  message: string;
};

// Helper function for type checking
function isEthereumProviderError(error: any): error is EthereumProviderError {
  return error && typeof error === 'object' && 'code' in error;
}

const addNetwork = async (walletProvider: ExternalProvider | undefined, newChainId: string, chainData: AddEthereumChainParameter) => {
  // chainData should contain details like chainName, rpcUrls, etc.
  try {
    if (!walletProvider || !walletProvider.request) return;
    await walletProvider.request({
      method: 'wallet_addEthereumChain',
      params: [chainData],
    });
  } catch (addError) {
    console.error('Could not add the new network:', addError);
  }
};


const changeNetwork = async (isConnected: boolean, walletProvider: ExternalProvider | undefined, newChainId: string) => {
  // const { walletProvider } = useWeb3ModalProvider()
  // const { isConnected } = useWeb3ModalAccount();
  if (!isConnected || !walletProvider || !walletProvider.request) return;
  try {
    // Request the user to switch to the target network
    await walletProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: newChainId }], // chainId must be in hexadecimal
      // params: [{ chainId: getChainsByID(`0x${chainId.toString(16)}`) }], // chainId must be in hexadecimal
      // params: [{ chainId: chainId }], // chainId must be in hexadecimal
      // params: [{ chainId: '0xAA36A7' }], // chainId must be in hexadecimal
    });
  } catch (error) {
    // Handle errors, like the user rejecting the request
    console.error("Could not switch to the desired network:", error);
    if (isEthereumProviderError(error) && error.code === 4902) {
      // Define the chainData for the new network
      const networkName = getChainsByID(newChainId)
      const chainTokens = getChainTokens(newChainId)
      const routerConfig = ccipConfig.getRouterConfig(networkName)
      const routerProvider = ccipConfig.getProviderRpcUrl(networkName)  
      const blockExplorerUrls = getChainsExplorer(newChainId);
      const firstExplorerUrl = blockExplorerUrls.length > 0 ? blockExplorerUrls[0] : "";

      // Assuming chainTokens.nativeToken is of the correct shape for nativeCurrency
      const nativeCurrency = {
        decimals: 18,                             // Should be a number
        name: chainTokens.nativeToken,            // Should be a string
        symbol: chainTokens.symbolLogo,           // Should be a string
      };
      
      const chainData = {
        chainId: newChainId,                      // Should be a prefixed hexadecimal string
        blockExplorerUrls: [firstExplorerUrl],    // Should be a string[]
        chainName: routerConfig.networkName,      // Should be a string
        iconUrls: chainTokens.symbolLogo,         // Should be a string
        nativeCurrency: nativeCurrency,           // Should be a string
        rpcUrls: [routerProvider]                 // Should be a string
      };
      await addNetwork(walletProvider, newChainId, chainData);
    } else {
      console.error("Could not switch to the desired network:", error);
    }
  }
};

export default changeNetwork