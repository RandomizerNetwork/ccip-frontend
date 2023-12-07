import { ExternalProvider } from "@ethersproject/providers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
// import getChainID from "../providers/chainlink/ccip/config/chains";

const changeNetwork = async (isConnected: boolean, walletProvider: ExternalProvider | undefined, newChainId: string) => {
  // const { walletProvider } = useWeb3ModalProvider()
  // const { isConnected } = useWeb3ModalAccount();
  try {
    if (!isConnected || !walletProvider || !walletProvider.request) return;
    // Request the user to switch to the target network
    await walletProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: newChainId }], // chainId must be in hexadecimal
      // params: [{ chainId: getChainsByID(`0x${chainId.toString(16)}`) }], // chainId must be in hexadecimal
      // params: [{ chainId: chainId }], // chainId must be in hexadecimal
      // params: [{ chainId: '0xAA36A7' }], // chainId must be in hexadecimal
    });
  } catch (switchError) {
    // Handle errors, like the user rejecting the request
    console.error("Could not switch to the desired network:", switchError);
  }
};

export default changeNetwork