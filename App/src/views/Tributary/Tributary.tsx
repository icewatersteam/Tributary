import Web3 from 'web3';
import React, { useCallback, useEffect, useMemo, useState, useContext, FormEventHandler, ChangeEvent } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import TokenSymbol from '../../components/TokenSymbol';
import AccountButton from '../../components/TopBar/components/AccountButton';
import SignInButton from './components/SignInButton';

//Transaction dependencies

import { Switch, Route, NavLink, useLocation, Link } from "react-router-dom";
import numeral from 'numeral';
import { useForm } from 'react-hook-form';
import { AccountContext } from '../../contexts/Account/AccountContext';
import { ProjectContext } from '../../contexts/Project/ProjectContext';

import TxModal from '../../components/TopBar/components/TxModal';
import useTransactionsModal from '../../hooks/useTransactionsModal';

import { useTransactionAdder, useAllTransactions } from '../../state/transactions/hooks';

import firebase from 'firebase';
import { useList } from 'react-firebase-hooks/database';

interface onProps {
  amount: number;
}

const Tributary: React.FC = ({  }) => {

  const { account, setAccount } = useContext(AccountContext);
  const { project, setProject } = useContext(ProjectContext);

  const [projects, loading, error] = useList(firebase.database().ref('/projects'));

  const [contribution, setContribution] = useState(0);
  const [rewardTokens, setRewardTokens] = useState(0);


  const addTransaction = useTransactionAdder();
  const allTransactions = useAllTransactions();

  const { pathname } = useLocation();

  const path = "/tributary"
  const title = "Tributary"
  const symbol = "TRIB"

  const [onPresentTransactionModal, onDismissTransactionModal] = useTransactionsModal(
    <TxModal showRecent={false} onDismiss={() => onDismissTransactionModal()} />,
  );

  const handleContributeSubmit = () : FormEventHandler<HTMLFormElement> => {

    /*Update global currTotDeposited value*/
    let total = 0;
    firebase.database().ref('Global/currTotDeposited').get().then((snapshot) => {
        total = Number(snapshot.val())
    });
    total = total + Number(contribution);
    firebase.database().ref('Global/currTotDeposited').set(String(total));
    /**************************************/

    /*Update global hisTotDeposited value*/
    total = 0;
    firebase.database().ref('Global/currTotDeposited').get().then((snapshot) => {
        total = Number(snapshot.val())
    });
    total = total + Number(contribution);
    firebase.database().ref('Global/currTotDeposited').set(String(total));
    /*************************************/

    alert("Handle Submit. Amount: " + contribution);
    return
  }

  const handleWithdrawSubmit = () : FormEventHandler<HTMLFormElement> => {

    /*Update global currTotDeposited value*/
    let total = 0;
    firebase.database().ref('Global/currTotDeposited').get().then((snapshot) => {
        total = Number(snapshot.val())
    });
    total = total - Number((rewardTokens * 1.24).toFixed(4));
    firebase.database().ref('Global/currTotDeposited').set(String(total));
    /**************************************/

    alert ("Handle Submit. Amount: " + rewardTokens);
    return
  }

  const handleChange = (e : ChangeEvent<HTMLInputElement>) : FormEventHandler<HTMLFormElement> => {
    setContribution(parseFloat(e.target.value));
    return
  }

  // Set the amount to be contributed and reward tokens to recieve, should the user submit the current contribution
  function setContributionVals(thisContribution:number) {
      setContribution(thisContribution)
      setRewardTokens(thisContribution / 1.24)
  }

  // Get the total amount of yveCRV the user has staked in any tributary project
  // NOT FINISHED
  const getTotalStaked = () => {
      /*let total
      let refPath = 'users/' + String(user.uid) + '/amountDeposited'
      firebase.database().ref(refPath).get().then((snapshot) => {
          total = Number(snapshot.val())
      });
      return(total)*/
      let total = 0
      return(total)
  }

  // Get the total amount of rewards they have held currently
  const getTotalHeld = () => {
      //UNFINISHED: NEED TO REFER TO WALLET
      let total = 0
      return(total)
  }

  const Contribute = () =>
  <div>
    <Card>
       <Styles>
         <form key="contributeform">
            <div className="inputGrp">
                <label>Project</label>
                  <select name="project" id="project" style={{width: '100%'}} onChange={(e) => (setProject(e.target.value))}>
                      {!loading && projects && projects.map((aProject, index) => (
                          ( project && project === aProject.key) ? (
                              console.log('Here'),
                              <option value = {aProject.key} style={{backgroundColor: '#424242'}} selected>{aProject.val().name} (ID:{aProject.key})</option>
                          ):(
                              <option value = {aProject.key} style={{backgroundColor: '#424242'}}>{aProject.val().name} (ID:{aProject.key})</option>
                          )
                      ))}
                  </select>
                  <Spacer></Spacer>
                <label>Contribution Amount</label>
                <div className='inputWrap'>
                    <input
                      autoFocus
                      key="contribution"
                      name="contribution"
                      value={contribution}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setContributionVals(
                            parseFloat(e.target.value),
                        );
                    }}
                      placeholder="0.00"
                      type='number'
                    />
                    <select name="curency" id="currency">
                        <option value="yveCRV">yveCRV</option>
                    </select>
                </div>
            </div>

            {account ? (
                //firebase.database().ref('users/').child(user.uid).child('/walletAddress').set(String(account)),
                <Button
                type="submit"
                size="sm"
                text={"Submit Contribution"}
                variant="tertiary"
                onClick={handleContributeSubmit}
                />
            ):(
                <>
                    <InfoBlock>
                        Want to contribute? Connect your metamask wallet and get started!
                    </InfoBlock>
                    <AccountButton />
                </>
            )}

        </form>
        </Styles>
    </Card>

    {account ? (
      <Card>
        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>Total yveCRV staked</StyledInputLabel>
            { true ? (
              <div>Import from records: {numeral(getTotalStaked).format('0,0')}</div>
            ) : (
              null
            )}
          </YourBidAskColumn>
        </YourBidAsk>
      </Card>
    ) : (
      null
    )}
  </div>;

  const Withdraw = () =>
  <div>
    <Card>
      <Styles>
      <form key="withdrawform">
            <div className="inputGrp">
                <label>Project</label>
                <select name="project" id="project" style={{width: '100%'}} onChange={(e) => (setProject(e.target.value))}>
                    {!loading && projects && projects.map((aProject, index) => (
                        ( project && project === aProject.key) ? (
                            console.log('Here'),
                            <option value = {aProject.key} style={{backgroundColor: '#424242'}} selected>{aProject.val().name} (ID:{aProject.key})</option>
                        ):(
                            <option value = {aProject.key} style={{backgroundColor: '#424242'}}>{aProject.val().name} (ID:{aProject.key})</option>
                        )
                    ))}
                </select>
                <Spacer></Spacer>
                <label>Withdrawal Amount</label>
                <div className='inputWrap'>
                    <input
                      autoFocus
                      key="withdraw"
                      name="rewardTokens"
                      value={rewardTokens}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setRewardTokens(
                            parseFloat(e.target.value),
                        );
                    }}
                        placeholder="0.00"
                        type='number'
                    />
                    <select name="curency" id="currency">
                        <option value='tH2O'>tH2O</option>
                    </select>
                </div>
            </div>

            {
                account ? (
                    <Button
                    type="submit"
                    size="sm"
                    text={"Withdraw Rewards"}
                    variant="tertiary"
                    onClick={handleWithdrawSubmit}
                    />
                ):(
                    <>
                        <InfoBlock>
                            Want to contribute? Connect your metamask wallet and get started!
                        </InfoBlock>
                        <AccountButton />
                    </>
                )
            }

        </form>
      </Styles>
    </Card>

      {account ? (
        <Card>
          <YourBidAsk>
            <YourBidAskColumn>
              <StyledInputLabel>Total yveCRV staked</StyledInputLabel>
              { true ? (
                <div>Import from records: {numeral(getTotalStaked).format('0,0')}</div>
              ) : (
                null
              )}
            </YourBidAskColumn>
            {/*<YourBidAskColumn>
              <StyledInputLabel>Total tH2O Earned</StyledInputLabel>
              { true ? (
                <div> Import from records: {numeral(getTotalHeld).format('0,0')}</div>
              ) : (
                null
              )}
            </YourBidAskColumn>*/}
          </YourBidAsk>
        </Card>
      ) : (
        null
      )}
  </div>;

  return (
    <Page>

      <ResponsiveWrap>
              <PageHeader
                title='Dashboard'
                subtitle='Invest in your favorite projects. Give to the river of funds and get kickbacks as they achieve their goals.'
              />

              {account && <StyledLabel><label>Connected: {account}</label></StyledLabel>}


          <TradeCardWrap>
            <TradeCard>
                <Tabs className="cardTabs">
                <NavLink
                  to={`${path}/contribute`}
                  className="cardTab1"
                  exact
                  activeClassName="cardTabActive"
                  isActive={() => [`${path}`, `${path}/contribute`].includes(pathname)}>
                    Contribute
                </NavLink>

                <NavLink
                  to={`${path}/withdraw`}
                  className="cardTab2"
                  exact
                  activeClassName="cardTabActive">
                    Withdraw
                  </NavLink>
              </Tabs>


              <Content>
                <Switch>
                  <Route path={`${path}`} exact component={Contribute} />
                  <Route path={`${path}/contribute`} component={Contribute} />
                  <Route path={`${path}/withdraw`} component={Withdraw} />
                </Switch>
              </Content>

            </TradeCard>
          </TradeCardWrap>

      </ResponsiveWrap>
    </Page>
  );
};

const Header = styled.div`
font-size: 2rem;
color: ${(props) => props.theme.color.white};
`

const ProgressBar = styled.div`
  width: ${500000000/1000000000*100}%;
  height: 1rem;
  background-color: #FFFFFF;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const pageStyle = styled.div`
  width: 100%;
  max-width: 600px;
`;

const ResponsiveWrap = styled.div`
  width: 100%;
  max-width: 500px;
`;

const StyledLabel = styled.div`
    text-align: center;

    label {
        color: ${(props) => props.theme.color.white};
        text-align: center;
        font-size: 13px;
        font-weight: 700;
        margin: 0px 0px 0px 0px;
        padding: 0;
    }
`;

const TitleHeader = styled.div`
    color: ${(props) => props.theme.color.grey[800]};

    div.card {
      padding: ${(props) => props.theme.spacing[3]}px;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
      background-color: ${(props) => props.theme.color.white};
    }


    &.gradient {
      color: ${(props) => props.theme.color.white};
      div.card {
        box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
`;

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
`;

const Goal = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.color.white};
`;

const TradeCardWrap = styled.div`
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const TradeCard = styled.div`

`;

const Tabs = styled.div`
`;

const YourBidAsk = styled.div`
  display: flex;
  text-align: center;
`;

const YourBidAskColumn = styled.div`
  flex: 1;
`;


const Card = styled.div`
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
`;

const Content = styled.div`
`;

const InfoBlock = styled.div`
    text-align: center;
    padding: 10px;
    font-size: 13px;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;


const StyledInputLabel = styled.h4`
  margin: 0 0 10px 0;
`
const Styles = styled.div`
 div.inputGrp {
    margin-bottom: 25px;
 }

 div.inputWrap {
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: ${props => props.theme.borderRadius}px;
    display: flex;
    padding: 0 ${props => props.theme.spacing[3]}px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
 }

 select {
    height: 42px;
    font-size: 18px;
    color: ${props => props.theme.color.white};
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: ${props => props.theme.borderRadius}px;
    display: flex;
    padding: 0 ${props => props.theme.spacing[3]}px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
 }

 option {
     background: rgba(255, 255, 255, 0.1)
 }

 input {
    background: none;
    border: 0;
    color: ${props => props.theme.color.white};
    font-size: 18px;
    flex: 1;
    height: 56px;
    margin: 0;
    padding: 0;
    outline: none;
 }

 input::placeholder {
     color: rgba(255, 255, 255, 0.5);
 }


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}

 label {
   display: block;
   font-weight: bold;
   margin: 0px 0px 10px 3px;
 }

 .error {
   color: ${props => props.theme.color.red[100]};
   margin: 10px 0px 0px 3px;
 }
`;

export default Tributary;
