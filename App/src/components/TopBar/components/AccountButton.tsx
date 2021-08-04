import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { AccountContext } from '../../../contexts/Account/AccountContext';
declare let window: any;

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {

  const { account, setAccount } = useContext(AccountContext);

  async function connect() {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
          const web3 = window.web3;
          var accounts = await web3.eth.getAccounts();
		  setAccount(accounts[0]);
      }
  }

  return (
    <StyledAccountButton>
          {!account ? (
          <Button
            onClick={() => connect()}
            size="sm"
            text="Connect Wallet"
            variant="secondary"
          />
        ) : (
            null
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
