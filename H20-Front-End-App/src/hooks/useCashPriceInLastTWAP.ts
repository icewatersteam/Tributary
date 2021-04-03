import { useCallback, useEffect, useState } from 'react';
import useIceWater from './useIceWater';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const iceWater = useIceWater();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await iceWater.getCashPriceInLastTWAP());
  }, [iceWater]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch BAC price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, iceWater]);

  return price;
};

export default useCashPriceInLastTWAP;
