import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../ice-water/ERC20';
import useIceWater from './useIceWater';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const iceWater = useIceWater();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(iceWater.myAccount));
  }, [iceWater?.isUnlocked, token]);

  useEffect(() => {
    if (iceWater?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [iceWater?.isUnlocked, token]);

  return balance;
};

export default useTokenBalance;
