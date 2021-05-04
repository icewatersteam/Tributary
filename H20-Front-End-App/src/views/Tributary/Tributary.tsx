import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import PriceAmountForm from '../../components/PriceAmountForm';
import TokenSymbol from '../../components/TokenSymbol';

import { Switch, Route, NavLink, useLocation, Link } from "react-router-dom";
import numeral from 'numeral';
import useiceWater from '../../hooks/useIceWater';
import { BidData, AskData } from '../../ice-water/types';
import { useWallet } from 'use-wallet';

import TxModal from '../../components/TopBar/components/TxModal';
import useTransactionsModal from '../../hooks/useTransactionsModal';

import { useTransactionAdder, useAllTransactions } from '../../state/transactions/hooks';


interface onBidProps {
  price: number;
  amount: number;
}

interface onAskProps {
  price: number,
  amount: number,
}

interface iceBidAskData {  
  bid?: BidData,
  ask?: AskData,
  icePrice?: number
}

const Tributary: React.FC = ({  }) => {

    const [goal, setGoal] = useState('1 Billion')

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
  
  // Submit Ice Bid
  const handleBidSubmit = useCallback(
    async (price: number, amount: number) => {
      const tx = await iceWater.sendIceBid(price, amount);      
      //console.log('handleBidSubmit tx'); console.log(tx);
      
      addTransaction(tx, {
        summary: `Ice Bid: Price ${price}, Amount ${amount}`,
      });      

      onPresentTransactionModal();

      tx.wait().then(function(receipt) {
        //console.log("transaction complete"); console.log(receipt);
        fetchIceBidAsk().catch((err) => console.error(err.stack));    
      });
    },
    [iceWater, addTransaction]
  );
  
  const onBidSubmit = (data:onBidProps) => {    
    handleBidSubmit(numeral(data.price).value(), numeral(data.amount).value())
    return 
  }

  // Sumbit Ice Ask
  const handleAskSubmit = useCallback(
    async (price: number, amount: number) => {
      const tx = await iceWater.sendIceAsk(price, amount);           
      
      addTransaction(tx, {
        summary: `Ice Ask: Price ${price}, Amount ${amount}`,
      });      

      onPresentTransactionModal();

      tx.wait().then(function(receipt) {        
        fetchIceBidAsk().catch((err) => console.error(err.stack));    
      });
    },
    [iceWater, addTransaction]
  );

  const onAskSubmit = (data:onAskProps) => {
    handleAskSubmit(numeral(data.price).value(), numeral(data.amount).value())    
    return 
  }

  
  const Contribute = () => 
  <div>
    <Card>   
      <PriceAmountForm
        title="Contribute"
        onSubmit={onBidSubmit}
      ></PriceAmountForm>      
    </Card>    
    
    {account ? (
      <Card>  
        <h4>Your Current Bid</h4>
        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>Price</StyledInputLabel>
            { bid && bid.price != null ? (
              <div>{numeral(bid.price).format('0,0')}</div>
            ) : (
              <div>-</div>
            )}             
          </YourBidAskColumn>
          <YourBidAskColumn>
            <StyledInputLabel>Amount</StyledInputLabel>
            { bid && bid.amount != null ? (
              <div>{numeral(bid.amount).format('0,0')}</div>
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
      <PriceAmountForm
        title="Ice Ask"
        onSubmit={onAskSubmit}
      ></PriceAmountForm>  
    </Card>        
    {account ? (
      <Card>  
        <h4>Your Current Ask</h4> 
        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>Price</StyledInputLabel>
            { ask && ask.price != null ? (
              <div>{numeral(ask.price).format('0,0')}</div>
            ) : (
              <div>-</div>
            )} 
          </YourBidAskColumn>
          <YourBidAskColumn>
            <StyledInputLabel>Amount</StyledInputLabel>
            { ask && ask.amount != null ? (
              <div>{numeral(ask.amount).format('0,0')}</div>
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
            <StyledInputLabel>Tributary Goal</StyledInputLabel>              
            <Goal>
            {goal} 
            <ProgressBar/>
            </Goal>
          </MarketCard>

          <Spacer size="md" />

          <MarketCard>
            <Header>
                Earn H2O
            </Header>              
            <StyledInputLabel>
                Stake UST
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

const Icon = styled.div`
  float: right;
`
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


export default Tributary;