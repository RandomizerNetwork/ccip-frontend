"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';

const useWallet = () => {
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  useEffect(() => {
      const run = async() => {
        if(!isConnected || !walletProvider) return
          const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
          setProvider(ethersProvider);
          const signer = await ethersProvider.getSigner()
          setSigner(signer);
        }
      run()
  }, [address, chainId, isConnected])

  return { ethersProvider, signer, address, chainId, isConnected };
};

export default useWallet;
