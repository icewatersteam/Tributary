import { useCallback } from 'react';
import useIceWater from './useIceWater';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const iceWater = useIceWater();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(iceWater.harvestCashFromBoardroom(), 'Claim BAC from Boardroom');
  }, [iceWater]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
