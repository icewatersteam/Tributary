import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import IceWater from '../../ice-water';
import config from '../../config';

export interface IceWaterContext {
  iceWater?: IceWater;
}

export const Context = createContext<IceWaterContext>({ iceWater: null });

export const IceWaterProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
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

  return <Context.Provider value={{ iceWater }}>{children}</Context.Provider>;
};
