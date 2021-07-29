import Web3 from 'web3';
import React, { useCallback, useEffect, useMemo, useState, useContext, FormEventHandler, ChangeEvent } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import TokenSymbol from '../../components/TokenSymbol';
import AccountButton from '../../components/TopBar/components/AccountButton'
import SignInButton from './components/SignInButton'

import { Switch, Route, NavLink, useLocation, Link } from "react-router-dom";
import numeral from 'numeral';
import useiceWater from '../../hooks/useIceWater';
import { BidData, AskData } from '../../ice-water/types';
import { useWallet } from 'use-wallet';
import { useForm } from 'react-hook-form';
import { AuthContext } from "../../contexts/Auth/AuthContext";

import TxModal from '../../components/TopBar/components/TxModal';
import useTransactionsModal from '../../hooks/useTransactionsModal';

import { useTransactionAdder, useAllTransactions } from '../../state/transactions/hooks';

import firebase from 'firebase';
import { useList } from 'react-firebase-hooks/database';

interface onProps {
  amount: number;
}
/*
interface iceBidAskData {
  bid?: BidData,
  ask?: AskData,
  icePrice?: number
}
*/

const Tributary: React.FC = ({  }) => {

  const user = useContext(AuthContext);
  const [projects, loading, error] = useList(firebase.database().ref('/projects'));

  const [goal, setGoal] = useState('1 Billion');
  const [contribution, setContribution] = useState(0);
  const [H2OTokens, setH2OTokens] = useState(0);

  const iceWater = useiceWater();
  const addTransaction = useTransactionAdder();
  const allTransactions = useAllTransactions();

  const { account, status } = useWallet();
  const wallet = useWallet();
  const { pathname } = useLocation();

  // const { path } = this.props.match;
  const path = "/tributary"
  const title = "Tributary"
  const symbol = "TRIB"

  /*const [{ bid, ask, icePrice }, setIceBidAsk] = useState<iceBidAskData>({});
  const fetchIceBidAsk = useCallback(async () => {
    const [bid, ask, icePrice] = await Promise.all([
      iceWater.getIceBid(),
      iceWater.getIceAsk(),
      iceWater.getIcePrice()
    ]);

    setIceBidAsk({ bid, ask, icePrice });
  }, [iceWater, setIceBidAsk]);

  useEffect(() => {
    if (iceWater) {
      fetchIceBidAsk().catch((err) => console.error(err.stack));
    }
  }, [iceWater, status]);
  */
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

    /*Update amountDeposited for user*/
    if (user) {
        total = 0;
        let refPath = 'users/' + String(user.uid) + '/amountDeposited'
        firebase.database().ref(refPath).get().then((snapshot) => {
            total = Number(snapshot.val())
        });
        total = total + Number(contribution);
        firebase.database().ref(refPath).set(String(total));

    /*********************************/

    /*Update lifetimeDeposited for user*/
        total = 0;
        refPath = 'users/' + String(user.uid) + '/lifetimeDeposited'
        firebase.database().ref(refPath).get().then((snapshot) => {
            total = Number(snapshot.val())
        });
        total = total + Number(contribution);
        firebase.database().ref(refPath).set(String(total));
    }
    /*********************************/

    alert("Handle Submit. Amount: " + contribution);
    return
  }

  const handleExchangeSubmit = () : FormEventHandler<HTMLFormElement> => {

    /*Update global currTotDeposited value*/
    let total = 0;
    firebase.database().ref('Global/currTotDeposited').get().then((snapshot) => {
        total = Number(snapshot.val())
    });
    total = total - Number((H2OTokens * 1.24).toFixed(4));
    firebase.database().ref('Global/currTotDeposited').set(String(total));
    /**************************************/

    /*Update amountDeposited for user*/
    if (user) {
        total = 0;
        let refPath = 'users/' + String(user.uid) + '/amountDeposited'
        firebase.database().ref(refPath).get().then((snapshot) => {
            total = Number(snapshot.val())
        });
        total = total - Number((H2OTokens * 1.24).toFixed(4));
        firebase.database().ref(refPath).set(String(total));
    }
    /*********************************/

    alert ("Handle Submit. Amount: " + H2OTokens);
    return
  }

  const handleChange = (e : ChangeEvent<HTMLInputElement>) : FormEventHandler<HTMLFormElement> => {
    setContribution(parseFloat(e.target.value));
    return
  }

  // Set the amount to be contributed and tH2O to recieve, should the user submit the current contribution
  function setContributionVals(thisContribution:number) {
      setContribution(thisContribution)
      setH2OTokens(thisContribution / 1.24)
  }

  // Get the total amount of yveCRV the user has staked in any tributary project
  const getTotalStaked = () => {
      let total
      let refPath = 'users/' + String(user.uid) + '/amountDeposited'
      firebase.database().ref(refPath).get().then((snapshot) => {
          total = Number(snapshot.val())
      });
      return(total)
  }

  // Get the total amount of tH2O they have held currently
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
                <label>Contribution Amount</label>
                  <select name="project" id="project" style={{width: '100%'}}>
                  {!loading && projects &&
                    projects.map((project, index) => (
                      <option value = {String(index)} style={{backgroundColor: '#424242'}}>{project.val().name}</option>
                    ))}
                  </select>
                  <Spacer></Spacer>
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
                      //{...register("amount", {
                      //    required: true,
                      //    pattern: /^-?[0-9]\d*\.?\d*$/
                      //})}
                    />
                    <select name="curency" id="currency">
                        <option value="yveCRV">yveCRV</option>
                    </select>
                </div>
            </div>
            <div className="inputGrp">
                <label>Staked: <b>{contribution ? contribution : 0}</b> yveCRV </label>
                <label>tH2O to receive: <b>{H2OTokens ? H2OTokens.toFixed(4) : 0}</b></label>
            </div>

            {account ? (
                firebase.database().ref('users/').child(user.uid).child('/walletAddress').set(String(account)),
                <Button
                type="submit"
                size="sm"
                text={"Submit Contribution"}
                variant="tertiary"
                onClick={handleContributeSubmit}
                />
            ):(
                <AccountButton />
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
          <YourBidAskColumn>
            <StyledInputLabel>Total tH2O Earned</StyledInputLabel>
            { true ? (
              <div> Import from records: {numeral(getTotalHeld).format('0,0')}</div>
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

  const Exchange = () =>
  <div>
    <Card>
      <Styles>
      <form key="exchangeform">
            <div className="inputGrp">
                <label>Exchange tH2O back to yveCRV</label>
                <div className='inputWrap'>
                    <input
                      autoFocus
                      key="exchange"
                      name="H2OTokens"
                      value={H2OTokens}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setH2OTokens(
                            parseFloat(e.target.value),
                        );
                    }}
                        placeholder="0.00"
                        type='number'
                        //{...register("amount", {
                        //    required: true,
                        //    pattern: /^-?[0-9]\d*\.?\d*$/
                        //})}
                    />
                    <select name="curency" id="currency">
                        <option value="tH2O">tH2O</option>
                    </select>
                </div>
            </div>
            <div className="inputGrp">
                <label><b>{H2OTokens ? H2OTokens : 0} tH2O tokens will be burned</b></label>
                <label>yveCRV Amount to receive: <b>{H2OTokens ? (H2OTokens * 1.24).toFixed(4) : 0}</b></label>
            </div>

            {
                account ? (
                    <Button
                    type="submit"
                    size="sm"
                    text={"Withdraw"}
                    variant="tertiary"
                    onClick={handleExchangeSubmit}
                    />
                ):(
                    <AccountButton />
                )
            }

        </form>
      </Styles>
    </Card>
    {/*account ? (
      <Card>
        <h4>Your Current Position</h4>
        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>tH2O</StyledInputLabel>
            { H2OTokens ? (
              <div>{numeral(H2OTokens).format('0,0')}</div>
            ) : (
              <div>-</div>
            )}
          </YourBidAskColumn>
          <YourBidAskColumn>
            <StyledInputLabel>H2O Tokens</StyledInputLabel>
            { "something" ? (
              <div>{"{import H2O}"}</div>
            ) : (
              <div>-</div>
            )}
          </YourBidAskColumn>
        </YourBidAsk>
      </Card>
    ) : (
      null
  )*/}
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
            <YourBidAskColumn>
              <StyledInputLabel>Total tH2O Earned</StyledInputLabel>
              { true ? (
                <div> Import from records: {numeral(getTotalHeld).format('0,0')}</div>
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


  return (
    <Page>

      <ResponsiveWrap>
          <PageHeader
            title='Tributary'
            subtitle='Invest in this project. Give to the river of H2O and get kickbacks as we achieve our goals.'
          />
          <Spacer size="md" />

          <MarketCard>
            <Header>
                Start Earning Rewards
            </Header>
            <br></br>
            <StyledInputLabel>
                We want to reward early adopters of our project.
                <br></br>
                Just stake yveCRV to contribute to the project and you will receive kickbacks as we reach our goals!
            </StyledInputLabel>

          </MarketCard>

          <Spacer size="md" />

          <TradeCardWrap>
            <TradeCard>
                <Tabs className="cardTabs">
                <NavLink
                  to={`${path}/contribute`}
                  className="cardTab"
                  exact
                  activeClassName="cardTabActive"
                  isActive={() => [`${path}`, `${path}/contribute`].includes(pathname)}>
                    Contribute
                </NavLink>

                <NavLink
                  to={`${path}/exchange`}
                  className="cardTab"
                  exact
                  activeClassName="cardTabActive">
                    Exchange
                  </NavLink>
              </Tabs>


              <Content>
                <Switch>
                  <Route path={`${path}`} exact component={Contribute} />
                  <Route path={`${path}/contribute`} component={Contribute} />
                  <Route path={`${path}/exchange`} component={Exchange} />
                </Switch>
              </Content>

            </TradeCard>
          </TradeCardWrap>

          <Spacer size="md" />

          <MarketCard>
            <StyledInputLabel>Tributary Goal</StyledInputLabel>
            <Goal>
            {goal}
            <ProgressBar/>
            </Goal>
            <StyledInputLabel>
                We airdrop rewards to investors as we meet our goals.
            </StyledInputLabel>
            <StyledInputLabel>
              Last airdrop: {"{import data}"}
            </StyledInputLabel>
          </MarketCard>

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

// const MarketCard = styled.div`
//   padding: ${(props) => props.theme.spacing[3]}px;
//   color: ${(props) => props.theme.color.grey[700]};
//   -webkit-border-bottom-right-radius: 5px;
//   -webkit-border-bottom-left-radius: 5px;
//   -moz-border-radius-bottomright: 5px;
//   -moz-border-radius-bottomleft: 5px;
//   border-bottom-right-radius: 5px;
//   border-bottom-left-radius: 5px;
//   background-color: ${(props) => props.theme.color.white};
// `;

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
`;

const YourBidAskColumn = styled.div`
  flex: 1;
`;


const Card = styled.div`
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
`;

// const Card = styled.div`
//   padding: ${(props) => props.theme.spacing[3]}px;
//   color: ${(props) => props.theme.color.grey[700]};
//   -webkit-border-bottom-right-radius: 5px;
//   -webkit-border-bottom-left-radius: 5px;
//   -moz-border-radius-bottomright: 5px;
//   -moz-border-radius-bottomleft: 5px;
//   border-bottom-right-radius: 5px;
//   border-bottom-left-radius: 5px;
//   background-color: ${(props) => props.theme.color.white};
// `;

const Content = styled.div`

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
     background: rgbs(255, 255, 255, 0.1)
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
