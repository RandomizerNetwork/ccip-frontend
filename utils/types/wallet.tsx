import { StaticImageData } from 'next/image';
import { ContractInterface } from '@ethersproject/contracts';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

export type ContractInstantiation = {
  address: string;
  abi: ContractInterface;
  provider: Web3Provider;
};

export type WalletButtonProps = {
  img: StaticImageData;
  alt: string;
  altText: string;
  isLast: boolean;
  onClick: () => void;
};

export type WalletTokenAddressess = {
  [key: string]: string;
};

export const bnFrom = (number: BigNumber) => BigNumber.from(number).toString();
export const bnToNumber = (number: BigNumberish) =>
  BigNumber.from(number).toNumber();
export const toBN = (number: BigNumberish) => BigNumber.from(number);

export type CoinIconType = {
  size: number;
  svg: string;
  name: string;
  alt: string;
  extraClass?: string;
};
