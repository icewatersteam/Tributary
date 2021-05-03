import { useCallback, useContext, useMemo } from 'react'
import { isTransactionRecent, useAllTransactions } from '../state/transactions/hooks';
import useModal from '../hooks/useModal';
import { Context } from '../contexts/Modals';
import TxModal from '../components/TopBar/components/TxModal';

const useTransactionsModal = (modal: React.ReactNode) => {
  const { onDismiss, onPresent } = useContext(Context)

  /*
  const allTransactions = useAllTransactions();

  const pendingTransactions = useMemo(
    () => Object.values(allTransactions).filter((tx) => !tx.receipt).length,
    [allTransactions],
  );
  */

  const handlePresent = useCallback(() => {    
    onPresent(modal)
  }, [
    modal,
    onPresent,
  ])

  return [handlePresent, onDismiss]  
}

export default useTransactionsModal