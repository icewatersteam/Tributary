import { useCallback } from 'react';
import useIceWater from './useIceWater';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../ice-water';

const useHarvest = (bank: Bank) => {
  const iceWater = useIceWater();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      iceWater.harvest(bank.contract),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, iceWater]);

  return { onReward: handleReward };
};

export default useHarvest;
