'use client';
import { useEffect } from 'react';
import { getAddress } from '@ethersproject/address';
import multicallBalanceProvider from '@/utils/helpers/multicall';
import useWallet from '@/hooks/useWallet';
import useGlobalState from '@/store/globalState';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

export default function ServicesBalances() {
  const { ethersProvider } = useWallet();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [updateBalances] = useGlobalState('updateBalances');
  const [, setBalances] = useGlobalState('balances');

  useEffect(() => {
    if (!chainId) return;
    if (!ethersProvider) return;
    if (!address || !address) return;

    if (updateBalances && getAddress(address)) {
      // Define an async function inside the useEffect
      const fetchMultisigBalances = async () => {
        try {
          // Process balances
          const balances = await multicallBalanceProvider(
            address,
            ethersProvider
          );
          setBalances(balances);
        } catch (error) {
          console.error('Error fetching balances:', error);
        }
      };

      fetchMultisigBalances();
    }
  }, [setBalances, updateBalances, chainId, address, isConnected, ethersProvider]);

  return null;
}
