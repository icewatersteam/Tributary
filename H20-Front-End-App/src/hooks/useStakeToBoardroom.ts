import { useCallback } from 'react';
import useIceWater from './useIceWater';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const iceWater = useIceWater();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        iceWater.stakeShareToBoardroom(amount),
        `Stake ${amount} BAS to the boardroom`,
      );
    },
    [iceWater],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
