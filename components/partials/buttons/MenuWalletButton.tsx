import { ReactElement, useEffect } from 'react';
import { useWindowSize, useCopyToClipboard } from 'usehooks-ts';
import Image from 'next/image';
import { IS_LOCAL } from '@/constants/networks';
import helpers from '@/utils/helpers';
import useWallet from '@/hooks/useWallet';
import CopyIcon from '@/public/icons/copy.svg';
import ExploreIcon from '@/public/icons/explore.svg';
import DisconnectIcon from '@/public/icons/disconnect.svg';
import useComponentVisible from '@/hooks/useComponentVisible';
import WalletIconButtons from './WalletIconButtons';
import WalletTokenBalance from './WalletTokenBalance';
import useGlobalState from '@/store/globalState';
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';

export default function MenuWalletButton(): ReactElement {
  const [, setUpdateBalances] = useGlobalState('updateBalances');
  const [, copy] = useCopyToClipboard();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  
  const { open, close } = useWeb3Modal()
  const { disconnect } = useDisconnect()

  const { refs, active, handleButtonClick } = useComponentVisible<
    HTMLButtonElement,
    HTMLDivElement
  >();

  const openWalletModal = (): void => {
    handleButtonClick();
    if (!active) setUpdateBalances(true);
    if (active) setUpdateBalances(false);
  };

  const switchWallet = () => {
    // if (address != null) connect();
  };

  return (
    <>
      {/* {(!appState.accountCenter.enabled || width < 600) && ( */}
      <>
        {!isConnected && 
          <button
            onClick={() => open({view: "Connect"})}
            >
            <div className="flex">
            <span className="text-white p-2 border rounded-lg bg-chainlinkBlue text-base font-kanit sm:font-medium sm:tracking-[1px] sm:mx-2">
            Connect Wallet
            </span>
            </div>
          </button>
        }
        {isConnected && 
          <div className="flex">
            <button
              ref={refs[0]}
              type="button"
              className="hover:bg-opacity-90 h-10 border text-white bg-chainlinkBlue border-nftEpic font-medium rounded-lg text-sm px-2 text-center"
              disabled={!isConnected}
              onClick={() => openWalletModal()}
              >
              {helpers.showTemporaryButtonText(address, active)}
            </button>
          </div>
        }
        {address && active && (
          <div
            ref={refs[1]}
            className="fixed w-9/12 sm:w-64 mt-14 right-0 bg-chainlinkBiscay rounded-lg"
          >
            <div className="flex fle-col mt-3 px-3 text-white justify-between">
              <div className="flex flex-row flex-start p-1">
                <button onClick={() => switchWallet()}>
                  {/* <Image
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      wallet.icon
                    )}`}
                    height={25}
                    width={25}
                    alt="wallet icon"
                    priority={true}
                  /> */}
                </button>
                {/* {!wallet.accounts[0].ens?.avatar && <span className="flex flex-col justify-center"> <Jazzicon diameter={20} seed={jsNumberForAddress(wallet.accounts[0].address)} /> </span>} */}
                <button onClick={() => copy(address)}>
                  <div className="ml-2 flex flex-col justify-center text-md">
                    {address.slice(0, 4)}...
                    {address.slice(
                      address.length - 4
                    )}
                  </div>
                </button>
              </div>
              <div className="flex flex-row flex-end right-0">
                <WalletIconButtons
                  img={CopyIcon}
                  alt="Copy"
                  altText="Copied"
                  isLast={false}
                  onClick={() => copy(address)}
                />
                <WalletIconButtons
                  img={ExploreIcon}
                  alt="Explore"
                  altText="Exploring"
                  isLast={false}
                  onClick={() =>
                    window.open(
                      `https://${
                        IS_LOCAL ? 'mumbai.' : ''
                      }polygonscan.com/address/${address}`,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                />
                <WalletIconButtons
                  img={DisconnectIcon}
                  alt="Disconnect"
                  altText="Disconnecting"
                  isLast={true}
                  onClick={() => disconnect()}
                />
              </div>
            </div>
            <div className="flex mt-5 pr-8 text-center w-full justify-center text-white">
              <WalletTokenBalance />
            </div>
          </div>
        )}
      </>
      {/* )} */}
    </>
  );
}
