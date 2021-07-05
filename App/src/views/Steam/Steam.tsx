import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import PriceAmountForm from '../../components/PriceAmountForm';

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

interface steamBidAskData {  
  bid?: BidData,
  ask?: AskData,
  steamPrice?: number
}

const Steam: React.FC = ({  }) => {
  const iceWater = useiceWater();
  const addTransaction = useTransactionAdder();
  const allTransactions = useAllTransactions();
  const { account, status } = useWallet();
  const { pathname } = useLocation();  
  const path = "/steam"
  const title = "Steam"
  const symbol = "STEAM"   

  const [{ bid, ask, steamPrice }, setSteamBidAsk] = useState<steamBidAskData>({});
  const fetchSteamBidAsk = useCallback(async () => {
    const [bid, ask, steamPrice] = await Promise.all([
      iceWater.getSteamBid(),
      iceWater.getSteamAsk(),
      iceWater.getSteamPrice()
    ]);        
    setSteamBidAsk({ bid, ask, steamPrice });    
  }, [iceWater, setSteamBidAsk]);

  useEffect(() => {
    if (iceWater) {
      fetchSteamBidAsk().catch((err) => console.error(err.stack));
    }
  }, [iceWater, status]);   

  const [onPresentTransactionModal, onDismissTransactionModal] = useTransactionsModal(
    <TxModal showRecent={false} onDismiss={() => onDismissTransactionModal()} />,
  );
  
  // Submit Steam Bid
  const handleBidSubmit = useCallback(
    async (price: number, amount: number) => {
      const tx = await iceWater.sendSteamBid(price, amount);      

      addTransaction(tx, {
        summary: `Steam Bid: Price ${price}, Amount ${amount}`,
      });      

      onPresentTransactionModal();

      tx.wait().then(function(receipt) {        
        fetchSteamBidAsk().catch((err) => console.error(err.stack));    
      });
    },
    [iceWater, addTransaction]
  );
  
  const onBidSubmit = (data:onBidProps) => {    
    handleBidSubmit(numeral(data.price).value(), numeral(data.amount).value())
    return 
  }

  // Sumbit Steam Ask
  const handleAskSubmit = useCallback(
    async (price: number, amount: number) => {
      const tx = await iceWater.sendSteamAsk(price, amount);           
      
      addTransaction(tx, {
        summary: `Steam Ask: Price ${price}, Amount ${amount}`,
      });      

      onPresentTransactionModal();

      tx.wait().then(function(receipt) {        
        fetchSteamBidAsk().catch((err) => console.error(err.stack));    
      });
    },
    [iceWater, addTransaction]
  );

  const onAskSubmit = (data:onAskProps) => {
    handleAskSubmit(numeral(data.price).value(), numeral(data.amount).value())    
    return 
  }

  
  const Bid = () => 
  <div>
    <Card>   
      <PriceAmountForm
        title="Steam Bid"
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
  
  const Ask = () =>  
  <div>
    <Card>   
      <PriceAmountForm
        title="Steam Ask"
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
    <Page className="steam">
      <ResponsiveWrap>    
        <PageHeader        
          subtitle="New H20 will be minted when demand increases."
          title="Steam"
          //symbol="STEAM"
        />   

          <Spacer size="md" />   

          <MarketCard>
            <StyledInputLabel>Last Filled Price</StyledInputLabel>              
            <MarketLastFilled>
              {steamPrice ? `${numeral(steamPrice).format('0,0')}` : '--'}              
            </MarketLastFilled>
          </MarketCard>

          <Spacer size="md" />

          <TradeCardWrap>
            <TradeCard>
              <Tabs className="cardTabs">
                <NavLink                 
                  to={`${path}/bid`} 
                  className="cardTab"
                  exact
                  activeClassName="cardTabActive"
                  isActive={() => [`${path}`, `${path}/bid`].includes(pathname)}>
                    Bid
                </NavLink>
                
                <NavLink 
                  to={`${path}/ask`}
                  className="cardTab"
                  exact
                  activeClassName="cardTabActive">
                    Ask
                  </NavLink>
              </Tabs>

            
              <Content>
                <Switch>
                  <Route path={`${path}`} exact component={Bid} />
                  <Route path={`${path}/bid`} component={Bid} />
                  <Route path={`${path}/ask`} component={Ask} />
                </Switch>
              </Content>

            </TradeCard>  
          </TradeCardWrap>        

      </ResponsiveWrap> 
    </Page>
  );
};

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

const MarketLastFilled = styled.div`  
  font-size: 45px;
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



export default Steam;
