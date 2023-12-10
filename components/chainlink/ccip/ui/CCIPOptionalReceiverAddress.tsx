import useGlobalState from '@/store/globalState';
import { getAddress } from '@ethersproject/address';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function CCIPOptionalReceiverAddress() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [receiverAddress, setReceiverAddress] = useGlobalState("receiverAddress");
  const [showReceiverAddress, setShowReceiverAddress] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if(!receiverAddress) { setReceiverAddress(address); return }
        if(getAddress(receiverAddress)) {
          setReceiverAddress(getAddress(receiverAddress))
          return
        }
        if(!getAddress(receiverAddress)) { setReceiverAddress(getAddress(address as string)); return }
      }
    } catch (error) {
      console.log('error in receiverAddress useEffect', error)
    }
  }, [address, chainId, isConnected, showReceiverAddress])

  const filterReceiverAddress = (value: string) => {
    try {
      console.log('valuevaluevaluevalue', value)
      const filteredValue = getAddress(value as string)
      if(getAddress(value as string)) setReceiverAddress(getAddress(filteredValue))
      if(!getAddress(value as string)) setReceiverAddress(getAddress(address as string))
    } catch (error) {
      console.log('error in receiverAddress filterReceiverAddress', error)
    }
  }

  return (
    <>
        { isConnected && 
            <div className="flex justify-between text-lg mt-1 h-7">
                {!showReceiverAddress && <button onClick={() => setShowReceiverAddress(!showReceiverAddress)}><FaRegEyeSlash/></button>}
                {showReceiverAddress && 
                <>
                    <button onClick={() => setShowReceiverAddress(!showReceiverAddress)}><FaRegEye/></button>
                    <div className="flex justify-center items-center mx-2 text-sm">Receiver: </div>
                    <input
                    className="w-full bg-chainlinkMirage rounded-lg placeholder-white text-sm text-center"
                    name="tokenAmount"
                    value={receiverAddress as string}
                    onChange={(e) => filterReceiverAddress(e.target.value)}
                    />
                </>
                }
            </div>
        }
    </>
  )
}
