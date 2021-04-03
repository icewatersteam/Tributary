import { useEffect, useState } from 'react';
import useIceWater from './useIceWater';
import config from '../config';
import { TreasuryAllocationTime } from '../ice-water/types';

const useTreasuryAllocationTimes = () => {
  const [time, setTime] = useState<TreasuryAllocationTime>({
    prevAllocation: new Date(),
    nextAllocation: new Date(),
  });
  const iceWater = useIceWater();

  useEffect(() => {
    if (iceWater) {
      iceWater.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [iceWater]);
  return time;
};

export default useTreasuryAllocationTimes;
