import React, { useCallback, useEffect, useMemo, useState, FormEventHandler, ChangeEvent } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import TokenSymbol from '../../components/TokenSymbol';
import AccountButton from '../../components/TopBar/components/AccountButton'

const About: React.FC = () => {
    return(
<Page className="ice" >     
      
      <ResponsiveWrap>    
        <PageHeader        
          subtitle="Invest in this project. Give to the river of H2O and get kickbacks as we achieve our goals."
          title="Tributary"
          //symbol="ICE"
        />
          <Spacer size="md" />   

        

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

export default About;