import React from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import useModal from '../../../hooks/useModal';
import Button from '../../Button';
import AccountModal from './AccountModal';
import useiceWater from '../../../hooks/useIceWater';
import Web3 from 'web3';
import { ethers } from 'ethers';

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const iceWater = useiceWater();

  const [onPresentAccountModal] = useModal(<AccountModal />)

  const { account, status, connect, reset } = useWallet()

  return (
    <StyledAccountButton>
          {!account ? (
          <Button
            onClick={() => connect('injected')}
            size="sm"
            text="Connect Wallet"
            variant="secondary"
          />
        ) : (
            <Button
              onClick={() => reset()}
              size="sm"
              text="Disconnect Wallet"
              variant="secondary"
            />
          // <Button
          //   onClick={onPresentAccountModal}
          //   size="sm"
          //   text="My Wallet"
          // />
        )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
