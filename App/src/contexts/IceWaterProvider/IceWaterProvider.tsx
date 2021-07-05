import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import IceWater from '../../ice-water';
import config from '../../config';

export interface IceWaterContext {
  iceWater?: IceWater;
}

export const Context = createContext<IceWaterContext>({ iceWater: null });

export const IceWaterProvider: React.FC = ({ children }) => {
  const { ethereum, account, status, error } = useWallet();
  const [iceWater, setIceWater] = useState<IceWater>();  
  
  useEffect(() => {
    if (!iceWater) {      
      const ice = new IceWater(config);
      if (account) {              
        // wallet was unlocked at initialization
        ice.unlockWallet(ethereum, account);
      }      
      setIceWater(ice);
    
    } else if (account) {    
      iceWater.unlockWallet(ethereum, account);
    }

  }, [account]);

  /*
  useEffect(() => {    
    console.log("useWallet (status): " + status);
  }, [status]);
  */

  useEffect(() => {      
    if ( error ) {
      console.log(error);    
    }    
  }, [error]);

  return <Context.Provider value={{ iceWater }}>{children}</Context.Provider>;
};
