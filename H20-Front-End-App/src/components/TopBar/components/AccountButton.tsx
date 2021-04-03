import React from 'react';
import styled from 'styled-components';

import { useWallet } from 'use-wallet';

import useModal from '../../../hooks/useModal';

import Button from '../../Button';

import AccountModal from './AccountModal';

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  
  // possibly "account" & "connect" are attr/fns from useWallet()
  const { account, connect } = useWallet()

  // Console help
  // const wallet = useWallet()
  // console.log(wallet)
  // console.log(wallet.getBlockNumber())

  return (
    <StyledAccountButton>
      {!account ? (
        <Button
          onClick={() => connect('injected')}
          size="sm"
          text="Connect Wallet"
        />
      ) : (
        <Button
          onClick={onPresentAccountModal}
          size="sm"
          text="My Wallet"
        />
      )}

      
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton