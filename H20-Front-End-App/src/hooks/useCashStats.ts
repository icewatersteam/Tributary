import { useCallback, useEffect, useState } from 'react';
import useIceWater from './useIceWater';
import { TokenStat } from '../ice-water/types';
import config from '../config';

const useCashStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const iceWater = useIceWater();

  const fetchCashPrice = useCallback(async () => {
    setStat(await iceWater.getCashStatFromUniswap());
  }, [iceWater]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch BAB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, iceWater]);

  return stat;
};

export default useCashStats;
