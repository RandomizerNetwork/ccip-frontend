// CCIPBridge.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useDebounce } from "use-debounce";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { Message, TransferDetails } from "@/utils/types/ccip";
import Link from "next/link";
import Lottie from "lottie-react";
import useWallet from "@/hooks/useWallet";
import ccipRouterConfig, { FeeTokens } from "@/utils/providers/chainlink/ccip/config/router";
import ccipConfig from "@/utils/providers/chainlink/ccip/config";
import getChainlinkCCIPFee from "@/components/chainlink/ccip/utils/getChainlinkCCIPFee";
import useGlobalState from "@/store/globalState";
import getChainsByID from "@/utils/providers/chainlink/ccip/config/chainsByID";
import RotatingArrow from "@/components/header/partials/RotatingArrow";
import formatEtherToLocaleString from "@/utils/formatters/formatEther";
import erc20Abi from "@/utils/providers/chainlink/ccip/abi/IERC20Metadata.json";
import CCIPBridgeTokensButton from "@/components/chainlink/ccip/ui/CCIPBridgeTokensButton";
import CCIPNetworkButton from "@/components/chainlink/ccip/ui/CCIPNetworkButton";
import CCIPBridgeFeeTokens from "@/components/chainlink/ccip/ui/CCIPBridgeFeeTokens";
import CCIPAnimation from "@/public/lottie/ccip.json";
import CCIPTokenIcon from "@/components/chainlink/ccip/ui/CCIPTokenIcon";
import CCIPOptionalReceiverAddress from "@/components/chainlink/ccip/ui/CCIPOptionalReceiverAddress";
import CCIPHeaderSection from "@/components/chainlink/ccip/ui/CCIPHeaderSection";
import CCIPHeaderTopMenu from "@/components/chainlink/ccip/ui/CCIPHeaderTopMenu";
import CCIPBottomMenu from "@/components/chainlink/ccip/ui/CCIPBottomMenu";
import CCIPFooterAuthor from "@/components/chainlink/ccip/ui/CCIPFooterAuthor";

// TODO CCIP UI
// [x] 1. FEE TOKENS MINI-MODAL
// [X] 2. TOKEN ON EVERY TESTNET CHAIN
// [X] 3. TOKEN BALANCE
// [X] 4. TOKEN CCIP MAX AMOUNT AND CHECK BALANCE AMOUNT
// [x] 5. Multi Approve TOKEN + Fee Token in steps
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
// [x] 20. Add hardhat with deterministic utility contract
// [x] 21. Deploy deterministic factory contract on 7 chains
// [x] 22. Deploy deterministic ccip contract on 7 chains
// [x] 23. Make UI adaptable to both General Access and Early Access methods with CCIP Single ERC20Token transfer between chains
// [x] 24. Added optional receiver 

// TODO
// [x] 1. CCIP Bridge - General Access Single Token
// [-] 2. CCIP Bridge - General Access Multi Token
// [x] 3. CCIP Bridge - Early Access Single Token
// [-] 4. CCIP Bridge - Early Access Multi Token
// [-] 5. CCIP Bridge - Early Access NFT Bridge
// [-] 6. CCIP Bridge - Early Access DeFi Bridge
// [-] 7. CCIP Bridge - Early Access P2P Payments Bridge
// [-] 8. CCIP Bridge - Early Access Asset TokenizationBridge

export default function CCIPBridge() {
  const { ethersProvider } = useWallet();

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [fromNetwork, setFromNetwork] = useGlobalState("fromNetwork");
  const [toNetwork, setToNetwork] = useGlobalState("toNetwork");
  const [receiverAddress] = useGlobalState("receiverAddress");
  const [, setUpdateBalances] = useGlobalState("updateBalances");

  const [generatedMessage, setMessage] = useState<Message>();
  const [feeTokens, setFeeTokens] = useState<FeeTokens>();
  const [selectedFeeToken, setSelectedFeeToken] = useState<string>("");
  const [selectedTokenBalance, setSelectedTokenBalance] = useState<string>("0.00");
  const [selectedFeeSymbol, setSelectedFeeSymbol] = useState<string>("ETH");
  const [openFeeTokenModal, setOpenFeeTokenModal] = useState<boolean>(false);
  const [ccipFees, setCcipFees] = useState<string>("0");
  const [amount, setAmount] = useState<string>("0");

  const [debouncedAmount] = useDebounce(amount, 500); // 500ms delay

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
    const getFeeTokens = async () => {
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
    getFeeTokens();
  }, [fromNetwork, toNetwork, address, chainId]);

  useEffect(() => {
    const getCCIPFee = async () => {
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
        console.log("error getCCIPFee", error);
      }
    };
    getCCIPFee();
  }, [fromNetwork, toNetwork, address, details, debouncedAmount, chainId]);

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
        <CCIPHeaderSection />
        <CCIPHeaderTopMenu />
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
                {/* <RotatingArrow active={true} pixels={18}/> */}
                <span className="mx-2"> BnM </span>
              </button>
              <button
                className="w-1/4 bg-chainlinkBlue hover:bg-opacity-80 border-r-lg"
                onClick={() => setAmount(selectedTokenBalance)}
              >
                MAX
              </button>
            </div>
            <CCIPOptionalReceiverAddress />

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
        <CCIPFooterAuthor />
        <CCIPBottomMenu />
      </div>
    </section>
  );
}
