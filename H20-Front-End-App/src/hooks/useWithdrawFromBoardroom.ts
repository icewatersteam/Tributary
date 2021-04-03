import { useCallback } from 'react';
import useIceWater from './useIceWater';
import { Bank } from '../ice-water';
import { useTransactionAdder } from '../state/transactions/hooks';
import { BigNumber } from 'ethers';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const iceWater = useIceWater();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        iceWater.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} BAS from the boardroom`,
      );
    },
    [iceWater],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
