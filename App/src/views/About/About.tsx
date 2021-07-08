import React, { useCallback, useEffect, useMemo, useState, FormEventHandler, ChangeEvent } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import TokenSymbol from '../../components/TokenSymbol';
import AccountButton from '../../components/TopBar/components/AccountButton'
import deltaIcon from '../../assets/img/delta.png'

const Home2: React.FC = () => {
    return(
<Page>     
      
      <ResponsiveWrap>    
        
        <StyledSpacer/>
            <img
                alt="..."
                className="IconSvg"                        
                // style={{ height: 65, position: 'relative', top: 15 }}
                src={
                    require('../../assets/img/delta.png')
                    .default
                }
                />
        <StyledSpacer/>

        <Header><b>What is Tributary?</b></Header>
        <StyledSpacer/>
        <P>
            Tributary is a new platform for fundraising using blockchain innovation!
            Built on the back of a cool cryptocurrency called H2O, the smart contracts give people the chance to invest in the new cryptocurrency.
            <StyledSpacer/>
            A company can state a project to raise funds for and people invvest in the project by buying UST and staking it in the project. 
            In return for staking UST people recieve H2O and Tribute tokens, which maintain their value over time. 
            The company can then use the interest that accrues to fund the project while the people are recieving the occational kickback as the project reaches it's goals.
            <StyledSpacer/>
            Tributary is the best way to connect early investing and fundraising. 
            Investors can contribute to a project and recieve kickbacks for their support. 
            <StyledSpacer/>
            <b>This is a great way to fund a project without the usual pains of sourcing capital.</b>
            <StyledSpacer/>
            
        </P>

      </ResponsiveWrap> 
    </Page>
  );
};

const P = styled.p`
color: white;
float: left;
text-align: justify;
font-size: 1.2rem;
`

const Header = styled.div`
font-size: 3rem;
color: ${(props) => props.theme.color.white};
`

const pageStyle = styled.div`
  width: 100%;
  max-width: 600px;  
`;

const ResponsiveWrap = styled.div`
  width: 100%;
  max-width: 50vw;    
  text-align: center;
  
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

const Card = styled.div`  
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};  
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

export default Home2;