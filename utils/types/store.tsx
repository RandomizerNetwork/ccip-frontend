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


export type CCIPCategories = {
  // top
  topCategories: string[],
  topAddons: string[],
  topExtra: string[],
  status: string[],
  // bottom
  categories: string[],
  addons: string[],
  extra: string[],
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
  ccipCategories: CCIPCategories;
  receiverAddress: string | `0x${string}` | undefined;
};
