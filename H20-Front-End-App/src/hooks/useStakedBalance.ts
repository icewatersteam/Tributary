import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useIceWater from './useIceWater';
import { ContractName } from '../ice-water';
import config from '../config';

const useStakedBalance = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const iceWater = useIceWater();

  const fetchBalance = useCallback(async () => {
    const balance = await iceWater.stakedBalanceOnBank(poolName, iceWater.myAccount);
    setBalance(balance);
  }, [iceWater?.isUnlocked, poolName]);

  useEffect(() => {
    if (iceWater?.isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [iceWater?.isUnlocked, poolName, setBalance, iceWater]);

  return balance;
};

export default useStakedBalance;
