import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useIceWater from './useIceWater';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const iceWater = useIceWater();


  useEffect(() => {
    if (iceWater) {
      const { Treasury } = iceWater.contracts;
      iceWater.BAC.balanceOf(Treasury.address).then(setAmount);
    }
  }, [iceWater]);
  return amount;
};

export default useTreasuryAmount;
