import { ReactElement } from "react";
// import { WalletState } from '@web3-onboard/core/dist/types';
import { getAddress } from "@ethersproject/address";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Image from "next/image";
import RotatingArrow from "@/components/header/partials/RotatingArrow";

function showTemporaryButtonText(
  address: `0x${string}` | undefined,
  walletOpen: boolean
): string | ReactElement {
  if(!address) return <></>
  const parsedAddress = getAddress(address);
  const ensName = address; //.ens?.name;
  const ensAvatar = null; //.ens?.avatar?.url;
  //                  ^?
  return (
    <div className="flex">
      {ensAvatar && (
        <>
          <span className="ml-1 mr-2 flex flex-col justify-center">
            <Image src={ensAvatar} width={21} height={21} alt="ENS Icons" />
          </span>
          <span className="font-kanit font-medium tracking-[1px] hidden md:flex flex-col justify-center text-xs">
            {ensName}
          </span>
        </>
      )}
      {!ensAvatar && (
        <>
          <span className="ml-1 mr-2 flex flex-col justify-center">
            <Jazzicon diameter={21} seed={jsNumberForAddress(parsedAddress)} />{" "}
          </span>
          <span className="font-kanit font-medium tracking-[1px] hidden md:flex flex-col justify-center text-xs">
            {parsedAddress.slice(0, 6)}...
            {parsedAddress.slice(parsedAddress.length - 4)}
          </span>
        </>
      )}
      <div className="flex items-center">
        <RotatingArrow active={walletOpen} pixels={18} />
      </div>
    </div>
  );
}

const getActualYear = (): number => {
  return new Date().getFullYear();
};

const helpers = {
  showTemporaryButtonText,
  getActualYear,
};

export default helpers;
