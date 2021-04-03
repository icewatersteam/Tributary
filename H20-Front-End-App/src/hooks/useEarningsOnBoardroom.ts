import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useIceWater from './useIceWater';
import config from '../config';

const useEarningsOnBoardroom = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const iceWater = useIceWater();

  const fetchBalance = useCallback(async () => {
    setBalance(await iceWater.getEarningsOnBoardroom());
  }, [iceWater?.isUnlocked]);

  useEffect(() => {
    if (iceWater?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [iceWater?.isUnlocked, setBalance]);

  return balance;
};

export default useEarningsOnBoardroom;
