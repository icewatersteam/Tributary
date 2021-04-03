import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import TokenSymbol from '../../components/TokenSymbol';
import { Switch, Route, NavLink, useLocation, Link } from "react-router-dom";
import numeral from 'numeral';

const Steam: React.FC = () => {

  // const { path } = this.props.match;
  const path = "/steam"
  const title = "Steam"
  const symbol = "STEAM"

  const { pathname } = useLocation();

  const [buyValue, setBuyValue] = useState();

  const onBid = () => {
    alert("Bid " + title)
    return 
  }

  const onAsk = () => {
      alert("Ask " + title)
      return 
  }

  // const buyInputOnChange = (e:any) => {       
  //   //console.log(e.target.value.replace(/\D/g, ""))
  //   console.log(numeral(e.target.value).format('0.00'))
  //   //setBuyValue(e.target.value.replace(/\D/g, ""))    
  // }

  const Bid = () => 
  <div>
    <Card>   
      <StyledInputLabel>Price</StyledInputLabel>
      <StyledInputWrapper>                   
        <StyledInput placeholder="0.00" type="number" pattern="^-?[0-9]\d*\.?\d*$"/>        
      </StyledInputWrapper>

      <Spacer size="md" />
      
      <StyledInputLabel>Amount</StyledInputLabel>   
      <StyledInputWrapper>             
        <StyledInput placeholder="0.00" type="number" pattern="^-?[0-9]\d*\.?\d*$"/>        
      </StyledInputWrapper>

      <Spacer size="lg" />

      <Button
        onClick={onBid}
        size="sm"
        text={"Submit " + title + " Bid"}
        />  
    </Card>
    
    <Spacer size="md" />

    <Card>  
        <h4>Your Current Bid</h4> 

        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>Price</StyledInputLabel>
            <div>0.00</div>
          </YourBidAskColumn>

          <YourBidAskColumn>
            <StyledInputLabel>Amount</StyledInputLabel>
            <div>0.00</div>
          </YourBidAskColumn>

        </YourBidAsk>
      </Card>
  </div>;
  
  const Ask = () =>  
    <div>
      <Card>   
        <StyledInputLabel>Price</StyledInputLabel>
        <StyledInputWrapper>                   
          <StyledInput placeholder="0.00" type="number" pattern="^-?[0-9]\d*\.?\d*$"/>        
        </StyledInputWrapper>

        <Spacer size="md" />
        
        <StyledInputLabel>Amount</StyledInputLabel>   
        <StyledInputWrapper>             
          <StyledInput placeholder="0.00" type="number" pattern="^-?[0-9]\d*\.?\d*$"/>        
        </StyledInputWrapper>

        <Spacer size="lg" />

        <Button
          onClick={onAsk}
          size="sm"
          text={"Submit " + title + " Ask"}
          />  
      </Card>
      
      <Spacer size="md" />

      <Card>  
        <h4>Your Current Ask</h4> 

        <YourBidAsk>
          <YourBidAskColumn>
            <StyledInputLabel>Price</StyledInputLabel>
            <div>0.00</div>
          </YourBidAskColumn>

          <YourBidAskColumn>
            <StyledInputLabel>Amount</StyledInputLabel>
            <div>0.00</div>
          </YourBidAskColumn>

        </YourBidAsk>
      </Card>
    </div>; 
  
  
  return (
    <Page>      
      <ResponsiveWrap>    

        <PageHeader        
            subtitle="New H20 will be minted when demand increases"
            title="Steam"
            // symbol="ICE"
          />      

          <Spacer size="md" />

          <MarketCard>
            <StyledInputLabel>Last Filled Price</StyledInputLabel>              
            <MarketLastFilled>
              0.00
            </MarketLastFilled>
          </MarketCard>

          <Spacer size="md" />

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

      </ResponsiveWrap> 
    </Page>
  );
};



const ResponsiveWrap = styled.div`
  width: 100%;
  max-width: 600px;  
`;

const MarketCard = styled.div`  
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.grey[700]};
  -webkit-border-bottom-right-radius: 5px;
  -webkit-border-bottom-left-radius: 5px;
  -moz-border-radius-bottomright: 5px;
  -moz-border-radius-bottomleft: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => props.theme.color.white};  
`;
const MarketLastFilled = styled.div`  
  font-size: 45px;
  color: ${(props) => props.theme.color.blue[400]};
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
  color: ${(props) => props.theme.color.grey[700]};
  -webkit-border-bottom-right-radius: 5px;
  -webkit-border-bottom-left-radius: 5px;
  -moz-border-radius-bottomright: 5px;
  -moz-border-radius-bottomleft: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => props.theme.color.white};
`;

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

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color.grey[200]};
  border-radius: ${props => props.theme.borderRadius}px;
  display: flex;
  padding: 0 ${props => props.theme.spacing[3]}px;
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: ${props => props.theme.color.grey[600]};
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
`



export default Steam;
