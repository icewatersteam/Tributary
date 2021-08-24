import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { AccountContext } from '../../../contexts/Account/AccountContext';
import { RoleContext } from '../../../contexts/Role/RoleContext';
import { useList } from 'react-firebase-hooks/database';
import firebase from 'firebase';
declare let window: any;

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {

  const [users, loading, error] = useList(firebase.database().ref('/users'));
  const { account, setAccount } = useContext(AccountContext);
  const { useBeneficiary, setUseBeneficiary } = useContext(RoleContext);

  async function connect() {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
          const web3 = window.web3;
          var accounts = await web3.eth.getAccounts();
		  setAccount(accounts[0]);

          let userExists = false
          if (!loading && users) {
              users.map((aUser, index) => {
                  if (accounts[0] === aUser.key) {
                      userExists = true
                  }
              })
          }

          if (!userExists && account) {
              firebase.database().ref('users').child(accounts[0]).set({
                  amountDeposited: "0",
                  isBeneficiary: "true",
                  lifetimeDeposited: "0"
              })
          }
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
            useBeneficiary ? (
                <Button
                  onClick={() => setUseBeneficiary(false)}
                  size="sm"
                  text="Switch to Patron dashboard"
                  variant="secondary"
                />
            ):(
                <Button
                  onClick={() => setUseBeneficiary(true)}
                  size="sm"
                  text="Switch to Beneficiary dashboard"
                  variant="secondary"
                />
            )
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
