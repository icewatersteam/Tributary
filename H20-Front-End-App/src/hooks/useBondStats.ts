import { useCallback, useEffect, useState } from 'react';
import useIceWater from './useIceWater';
import { TokenStat } from '../ice-water/types';
import config from '../config';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const iceWater = useIceWater();

  const fetchBondPrice = useCallback(async () => {
    setStat(await iceWater.getBondStat());
  }, [iceWater]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch BAB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, iceWater]);

  return stat;
};

export default useBondStats;
