import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button';
import { isTransactionRecent, useAllTransactions } from '../../../state/transactions/hooks';
import useModal from '../../../hooks/useModal';
import TxModal from './TxModal';

interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet();
  const allTransactions = useAllTransactions();

  const pendingTransactions = useMemo(
    () => Object.values(allTransactions).filter((tx) => !tx.receipt).length,
    [allTransactions],
  );

  const [onPresentTransactionModal, onDismissTransactionModal] = useModal(
    <TxModal onDismiss={() => onDismissTransactionModal()} />,
  );
  return (
    <>
      {!!account && (
        <StyledTxButton>
          <Button
            size="sm"
            text={
              pendingTransactions > 0 ? `${pendingTransactions} Pending` : `Transactions`
            }
            variant={pendingTransactions > 0 ? 'secondary' : 'default'}
            onClick={() => onPresentTransactionModal()}
          />
        </StyledTxButton>
      )}
    </>
  );
};

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;

  button {
    background: #D655A9;
    background: -webkit-linear-gradient(top left, #D655A9, #656CCC);
    background: -moz-linear-gradient(top left, #D655A9, #656CCC);
    background: linear-gradient(to bottom right, #D655A9, #656CCC);
  }

  button:hover {
    background: #E653B2;
    background: -webkit-linear-gradient(top left, #E653B2, #6871E6);
    background: -moz-linear-gradient(top left, #E653B2, #6871E6);
    background: linear-gradient(to bottom right, #E653B2, #6871E6);
  }
`;

export default TxButton;
