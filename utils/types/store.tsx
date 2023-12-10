import { BigNumber } from 'ethers';
import { TokenBalances } from './balances';

export type CCIPMessage = {
  destinationAccount: string;
  tokenAddress: string;
  amount: BigNumber;
  feeTokenAddress: string;
};

export enum CCIPMenuEnum {
  GeneralAccess = "General Access",
  PrivateBeta = "Private Beta",
  GApb = "GA + PB", // General Access + Private Beta
}

export type GlobalTypes = {
  isLoading: boolean;
  sideNavMenuOpen: boolean;
  updateBalances: boolean;
  balances: TokenBalances;
  fromNetwork: string;
  toNetwork: string;
  ccipStore: CCIPMessage;
  ccipMenu: CCIPMenuEnum;
  receiverAddress: string | `0x${string}` | undefined;
};
