import { useCallback } from 'react';
import useIceWater from './useIceWater';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const iceWater = useIceWater();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem BAS from Boardroom';
    handleTransactionReceipt(iceWater.exitFromBoardroom(), alertDesc);
  }, [iceWater]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
