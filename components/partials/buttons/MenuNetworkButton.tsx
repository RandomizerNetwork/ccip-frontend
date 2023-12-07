// MenuNetworkButton.tsx
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useComponentVisible from '@/hooks/useComponentVisible';
import useWallet from '@/hooks/useWallet';
import NetworkIcon from '../network/NetworkIcon';
import RotatingArrow from '@/components/header/partials/RotatingArrow';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { liveChains } from '@/utils/providers/Web3Modal';
import changeNetwork from '@/utils/helpers/changeNetwork';
import getChainID from '@/utils/providers/chainlink/ccip/config/chains';
import useGlobalState from '@/store/globalState';

export default function MenuNetworkButton() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider()
  
  const [fromNetwork] = useGlobalState("fromNetwork");

  console.log('walletProvider', walletProvider)

  const { refs, active, setActive, handleButtonClick } = useComponentVisible<
    HTMLButtonElement,
    HTMLDivElement
  >();

  const [activeChainLabel, setActiveChainLabel] = useState('');

  useEffect(() => {
    try {
      let counter = 0;
      for (let i = 0; i < liveChains.length; i += 1) {
        if (chainId === liveChains[i].chainId) {
          setActiveChainLabel(liveChains[i].name ?? '');
        } else {
          counter += 1;
          if (counter === liveChains.length) {
            setActiveChainLabel('Unsupported Network');
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [address, chainId, liveChains]);

  const switchChainID = async (chainId: number) => {
    changeNetwork(isConnected, walletProvider, `0x${chainId.toString(16)}`);
    setActive(false);
  };

  return (
    <>
      {isConnected && (
        <button
          ref={refs[0]}
          onClick={handleButtonClick}
          className="text-white select-none hover:bg-opacity-80 h-10 mx-1 flex pointer border bg-chainlinkBlue border-nftEpic font-medium rounded-lg text-sm px-2 text-center"
        >
          <div className="flex color-white h-full items-center">
            <div className="ml-1 mr-2">
              {chainId && <NetworkIcon chainId={`0x${chainId.toString(16)}`} size={21} />}
            </div>
            <div className="hidden md:flex font-medium tracking-[1px]">
              {activeChainLabel}
            </div>
            <RotatingArrow active={active} pixels={18} />
          </div>
        </button>
      )}
      {active && (
        <div
          ref={refs[1]}
          className="text-white fixed w-9/12 sm:w-64 mt-14 ml-2 right-0 bg-chainlinkBiscay rounded-lg"
        >
          {liveChains.length > 1 && (
            <div className="px-2 py-1 bg-chainlinkBlue rounded-t-lg border-b border-chainlinkZircon">
              Networks:{' '}
            </div>
          )}
          {liveChains &&
            liveChains.map(chain => {
              return (
                <button
                  onClick={() => switchChainID(chain.chainId)}
                  key={uuidv4()}
                  className="w-full py-1 rounded-lg hover:bg-chainlinkBlue"
                >
                  <div className="flex">
                    <div className="flex pt-2 pb-1 mx-2">
                      <NetworkIcon chainId={`0x${chain.chainId.toString(16)}`} size={21} />
                      <div className="ml-2 font-medium tracking-[1px] flex justify-center items-center">
                        {chain.name}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </>
  );
}
