import React, { useCallback, useEffect, useMemo, useState, FormEventHandler, ChangeEvent } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import TokenSymbol from '../../components/TokenSymbol';
import AccountButton from '../../components/TopBar/components/AccountButton'

import { Switch, Route, NavLink, useLocation, Link } from "react-router-dom";
import numeral from 'numeral';
import useiceWater from '../../hooks/useIceWater';
import { BidData, AskData } from '../../ice-water/types';
import { useWallet } from 'use-wallet';
import { useForm } from 'react-hook-form'

import TxModal from '../../components/TopBar/components/TxModal';
import useTransactionsModal from '../../hooks/useTransactionsModal';

import { useTransactionAdder, useAllTransactions } from '../../state/transactions/hooks';


interface onProps {
  amount: number;
}

interface iceBidAskData {  
  bid?: BidData,
  ask?: AskData,
  icePrice?: number
}

const Tributary: React.FC = ({  }) => {

    const [goal, setGoal] = useState('1 Billion');
    const [contribution, setContribution] = useState(0);
    const [tributeTokens, setTributeTokens] = useState(999);

  const iceWater = useiceWater();
  const addTransaction = useTransactionAdder();
  const allTransactions = useAllTransactions();

  const { account, status } = useWallet();
  const { pathname } = useLocation();

  // const { path } = this.props.match;
  const path = "/tributary"
  const title = "Tributary"
  const symbol = "TRIB"   

  const [{ bid, ask, icePrice }, setIceBidAsk] = useState<iceBidAskData>({});
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

  const [onPresentTransactionModal, onDismissTransactionModal] = useTransactionsModal(
    <TxModal showRecent={false} onDismiss={() => onDismissTransactionModal()} />,
  );
  
  const handleContributeSubmit = () : FormEventHandler<HTMLFormElement> => {
    alert("Handle Submit. Amount: " + contribution);
    return
  }

  const handleExchangeSubmit = () : FormEventHandler<HTMLFormElement> => {
    alert ("Handle Submit. Amount: " + tributeTokens);
    return
  }

 const handleChange = (e : ChangeEvent<HTMLInputElement>) : FormEventHandler<HTMLFormElement> => {    
    setContribution(parseFloat(e.target.value));
    return
  }
  
  const Contribute = () => 
  <div>
    <Card>   
       <Styles>
        <form key="contributeform">
            <div className="inputGrp">
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
                        setContribution(
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
                        <option value="UST">UST</option>
                    </select>
                </div>
            </div>
            <div className="inputGrp">
                <label>Staked: <b>{contribution ? contribution : 0}</b> UST</label>
                <label>H2O Amount to recieve: <b>{contribution ? (contribution / 1.24).toFixed(4) : 0}</b></label>
            </div>    
            
            {account ? (        
                <Button
                type="submit"
                size="sm"
                text={"Submit Contribution"}
                variant="tertiary"
                onClick={handleContributeSubmit}
                />  
            ) : (
                <AccountButton />
            )}

        </form>
        </Styles>
    </Card>    
    
    {account ? (
      <Card>  
        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>Total UST staked</StyledInputLabel>
            { bid && bid.price != null ? (
              <div>Import from records: {numeral(contribution).format('0,0')}</div>
            ) : (
              <div>-</div>
            )}             
          </YourBidAskColumn>
          <YourBidAskColumn>
            <StyledInputLabel>Total H2O Earned</StyledInputLabel>
            { bid && bid.amount != null ? (
              <div> Import from records: {numeral(bid.amount).format('0,0')}</div>
            ) : (
              <div>-</div>
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
                <label>Exchange Tribute Tokens back to UST</label>
                <div className='inputWrap'>
                    <input 
                      autoFocus
                      key="exchange"
                      name="tributetokens" 
                      value={tributeTokens}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setTributeTokens(
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
                        <option value="TT">Tibute Tokens</option>
                    </select>
                </div>
            </div>
            <div className="inputGrp">
                <label><b>{tributeTokens ? tributeTokens : 0} H2O and Tribute Tokens will be burned</b></label>
                <label>UST Amount to recieve: <b>{tributeTokens ? (tributeTokens * 1.24).toFixed(4) : 0}</b></label>
            </div>    
            
            {account ? (        
                <Button
                type="submit"
                size="sm"
                text={"Submit Exchange"}
                variant="tertiary"
                onClick={handleExchangeSubmit}
                />  
            ) : (
                <AccountButton />
            )}

        </form>
      </Styles>
    </Card>        
    {account ? (
      <Card>  
        <h4>Your Current Position</h4> 
        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>Tribute Tokens</StyledInputLabel>
            { tributeTokens ? (
              <div>{numeral(tributeTokens).format('0,0')}</div>
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
    )} 
  </div>; 
  
  
  return (
    <Page className="ice" >     
      
      <ResponsiveWrap>    
        <PageHeader        
          subtitle="Invest in this project. Give to the river of H2O and get kickbacks as we achieve our goals."
          title="Tributary"
          //symbol="ICE"
        />
          <Spacer size="md" />   

          <MarketCard>
            <Header>
                Start Earning H2O
            </Header> 
            <br></br>             
            <StyledInputLabel>
                Just stake UST
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
                We airdrop rewards to investers as we meet our goals.
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

 select{
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