import ERC20 from './ERC20';

export type ContractName = string;

export type BalanceData = {
  amount: number;  
};

export type BidData = {
  amount: number;  
  price: number;
};

export type AskData = {
  amount: number;  
  price: number;
};

/* Legacy stuff, may be able to remove */ 
export interface BankInfo {
  name: string;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
}

export interface Bank extends  BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type TokenStat = {
  priceInDAI: string;
  totalSupply: string;
};

export type TreasuryAllocationTime = {
  prevAllocation: Date;
  nextAllocation: Date;
}

