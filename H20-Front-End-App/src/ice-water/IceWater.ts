import { Fetcher, Route, Token } from '@uniswap/sdk';
import { Configuration } from './config';
//import { ContractName, TokenStat, TreasuryAllocationTime } from './types';
import { ContractName, BalanceData, BidData, AskData } from './types';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import Web3 from 'web3';
import { useWallet } from 'use-wallet';

/**
 * An API module of Ice Water contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class IceWater {
  myAccount: string;  
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};   
    
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }

    console.log(this.contracts)    

    this.config = cfg;
    this.provider = provider;
  }
  
  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    // ropsten.infura.io/
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;

    //console.log(`Wallet is unlocked. Welcome, ${account}!`);    
    
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    this.getBalanceOfWater();
  }

  /**
   * @param price Bid price
   * @param ammount Bid Amount
   */
   async sendIceBid(price: number, amount: number): Promise<TransactionResponse> {       
    //const { H2O } = this.contracts['h2o'];
    return await this.contracts['h2o'].iceBid(price, amount);    
  }

  /**
   * @param price Ask price
   * @param ammount Ask Amount
   */
   async sendIceAsk(price: number, amount: number): Promise<TransactionResponse> {           
    return await this.contracts['h2o'].iceAsk(price, amount);    
  }

  /**
   * @param price Bid price
   * @param ammount Bid Amount
   */
   async sendSteamBid(price: number, amount: number): Promise<TransactionResponse> {       
    //const { H2O } = this.contracts['h2o'];
    return await this.contracts['h2o'].steamBid(price, amount);    
  }

  /**
   * @param price Ask price
   * @param ammount Ask Amount
   */
   async sendSteamAsk(price: number, amount: number): Promise<TransactionResponse> {           
    return await this.contracts['h2o'].steamAsk(price, amount);    
  }  

  /**
   * Converts a hex string into a real number
   * @param hex Bid price
   * @return number
   */
  hexToNumber(hex: string): number {  
    return Number(hex) / 1000000000000000000;
  }

  /**
   * Get balance of Water   
   * @return BalanceData
   */
  async getBalanceOfWater(): Promise<BalanceData> {
    if ( !this.myAccount ) {
      return {
        amount: null
      }
    }
    const balance: BigNumber = await this.contracts['h2o'].balanceOfWater(this.myAccount) 
   
    // WHY? Does this require hexToNumber whereas getIceBid doesn't?
    return {
      amount: this.hexToNumber(ethers.utils.hexValue(balance)) 
    }
  }

  /**
   * Get balance of Ice   
   * @return BalanceData
   */
    async getBalanceOfIce(): Promise<BalanceData> {
      if ( !this.myAccount ) {
        return {
          amount: null
        }
      }  
      const balance: BigNumber = await this.contracts['h2o'].balanceOfIce(this.myAccount)
      return {
        amount: this.hexToNumber(ethers.utils.hexValue(balance)) 
      }
    }

  /**
   * Get balance of Steam   
   * @return BalanceData
   */
   async getBalanceOfSteam(): Promise<BalanceData> {
    if ( !this.myAccount ) {
      return {
        amount: null
      }
    }  
    const balance: BigNumber = await this.contracts['h2o'].balanceOfSteam(this.myAccount)
    
    return {
      amount: this.hexToNumber(ethers.utils.hexValue(balance)) 
    }
  }    


  /**
   * Get Current Ice Price (aka Last ice Price)
   * @return BidData
   */
   async getIcePrice(): Promise<number> {    
    const price: BigNumber = await this.contracts['h2o'].currentIcePrice() 
    return Number(ethers.utils.hexValue(price))
  }

  /**
   * Get Current Steam Price (aka Last Steam Price)
   * @return BidData
   */
     async getSteamPrice(): Promise<number> {    
      const price: BigNumber = await this.contracts['h2o'].currentSteamPrice() 
      return Number(ethers.utils.hexValue(price))
    }


  /**
   * Get Ice Bid, amount & price 
   * @return BidData
   */
  async getIceBid(): Promise<BidData> {
    if ( !this.myAccount ) {
      return {
        amount: null,
        price: null
      }
    } 

    const price: BigNumber = await this.contracts['h2o'].iceBidPrice(this.myAccount)
    const amount: BigNumber = await this.contracts['h2o'].iceBidAmount(this.myAccount)

    return {      
      price: Number(ethers.utils.hexValue(price)),
      amount: Number(ethers.utils.hexValue(amount))
    }    
  }

  /**
   * Get Ice Ask, amount & price 
   * @return AskData
   */
  async getIceAsk(): Promise<AskData> {
    if ( !this.myAccount ) {
      return {
        amount: null,
        price: null
      }
    } 

    const price: BigNumber = await this.contracts['h2o'].iceAskPrice(this.myAccount)
    const amount: BigNumber = await this.contracts['h2o'].iceAskAmount(this.myAccount)    
  
    return {      
      price: Number(ethers.utils.hexValue(price)),
      amount: Number(ethers.utils.hexValue(amount))
    }
  }
 
/**
   * Get Steam Bid, amount & price 
   * @return BidData
   */
 async getSteamBid(): Promise<BidData> {
  if ( !this.myAccount ) {
    return {
      amount: null,
      price: null
    }
  } 

  const price: BigNumber = await this.contracts['h2o'].steamBidPrice(this.myAccount)
  const amount: BigNumber = await this.contracts['h2o'].steamBidAmount(this.myAccount)

  return {      
    price: Number(ethers.utils.hexValue(price)),
    amount: Number(ethers.utils.hexValue(amount))
  }    
}

/**
 * Get Steam Ask, amount & price 
 * @return AskData
 */
async getSteamAsk(): Promise<AskData> {
  if ( !this.myAccount ) {
    return {
      amount: null,
      price: null
    }
  } 

  const price: BigNumber = await this.contracts['h2o'].steamAskPrice(this.myAccount)
  const amount: BigNumber = await this.contracts['h2o'].steamAskAmount(this.myAccount)

  return {      
    price: Number(ethers.utils.hexValue(price)),
    amount: Number(ethers.utils.hexValue(amount))
  }
} 

/**
 * Get Ice Supply
 * @return number
 */
 async getIceSupply(): Promise<number> {  
  const supply: BigNumber = await this.contracts['h2o'].totalIceSupply()
  return Number(this.hexToNumber(ethers.utils.hexValue(supply)))
} 

/**
 * Get Steam Supply
 * @return number
 */
 async getSteamSupply(): Promise<number> {  

  const supply: BigNumber = await this.contracts['h2o'].totalSteamSupply()
  
  // console.log("steam supply")
  // console.log(supply)
  // console.log(ethers.utils.hexValue(supply))      
  // console.log(Number(this.hexToNumber(ethers.utils.hexValue(supply))))
  // console.log(Number(supply))

  return Number(this.hexToNumber(ethers.utils.hexValue(supply)))
} 

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

}
