import Web3 from 'web3';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { RoleContext } from '../../../contexts/Role/RoleContext';
import { AccountContext } from '../../../contexts/Account/AccountContext';
import firebase from 'firebase';
import { useList } from 'react-firebase-hooks/database';
import contract from '../../../utils/contract';
import Spacer from '../../../components/Spacer';
declare let window: any;

interface BeneficiariesListProps {}

const BeneficiariesList: React.FC<BeneficiariesListProps> = () => {
    const { useBeneficiary, setUseBeneficiary } = useContext(RoleContext);
    const { account, setAccount } = useContext(AccountContext);

    const [projects, loading, error] = useList(firebase.database().ref('/projects'));
    var addresses: string[];
    var beneficiaries: string[][];

    async function setAddressList() {
        if (account) {
            addresses = await contract.methods.getUserBeneficiaries(account).call();
        }
    }

    setAddressList();

    if (addresses && !loading && projects) {
        addresses.map((anAddress, aIndex) => {
            projects.map((aProject, pIndex) => {
                if (aProject.val().wallet === anAddress) {
                    beneficiaries.push([aProject.val().name, anAddress])
                }
            })
        })
    }

    return (
        <>
            <Spacer></Spacer>
            <MarketCard>
                <div>Beneficiaries</div>
                <hr></hr>
                {beneficiaries ? (
                    <table>
                        <thead>
                            <td><div>Name</div></td>
                            <td><div>Wallet Address</div></td>
                            <td><div>Date of last donation</div></td>
                            <td><div>Total Donated</div></td>
                            <td><div>Project Type</div></td>
                        </thead>
                        <tbody>
                            {beneficiaries.map((aBeneficiary, index) => (
                                <tr>
                                    <td><div>aBeneficiary[0]</div></td>
                                    <td><div>aBeneficiary[1]</div></td>
                                    <td><div>7/30/2021</div></td>
                                    <td><div>1000yveCRV</div></td>
                                    <td><div>Reward-based</div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ):(
                    <div className="noBenefs">You have not contributed to any beneficiaries yet.</div>
                )}
            </MarketCard>
        </>
    );
}

const MarketCard = styled.div`
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  .infoCard {
      align-items: center;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: ${props => props.theme.borderRadius}px;
      padding: 0 ${props => props.theme.spacing[3]}px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
  }

  .infoCard div.value {
      padding-top: 20px;
      padding-bottom: 20px;
      text-align: center;
      align-items: center;
  }

  .noBenefs {
      text-align: center;
  }
`;

export default BeneficiariesList;
