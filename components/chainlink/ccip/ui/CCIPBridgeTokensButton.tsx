// CCIPBridgeTokensButton.tsx
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { useSetChain } from '@web3-onboard/react';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from '@ethersproject/units';
import { Message, TransferDetails } from '@/utils/types/ccip';
import { triggerToast } from '@/utils/helpers/toast';
import useWallet from '@/hooks/useWallet';
import getChainID from '@/utils/providers/chainlink/ccip/config/chains';
import ccipRouterConfig from '@/utils/providers/chainlink/ccip/config/router';
import CCIPTransferTokens from '../utils/CCIPTransferTokens';
import CCIPApproveModal from './CCIPApproveModal';
import erc20Abi from '@/utils/providers/chainlink/ccip/abi/IERC20Metadata.json';
import ccipConfig from '@/utils/providers/chainlink/ccip/config';
import routerAbi from '@/utils/providers/chainlink/ccip/abi/Router.json';
import CCIPTokenSenderABI from '@/utils/providers/chainlink/ccip/abi/CCIPTokenSenderABI.json';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import getChainsByID from '@/utils/providers/chainlink/ccip/config/chainsByID';
import changeNetwork from '@/utils/helpers/changeNetwork';
import useGlobalState from '@/store/globalState';
import { CCIPMenuEnum } from '@/utils/types/store';

interface IBridgeButton {
  fromNetwork: string;
  toNetwork: string;
  setToNetwork: Dispatch<SetStateAction<string>>;
  details: TransferDetails;
  amount: string;
  ccipFees: string;
  message: Message | undefined;
}

export default function CCIPBridgeTokensButton({
  fromNetwork,
  toNetwork,
  setToNetwork,
  details,
  amount,
  ccipFees,
  message,
}: IBridgeButton) {
  const { ethersProvider } = useWallet();

  const parsedFee = ethers.utils.parseEther(ccipFees);

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider()
  
  const [ccipMenu] = useGlobalState('ccipMenu');

  useEffect(() => {
    setToNetwork(ccipRouterConfig.getRouterConfig(fromNetwork).lanes[0]);
  }, [fromNetwork, setToNetwork]);

  const [retriggerState, setRetriggerState] = useState(false);
  const [bnmAllowance, setBnMAllowance] = useState('0.00');
  const [feeTokenAllowance, setFeeTokenAllowance] = useState('0.00');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalApprovalSelection, setModalApprovalSelection] = useState(true);

  // APPROVAL
  const [bnmApproved, setBnMApproved] = useState(false);
  const [feeTokenApproved, setFeeTokenApproved] = useState(false);

  // Get the router's address for the specified chain
  const sourceRouterAddress = ccipConfig.getRouterConfig(
    details.sourceChain
  ).address;
  const sourceChainSelector = ccipConfig.getRouterConfig(
    details.sourceChain
  ).chainSelector;
  // Get the chain selector for the target chain
  const destinationChainSelector = ccipConfig.getRouterConfig(
    details.destinationChain
  ).chainSelector;
  const ccipTokenSenderAddress = ccipConfig.getRouterConfig(
    details.sourceChain
  ).ccipTokenSenderContract;

  const amountBN: BigNumber = ethers.utils.parseEther(amount.replace(',', '.'));

  // Function to check BnM approval
  const checkBnMApproval = async () => {
    try {
      // Check BnM allowance
      // if (Number(amount) === 0) return;
      if (!ethersProvider) return;
      const signer = ethersProvider.getSigner();
      if (!signer) return;
      const erc20 = new ethers.Contract(
        details.tokenAddress,
        erc20Abi,
        ethersProvider
      );
      const allowance: BigNumber = await erc20.allowance(
        details.senderAddress,
        ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress
      );
      setBnMAllowance(
        `${ethers.utils.formatEther(allowance.toString())} ${details.tokenKey}`
      );
      // console.log('ERC20 allowanceallowance', formatEther(allowance));
      // console.log('ERC20 amountBNamountBN', formatEther(amountBN));
      // console.log('ERC20 allowance >= amountBN', allowance >= amountBN);
      // console.log('ERC20 amountBN >= allowance', amountBN >= allowance);
      if (allowance.gte(amountBN)) {
        setBnMApproved(true);
        return;
      }
      if (amountBN.gte(allowance)) {
        setBnMApproved(false);
      }
      setBnMApproved(false);
    } catch (error) {
      // console.log('error in checkBnMApproval', error);
      setBnMApproved(false);
      // triggerToast('ERROR');
    }
  };

  // Function to approve BnM
  const approveBnM = async () => {
    try {
      if (!chainId) return
      if (`0x${chainId.toString(16)}` !== getChainID(fromNetwork)) {
        console.log('`0x${chainId.toString(16)}` !== getChainID(fromNetwork)', `0x${chainId.toString(16)}` !== getChainID(fromNetwork))
        changeNetwork(isConnected, walletProvider, getChainID(fromNetwork));
        return;
      }
      // First approve the router to spend tokens, after approval, setBnMApproved(true);
      if (!ethersProvider) return 'Missing ethersProvider';
      const signer = ethersProvider.getSigner();
      if (!signer) return 'Missing signer';
      // if (connectedChain !== getChainID(fromNetwork)) {
      //   setChain({ chainId: getChainID(fromNetwork) });
      //   return 'Switching chain';
      // }
      const erc20 = new ethers.Contract(details.tokenAddress, erc20Abi, signer);

      try {
        const approvalTx = await erc20.approve(
          ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress,
          modalApprovalSelection ? amountBN : ethers.constants.MaxUint256
        );
        triggerToast('QUEUE_APPROVAL_WAITING');
        await approvalTx.wait(); // wait for the transaction to be mined
        triggerToast('QUEUE_APPROVAL_SUCCESS');
        console.log(
          `1 approved router ${ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress} to spend ${amountBN.toString()} 
            of token ${details.tokenAddress}. Transaction: ${approvalTx.hash}`
        );
        // setBnMApproved(true);
        setRetriggerState(!retriggerState);
        return 'Approval successful';
      } catch (error) {
        triggerToast('ERROR', 'Approval rejected by user!');
        setBnMApproved(false);
        return 'Already approved';
      }
      // } else {
      //   setBnMApproved(true);
      //   return 'Already approved';
      // }
    } catch (error) {
      console.log('error in approveBnM', error);
      setBnMApproved(false);
      return 'Error in approval process';
    }
  };

  // Function to check Fee token approval
  const checkFeeTokenApproval = async () => {
    // logic to check Fee token approval based on checks);
    // setFeeTokenApproved(true/false
    try {
      // Check BnM allowance
      // if (Number(amount) === 0) return;
      // if (!details.ethersProvider) return;
      if (!ethersProvider) return 'Missing ethersProvider';
      const signer = ethersProvider.getSigner();
      if (!signer) return;
      if (details.feeTokenAddress !== '') {
        const erc20 = new ethers.Contract(
          details.feeTokenAddress,
          erc20Abi,
          signer
        );
        const allowance: BigNumber = await erc20.allowance(
          details.senderAddress,
          ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress,
        );
        // setBnMAllowance(`${ethers.utils.formatEther(allowance.toString())} ${details.tokenKey}`)
        setFeeTokenAllowance(
          `${ethers.utils.formatEther(allowance.toString())} ${
            details.feeTokenSymbol
          }`
        );
        console.log('FEE allowanceallowance', allowance);
        console.log('FEE amountBNamountBN', amountBN);
        console.log('FEE allowance >= amountBN', allowance >= amountBN);
        console.log('FEE amountBN >= allowance', amountBN > allowance);
        if (allowance.gte(amountBN)) {
          setFeeTokenApproved(true);
          return
        } else if (amountBN > allowance) {
          setFeeTokenApproved(false);
          return
        }
        setFeeTokenApproved(false);
      } else {
        setFeeTokenApproved(true);
      }
    } catch (error) {
      // console.log('error in checkBnMApproval', error);
      setFeeTokenApproved(false);
      // triggerToast('ERROR');
    }
  };

  // Function to approve Fee token
  const approveFeeToken = async () => {
    try {
      // Pay native
      // First approve the router to spend tokens
      // After approval, setBnMApproved(true);
      if (!chainId) return
      if (`0x${chainId.toString(16)}` !== getChainID(fromNetwork)) {
        console.log('`0x${chainId.toString(16)}` !== getChainID(fromNetwork)', `0x${chainId.toString(16)}` !== getChainID(fromNetwork))
        changeNetwork(isConnected, walletProvider, getChainID(fromNetwork));
        return;
      }
      if (!ethersProvider) return 'Missing ethersProvider';
      const signer = ethersProvider.getSigner();
      if (!signer) return 'Missing signer';
      // if (connectedChain !== getChainID(fromNetwork)) {
      //   setChain({ chainId: getChainID(fromNetwork) });
      //   return 'Switching chain';
      // }

      // Create a contract instance for the router using its ABI and address
      // const sourceRouter = new ethers.Contract(
      //   sourceRouterAddress,
      //   routerAbi,
      //   signer
      // );

      // Create a contract instance for the token using its ABI and address
      const erc20 = new ethers.Contract(details.tokenAddress, erc20Abi, signer);
      const allowance = await erc20.allowance(
        details.senderAddress,
        ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress,
      );
      // let sendTx;
      let approvalTx;
      console.log('allowance', allowance);

      if (!details.feeTokenAddress) {
        console.log(`!feeTokenAddress`);
        // Pay native
        // First approve the router to spend tokens
        // approvalTx = await erc20.approve(sourceRouterAddress, '0');

        if (amountBN > allowance) {
          approvalTx = await erc20.approve(ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress, amountBN);
          triggerToast('QUEUE_APPROVAL_WAITING');
          await approvalTx.wait(); // wait for the transaction to be mined
          triggerToast('QUEUE_APPROVAL_SUCCESS');
          console.log(
            `1 approved router ${ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress} to spend ${amountBN.toString()} of token ${
              details.tokenAddress
            }. Transaction: ${approvalTx.hash}`
          );
        }

        setRetriggerState(!retriggerState);
        return 'Succesfully Approved with native coins the CCIP Router to transfer tokens directly';
      }
      if (
        details.tokenAddress.toUpperCase() ===
        details.feeTokenAddress.toUpperCase()
      ) {
        console.log(
          `!feeTokenAddress if (tokenAddress.toUpperCase() === feeTokenAddress.toUpperCase()) {`
        );
        // fee token is the same as the token to transfer
        // Amount tokens to approve are transfer amount + fees
        if (amountBN.add(parsedFee) > allowance) {
          approvalTx = await erc20.approve(
            ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress,
            amountBN.add(parsedFee)
          );
          triggerToast('QUEUE_APPROVAL_WAITING');
          await approvalTx.wait(); // wait for the transaction to be mined
          triggerToast('QUEUE_APPROVAL_SUCCESS');
          console.log(
            `2 approved router ${ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress} to spend ${amountBN.toString()} and fees ${parsedFee} of token ${
              details.tokenAddress
            }. Transaction: ${approvalTx.hash}`
          );
        }

        return 'Succesfully Approved with erc20 token as fees the CCIP Router to transfer tokens with fee token';
      }
      console.log(
        `else !feeTokenAddress if (tokenAddress.toUpperCase() === feeTokenAddress.toUpperCase()) {`
      );
      // fee token is different than the token to transfer
      // 2 approvals
      if (amountBN > allowance) {
        approvalTx = await erc20.approve(ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress, amountBN); // 1 approval for the tokens to transfer
        triggerToast('QUEUE_APPROVAL_WAITING');
        await approvalTx.wait(); // wait for the transaction to be mined
        triggerToast('QUEUE_APPROVAL_SUCCESS');
        console.log(
          `3 approved router ${ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress} to spend ${amountBN.toString()} of token ${
            details.tokenAddress
          }. Transaction: ${approvalTx.hash}`
        );
      }
      const erc20Fees = new ethers.Contract(
        details.feeTokenAddress,
        erc20Abi,
        signer
      );
      approvalTx = await erc20Fees.approve(ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress, parsedFee); // 1 approval for the fees token
      await approvalTx.wait();
      console.log(
        `4 approved router ${ccipMenu === CCIPMenuEnum.GeneralAccess ? sourceRouterAddress : ccipTokenSenderAddress} to spend  fees ${parsedFee} of token ${details.feeTokenAddress}. Transaction: ${approvalTx.hash}`
      );

      setRetriggerState(!retriggerState);
      return 'Succesfully Approved the CCIP Router to transfer tokens with ERC20 token as fee';
    } catch (error) {
      console.log('error in approveBnM', error);
      setBnMApproved(false);
      triggerToast('ERROR', 'Approval rejected by user!');
      return 'Error in approval process';
    }
  };

  useEffect(() => {
    checkBnMApproval();
    checkFeeTokenApproval();
  }, [
    ccipMenu,
    details,
    chainId,
    ethersProvider,
    address,
    bnmApproved,
    feeTokenApproved,
    retriggerState,
  ]);

  const handleBridgeCall = async () => {
    try {
      if (!chainId) return
      if (`0x${chainId.toString(16)}` !== getChainID(fromNetwork)) {
        console.log('`0x${chainId.toString(16)}` !== getChainID(fromNetwork)', `0x${chainId.toString(16)}` !== getChainID(fromNetwork))
        changeNetwork(isConnected, walletProvider, getChainID(fromNetwork));
        return;
      }
      if (amount === '0' || amount === '0.0' || amount === '0.00') return;
      if (!address || !ethersProvider || !message) return;
      // const testCCIPTransferTokens = await CCIPTransferTokens(
      //   details,
      //   fees,
      //   message
      // );
      // console.log('testCCIPTransferTokens', testCCIPTransferTokens);

      // Create a contract instance for the router using its ABI and address
      // if (!ethersProvider) return;
      const signer = ethersProvider.getSigner();
      if (!signer) return;

      if(ccipMenu === CCIPMenuEnum.GeneralAccess) {
        const sourceRouter = new ethers.Contract(
          sourceRouterAddress,
          routerAbi,
          signer
        );
  
        let sendTx;
        let receiptTx;
        if (!details.feeTokenAddress) {
          sendTx = await sourceRouter.ccipSend(
            destinationChainSelector,
            message,
            {
              value: parsedFee.toString(),
            }
          ); // fees are send as value since we are paying the fees in native
          receiptTx = await sendTx.wait(); // wait for the transaction to be mined
        } else {
          sendTx = await sourceRouter.ccipSend(destinationChainSelector, message);
          receiptTx = await sendTx.wait(); // wait for the transaction to be mined
        }
        console.log('sendTx', sendTx);
        console.log('receiptTx', receiptTx);
  
        triggerToast('SUCCESS', `Succesfully sent ${details.feeTokenSymbol}`);
      }

      if(ccipMenu === CCIPMenuEnum.PrivateBeta) {
        // const sourceRouter = new ethers.Contract(
        //   sourceRouterAddress,
        //   routerAbi,
        //   signer
        // );

        const ccipTokenSenderContract = new ethers.Contract(
          ccipTokenSenderAddress,
          CCIPTokenSenderABI,
          signer
        )
  
        let sendTx;
        let receiptTx;
        if (!details.feeTokenAddress) {
          sendTx = await ccipTokenSenderContract.ccipSend(
            destinationChainSelector,
            message,
            {
              value: parsedFee.toString(),
            }
          ); // fees are send as value since we are paying the fees in native
          receiptTx = await sendTx.wait(); // wait for the transaction to be mined
        } else {
          sendTx = await ccipTokenSenderContract.ccipSend(destinationChainSelector, message);
          receiptTx = await sendTx.wait(); // wait for the transaction to be mined
        }
        console.log('sendTx', sendTx);
        console.log('receiptTx', receiptTx);
  
        triggerToast('SUCCESS', `Succesfully sent ${details.feeTokenSymbol}`);
      }

      // const testCCIPTransferTokens = await CCIPTransferTokens(
      //   details,
      //   // ccipFees,
      //   sendTx,
      //   receiptTx
      //   // message
      // );
      // console.log('testCCIPTransferTokens', testCCIPTransferTokens);

      // setRetriggerState(!retriggerState);
    } catch (error) {
      console.error('error', error);
      // triggerToast('ERROR', "Something broke, please try again!");

      // Check if error is an instance of Error
      if (error instanceof Error) {
        let errorMessage = 'Something broke, please try again!';

        // Specific error handling for gas estimation
        if (error.message.includes('cannot estimate gas')) {
          errorMessage =
            'Error estimating gas: Transaction may fail or may require manual gas limit.';
        }
        // Handling for SafeERC20 low-level call failure
        else if (error.message.includes('SafeERC20: low-level call failed')) {
          errorMessage = 'SafeERC20 error: Low-level call failed.';
        }
        // Additional specific error checks can be added here

        // Trigger the toast notification with the custom message
        triggerToast('ERROR', errorMessage);
      } else {
        // Handle non-Error objects (rare cases)
        triggerToast('ERROR', 'An unknown error occurred.');
      }
    }
  };

  return (
    <>
      <div className="flex w-full">
        {!bnmApproved && (
          <>
            <button
              // onClick={() => handleBridgeCall()}
              onClick={() => approveBnM()}
              type="button"
              // disabled={true}
              className="flex flex-col border-chainlinkZircon w-10/12 border-t-2 border-l-2 border-b-2 text-center items-center justify-center bg-chainlinkBiscay rounded-l-lg mt-4 h-20 text-xl"
            >
              <div>
                Approve {modalApprovalSelection && ethers.utils.formatEther(details.amount).toString()}{' '}
                {details.tokenKey}{' '}
                {!modalApprovalSelection && 'permanently'}
              </div>
              <span className="text-sm">Allowance {bnmAllowance}</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="flex-none w-2/12 border-chainlinkZircon border-2 text-center items-center justify-center bg-chainlinkBlue rounded-r-lg hover:bg-opacity-80 mt-4 text-xl"
            >
              ⬇
            </button>
            {isModalOpen && (
              <CCIPApproveModal
                setIsModalOpen={setIsModalOpen}
                setModalApprovalSelection={setModalApprovalSelection}
                tokenKey={details.tokenKey}
                tokenAmount={formatEther(details.amount)}
              />
            )}
          </>
        )}

        {bnmApproved && !feeTokenApproved && (
          <>
            <button
              // onClick={() => handleBridgeCall()}
              onClick={() => approveFeeToken()}
              type="button"
              className="flex flex-col border-chainlinkZircon w-10/12 border-t-2 border-l-2 border-b-2 text-center items-center justify-center bg-chainlinkBiscay rounded-l-lg mt-4 h-20 text-xl"
            >
              Approve {details.feeTokenSymbol} Fee
              {modalApprovalSelection ? '' : 'permanently'}
              <span className="text-sm">Allowance {feeTokenAllowance}</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="flex-none w-2/12 border-chainlinkZircon border-2 text-center items-center justify-center bg-chainlinkBlue rounded-r-lg hover:bg-opacity-80 mt-4 text-xl"
            >
              ⬇
            </button>
            {isModalOpen && (
              <CCIPApproveModal
                setIsModalOpen={setIsModalOpen}
                setModalApprovalSelection={setModalApprovalSelection}
                tokenKey={details.feeTokenSymbol}
                tokenAmount={details.ccipFees}
              />
            )}
          </>
        )}
      </div>
      {bnmApproved && feeTokenApproved && (
        <button
          onClick={() => handleBridgeCall()}
          type="button"
          className="border-chainlinkZircon border-2 flex text-center items-center justify-center bg-chainlinkBlue rounded-lg hover:bg-opacity-80 mt-4 w-full h-20 text-lg sm:text-xl"
        >
          Bridge {details.tokenKey} from{' '}
          {ccipRouterConfig.getRouterConfig(fromNetwork).networkName} to{' '}
          {ccipRouterConfig.getRouterConfig(toNetwork).networkName}
        </button>
      )}
    </>
  );
}
