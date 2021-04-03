import { useCallback } from 'react';
import useIceWater from './useIceWater';
import { Bank } from '../ice-water';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const iceWater = useIceWater();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(iceWater.exit(bank.contract), `Redeem ${bank.contract}`);
  }, [bank, iceWater]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
