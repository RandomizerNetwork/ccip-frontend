// CCIPBridge.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { useDebounce } from "use-debounce";
import Lottie from "lottie-react";
import Image from "next/image";
import useWallet from "@/hooks/useWallet";
import ccipRouterConfig, { FeeTokens } from "@/utils/providers/chainlink/ccip/config/router";
import ccipConfig from "@/utils/providers/chainlink/ccip/config";
import CCIPBridgeTokensButton from "./ui/CCIPBridgeTokensButton";
import CCIPNetworkButton from "@/components/chainlink/ccip/ui/CCIPNetworkButton";
import getChainlinkCCIPFee from "./utils/getChainlinkCCIPFee";
import { Message, TransferDetails } from "@/utils/types/ccip";
import CCIPBridgeFeeTokens from "./ui/CCIPBridgeFeeTokens";
import useGlobalState from "@/store/globalState";
import getChainsByID from "@/utils/providers/chainlink/ccip/config/chainsByID";
import CCIPAnimation from "@/public/lottie/ccip.json";
import erc20Abi from "@/utils/providers/chainlink/ccip/abi/IERC20Metadata.json";
import formatEtherToLocaleString from "@/utils/formatters/formatEther";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import CCIPTokenIcon from "./ui/CCIPTokenIcon";
import RotatingArrow from "@/components/header/partials/RotatingArrow";
import { v4 as uuidv4 } from 'uuid';
import { CCIPMenuEnum } from "@/utils/types/store";
import {
  FaRegEye,
  FaRegEyeSlash
} from "react-icons/fa";

import { getAddress } from '@ethersproject/address';

// TODO CCIP UI
// [x] 1. FEE TOKENS MINI-MODAL
// [X] 2. BnM ON EVERY TESTNET CHAIN
// [X] 3. BnM BALANCE
// [X] 4. BnM CCIP MAX AMOUNT AND CHECK BALANCE AMOUNT
// [x] 5. Multi Approve BnM + Fee Token in steps
// [x] 7. Chain multiple balance calls toghether with MultiCallV3
// [x] 8. Switch from Goerli to Sepolia Testnet RPC for Arbitrum
// [x] 9. Upgrade to Web3Modal wallets
// [x] 10. Notifications
// [X] 11. MULTICHAIN TOKENS:
//    [X] 11.1. get balances for both NATIVE COIN & WERC20
//    [X] 11.2. get symbol keeys from FEE TOKENS LIST
//    [X] 11.3. get logos for NATIVE and WERC20
// [x] 12. add debounce for token value input
// [x] 13. Testnets and mainnet works on 7 chains with 7 tokens!
// [x] 14. create a modal where players can swap any token and purchase tickets directly on a single chain or crosschain with CCIP.
// [] 15. GET MULTICALL SUPPORTED TOKENS + SELECTION MODAL
// [] 16. CCIP notifications with cross chain bridging results
// [] 17. Add CCIP Error handling when the lanes are overused
// [] 18. Add messages to destinationChain contract method call
// [] 19. Multicall approve up to 5 tokens in a single CCIP TX
  // [] 19.1 Tokens Modal => SupportedTokens -> Multicall (Decimals + Symbol + Logo)
  // [] 19.2 Deploy Helper Contract to allow up to approve multiple tokens and even pay the CCIP Fee and also add EIP712 for a better user experience
  // [] 19.3 Simplify the UI 
// [] 20. Add hardhat with deterministic utility contract
// [] 21. Deploy deterministic factory contract on 7 chains
// [] 22. Deploy deterministic ccip contract on 7 chains
// [] 23. Make UI adaptable to both General Access and Private Beta methods with CCIP Single ERC20Token transfer between chains

// TODO
// [x] 1. CCIP Bridge - General Access Single Token
// [x] 2. CCIP Bridge - General Access Multi Token
// [-] 3. CCIP Bridge - Private Beta Single Token
// [-] 4. CCIP Bridge - Private Beta Multi Token
// [-] 5. CCIP Bridge - Private Beta NFT Bridge
// [-] 6. CCIP Bridge - Private Beta DeFi Bridge
// [-] 7. CCIP Bridge - Private Beta P2P Payments Bridge
// [-] 8. CCIP Bridge - Private Beta Asset TokenizationBridge

export default function CCIPBridge() {
  const { ethersProvider } = useWallet();

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [fromNetwork, setFromNetwork] = useGlobalState("fromNetwork");
  const [toNetwork, setToNetwork] = useGlobalState("toNetwork");
  const [, setUpdateBalances] = useGlobalState("updateBalances");
  
  const [generatedMessage, setMessage] = useState<Message>();
  const [feeTokens, setFeeTokens] = useState<FeeTokens>();
  const [selectedFeeToken, setSelectedFeeToken] = useState<string>("");
  const [selectedTokenBalance, setSelectedTokenBalance] = useState<string>("0.00");
  const [selectedFeeSymbol, setSelectedFeeSymbol] = useState<string>("ETH");
  const [openFeeTokenModal, setOpenFeeTokenModal] = useState<boolean>(false);
  const [ccipFees, setCcipFees] = useState<string>("0");
  const [amount, setAmount] = useState<string>("0");

  const [receiverAddress, setReceiverAddress] = useState<string | `0x${string}` | undefined>(address);
  const [showReceiverAddress, setShowReceiverAddress] = useState(false);
  
  const [debouncedAmount] = useDebounce(amount, 500); // 500ms delay

  useEffect(() => {
    try {
      if(!receiverAddress) { setReceiverAddress(address); return }
      if(getAddress(receiverAddress)) {
        setReceiverAddress(getAddress(address as string))
        return
      }
      if(!getAddress(receiverAddress)) { setReceiverAddress(getAddress(address as string)); return }
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
  
  useEffect(() => {
    if (chainId) {
      setFromNetwork(getChainsByID(`0x${chainId.toString(16)}`));
    }
  }, [address, chainId, isConnected]);

  const details: TransferDetails = useMemo(() => {
    const fromNetworkProvider = new ethers.providers.JsonRpcProvider(
      ccipConfig.getProviderRpcUrl(fromNetwork)
    );
    return {
      fromNetworkProvider,
      ethersProvider,
      sourceChain: fromNetwork,
      destinationChain: toNetwork,
      destinationAccount: receiverAddress ?? "",
      tokenAddress:
        ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens.BnM,
      tokenKey: Object.keys(
        ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens
      )[0],
      amount: ethers.utils.parseEther(debouncedAmount.replace(",", ".")),
      senderAddress: address ?? "",
      feeTokenAddress: selectedFeeToken,
      feeTokenSymbol: selectedFeeSymbol,
      ccipFees,
    };
  }, [
    ethersProvider,
    fromNetwork,
    toNetwork,
    address,
    selectedFeeToken,
    debouncedAmount,
    ccipFees,
    selectedFeeSymbol,
  ]);

  // get balances
  useEffect(() => {
    try {
      // setUpdateBalances(true);
      const fetchBalance = async () => {
        const fromNetworkProvider = new ethers.providers.JsonRpcProvider(
          ccipConfig.getProviderRpcUrl(fromNetwork)
        );
        const erc20Token = new ethers.Contract(
          details.tokenAddress,
          erc20Abi,
          fromNetworkProvider
        );
        if (!details.senderAddress) return;
        try {
          // console.log("details.senderAddress", details.senderAddress);
          const erc20Balance = await erc20Token.balanceOf(
            details.senderAddress
          );
          setSelectedTokenBalance(formatEtherToLocaleString(erc20Balance));
        } catch (error) {
          console.log("fromNetwork balance error inside", error);
        }
      };
      fetchBalance();
    } catch (error) {
      console.log("fromNetwork balance error", error);
    }
    return () => {
      setUpdateBalances(false);
    };
  }, [details, fromNetwork]);

  const updateAmount = (value: string) => {
    // Allow numbers, comma, and dot, but ensure there is at least one digit before or after the decimal point
    const regex = /^(\d+[.,]?\d*|[.,]\d+)$/;
    if (selectedTokenBalance === '0' || selectedTokenBalance === '0.0' || selectedTokenBalance === '0.00') {
      setAmount('0');
    }
    if (value === "" || value === "." || value === ",") {
      setAmount("0");
    } else if (value === "0") {
      // Allow explicitly setting the value to '0'
      setAmount(value);
    } else if (regex.test(value)) {
      // Replace commas with dots and remove leading zeros
      const cleanedValue = value.replace(",", ".").replace(/^0*(?=\d)/, "");
      if (cleanedValue >= selectedTokenBalance) {
        setAmount(selectedTokenBalance);
      } else {
        setAmount(cleanedValue);
      }
    }
  };

  useEffect(() => {
    const getBnMFeeTokens = async () => {
      const availableFeeTokens = ccipRouterConfig.getRouterConfig(fromNetwork).feeTokens;
      // console.log("availableFeeTokens", availableFeeTokens);
      setFeeTokens(availableFeeTokens);
      if ("ETH" in availableFeeTokens) {
        // console.log('aici 1');
        setSelectedFeeToken(availableFeeTokens.ETH);
        setSelectedFeeSymbol("ETH");
      }
      if ("MATIC" in availableFeeTokens) {
        // console.log('aici 2');
        setSelectedFeeToken(availableFeeTokens.MATIC);
        setSelectedFeeSymbol("MATIC");
      }
      if ("AVAX" in availableFeeTokens) {
        // console.log('aici 3');
        setSelectedFeeToken(availableFeeTokens.AVAX);
        setSelectedFeeSymbol("AVAX");
      }
      if ("BNB" in availableFeeTokens) {
        // console.log('aici 4');
        setSelectedFeeToken(availableFeeTokens.BNB);
        setSelectedFeeSymbol("BNB");
      }
    };
    getBnMFeeTokens();
  }, [fromNetwork, toNetwork, address, chainId]);

  useEffect(() => {
    const getBnMFee = async () => {
      try {
        if (!details.destinationAccount) return;
        if (fromNetwork === toNetwork) return;

        const fromNetworkConfigLanes =
          ccipRouterConfig.getRouterConfig(fromNetwork).lanes;

        if (!fromNetworkConfigLanes) {
          console.error(`Configuration for ${fromNetwork} not found.`);
          return;
        }

        if (!fromNetworkConfigLanes.includes(toNetwork)) {
          // If toNetwork is not in lanes of fromNetwork, exit the function.
          console.log(`${toNetwork} is not in lanes of ${fromNetwork}`);
          return;
        }

        // console.log("updatedDetailsBefore", {
        //   details,
        //   amount: ethers.utils.parseEther(debouncedAmount.replace(",", ".")),
        // });

        const updatedDetails = {
          ...details,
          amount: ethers.utils.parseEther(debouncedAmount.replace(",", ".")),
        };

        // console.log("updatedDetails", updatedDetails);

        // TODO GRANT APPROVAL - SUPPORT ALL WHITELISTED TOKENS ON BOTH MAINNET AND TESTNET
        const { fees, message } = await getChainlinkCCIPFee(updatedDetails);
        // console.log("fees", fees);
        // console.log("message", message);
        setCcipFees(fees);
        setMessage(message);
      } catch (error) {
        console.log("error getBnMFee", error);
      }
    };
    getBnMFee();
  }, [fromNetwork, toNetwork, address, details, debouncedAmount, chainId]);

  const ccipCategories = {
    // top
    topCategories: ['General Access', 'Private Beta', 'GA + PB'],
    topAddons: ['Single-Token', 'Single-Token', 'Multi-Token'],
    topExtra: ['CCIP ERC20','CCIP ERC20','COMMING SOON'],
    status: ['ACTIVE','',''],
    // bottom
    categories: ['General Access', 'Private Beta', 'Messages', 'NFT', 'DeFi', 'Random', 'Assets', 'Payments'],
    addons: ['Multi-Token', 'Multi-Token', 'Contract-Call', 'Crosschain', 'Liqudity LP', 'Events', 'Tokenization', 'P2P'],
    extra: ['ERC20/ERC677','ERC20/ERC677','CCIP','ERC721/ERC1155','VRF+Keepers','Crosschain', 'Proof of reserve','CCIP'],
  }
  
  const [ccipMenu, setCcipMenu] = useGlobalState('ccipMenu');

  const processCcipCategory = (category: string) => {
    // Implement extra logic here to switch between tabs or handle category selection
    console.log(`Selected category: ${category}`);
    if(category === ccipCategories.topCategories[0]) setCcipMenu(CCIPMenuEnum.GeneralAccess)
    if(category === ccipCategories.topCategories[1]) setCcipMenu(CCIPMenuEnum.PrivateBeta)
    if(category === ccipCategories.topCategories[2]) return
    // if(category === ccipCategories.topCategories[2]) setCcipMenu(CCIPMenuEnum.GApb)
  }

  return (
    <section className={`w-full mx-auto`}>
      <Lottie
        animationData={CCIPAnimation}
        loop={true}
        style={{
          position: "absolute",
          height: "1456px",
          width: "100%",
          margin: "0 auto",
        }}
      />
      <div className="absolute mx-auto w-full">
        <div className="product-header_tag-wrapper">
          <Link
            target="_blank"
            href={`https://chain.link/cross-chain`}
            rel="noopener noreferrer"
            className="flex flex-row justify-center items-center gap-2 bg-zir rounded-lg my-2 py-1 w-28 mx-auto bg-chainlinkLavender"
          >
            <div className="flex">
              <Image
                src="/images/tokens/BnM.svg"
                loading="lazy"
                alt="Chainlink CCIP logo"
                width={23}
                height={23}
                className="mx-auto"
              />
            </div>
            <h1 className="text-chainlinkMirage flex justify-center text-xl">
              CCIP
            </h1>
          </Link>
        </div>
        <h2 className="flex w-full items-center justify-center text-center z-80 text-4xl my-2 text-chainlinkBlue">
          Cross-chain by Chainlink
        </h2>
        <h3 className="flex w-full items-center justify-center text-center z-80 text-2xl my-2 text-chainlinkBiscay">
          The era of secure blockchain interoperability has arrived.
        </h3>
        <section id="ccipCategories" className="grid grid-cols-3 gap-1 justify-items-center sm:flex sm:flex-row sm:justify-items-start items-center justify-center w-full mt-5">
          {ccipCategories.topCategories.map((topCategory, index) => (
            <button
              key={uuidv4()}
              onClick={() => processCcipCategory(topCategory)}
              className={`${ccipMenu === topCategory && 'border-chainlinkBlue border-2'} hover:opacity-90 rounded-tl rounded-tr rounded-lg mx-1 bg-chainlinkBiscay text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:border-chainlinkBlue focus:ring-opacity-50 transition duration-300 ease-in-out`}
            >
              <div className={`text-md h-10 flex justify-center items-center ${ccipMenu === topCategory ? 'bg-chainlinkBlue text-chainlinkZircon': 'bg-chainlinkLavender text-chainlinkMirage'} rounded-tl rounded-tr w-32 sm:w-44`}>{topCategory}</div>
              <div className={`text-sm h-9 flex justify-center items-center text-chainlinkPerano`}>{ccipCategories.topExtra[index]}</div>
              <div className={`text-sm h-8 flex justify-center items-center bg-chainlinkMirage`}>{ccipCategories.topAddons[index]}</div>
            </button>
          ))}
        </section>
        <div className={`flex w-full max-w-[480px] h-auto mx-auto my-4`}>
          <div
            className="bg-chainlinkBiscay w-full rounded-lg p-4"
            style={{
              boxShadow: "0px 9px 18px 2px rgba(0,0,0,0.71)",
            }}
          >
            <div className="flex justify-between">
              <CCIPNetworkButton
                setFromToNetwork={setFromNetwork}
                fromTo="From"
                networkReferenceFrom={fromNetwork}
                networkReferenceTo={toNetwork}
                networkName={
                  ccipRouterConfig.getRouterConfig(fromNetwork).networkName
                }
                networkStage={
                  ccipRouterConfig.getRouterConfig(fromNetwork).networkStage
                }
                networkLanes={[]}
              />
              <div className="flex items-center justify-center w-12 md:text-xl">
                {"<->"}
              </div>
              <CCIPNetworkButton
                setFromToNetwork={setToNetwork}
                fromTo="To"
                networkReferenceFrom={fromNetwork}
                networkReferenceTo={toNetwork}
                networkName={
                  ccipRouterConfig.getRouterConfig(toNetwork).networkName
                }
                networkStage={
                  ccipRouterConfig.getRouterConfig(toNetwork).networkStage
                }
                networkLanes={
                  ccipRouterConfig.getRouterConfig(fromNetwork).lanes
                }
              />
            </div>

            <div className="flex justify-between items-end mt-4 text-lg">
              <div>Amount</div>
              <div className="flex flex-row">
                <div className="mr-2">{selectedTokenBalance} BnM</div>
                <CCIPTokenIcon />
              </div>
            </div>

            <div className="flex justify-between text-lg mt-1 bg-chainlinkMirage">
              <input
                className="w-10/12 bg-chainlinkMirage pl-2 placeholder-white"
                name="tokenAmount"
                value={amount}
                onChange={(e) => updateAmount(e.target.value)}
              />
              <button className="w-1/3 flex flex-row justify-center items-center">
                <RotatingArrow active={true} pixels={18}/>
                <span className="mx-2"> BnM </span>
              </button>
              <button
                className="w-1/4 bg-chainlinkBlue hover:bg-opacity-80 border-r-lg"
                onClick={() => setAmount(selectedTokenBalance)}
              >
                MAX
              </button>
            </div>
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

            <CCIPBridgeFeeTokens
              ccipFees={ccipFees}
              feeTokens={feeTokens}
              openFeeTokenModal={openFeeTokenModal}
              selectedFeeSymbol={selectedFeeSymbol}
              setOpenFeeTokenModal={setOpenFeeTokenModal}
              setSelectedFeeToken={setSelectedFeeToken}
              setSelectedFeeSymbol={setSelectedFeeSymbol}
            />

            <CCIPBridgeTokensButton
              fromNetwork={fromNetwork}
              toNetwork={toNetwork}
              setToNetwork={setToNetwork}
              amount={debouncedAmount}
              details={details}
              ccipFees={details.ccipFees}
              message={generatedMessage}
            />

            <div className="flex justify-center items-center mt-4 w-full text-lg">
              <Link
                target="_blank"
                href={`https://ccip.chain.link/address/${address ?? ""}`}
                rel="noopener noreferrer"
                className="underline"
              >
                My transactions
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full text-chainlinkMirage">
          Built with 💜 for the {" "} 
          <div className="ml-1">
          <Link target="_blank" href="https://chain.link/hackathon" className="flex justify-center text-chainlinkBlue">
            {" "} Chainlink Constelation Hackathon
          </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full text-chainlinkMirage">
          <div className="flex justify-center"> by </div>
          <Link target="_blank" href="https://www.github.com/Liberalite" className="text-chainlinkBlue mx-1">
              Liberalite
          </Link>
          <div className="flex justify-center mr-1"> from </div>
          <Link target="_blank" href="https://www.randomizer.network/" className="text-chainlinkBlue">
              randomizer.network 
            </Link>
        </div>

        <div className="text-chainlinkZircon p-1 bg-chainlinkBlue flex flex-col items-center justify-center w-80 mt-44 mx-auto">
          <div className="flex justify-center text-center">More CCIP use cases comming soon <br/> for the Swiss Army Knive Roadmap</div>
        </div>
        <section id="ccipCategories" className="grid grid-cols-3 sm:grid-cols-4 gap-1 justify-items-center md:flex md:flex-row md:justify-items-start items-center justify-center w-full mt-5">
          {ccipCategories.categories.map((category, index) => (
            <button
              key={uuidv4()}
              onClick={() => processCcipCategory(category)}
              className="w-28 sm:w-36 rounded-lg px-1 sm:px-4 py-2 mx-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:border-chainlinkBlue focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <div className="text-md bg-chainlinkBlue p-1 rounded-tl rounded-tr h-14 flex items-center justify-center">{category}</div>
              <div className="text-sm bg-chainlinkMirage rounded-bl rounded-br">{ccipCategories.addons[index]}</div>
              <div className="text-xs text-chainlinkBlue mt-1">{ccipCategories.extra[index]}</div>
            </button>
          ))}
        </section>
      </div>
    </section>
  );
}
