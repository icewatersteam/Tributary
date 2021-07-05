import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../ice-water/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
import Button from '../../../components/Button';
import Spacer from '../../../components/Spacer';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';
import CardStats from './CardStats';


interface HomeCardProps {
  title: string;
  symbol: string;  
  supply: number;
  apy: number;
  description?: string;  
  to: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol, 
  supply,
  apy,
  description,   
  to,
}) => {  

  const onBuy = () => {
    alert("Buy " + title)
    return 
  }

  const onSell = () => {
      alert("Sell " + title)
      return 
  }

  return (
    <Wrapper>
      <TokenSymbolWrap>
        <TokenSymbol symbol={symbol}/>
      </TokenSymbolWrap>  
      <CardHeader>{title}</CardHeader>    

      <CardSection>                                    
        {description}        
      </CardSection>  

      <StyledSpacer /> 
      
      <CardStats 
        supply={supply}
        apy={apy}
      ></CardStats>

      <Spacer size="sm" />
      <Button
        // onClick={onBuy}
        size="sm"
        text={"Buy " + title}
        variant="tertiary"
        to={to + `/bid`}
        /> 
      <Spacer size="sm" />
      <Button
        // onClick={onSell}
        size="sm"
        text={"Sell " + title}
        variant="tertiary"
        to={to + `/ask`}
        />           
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 2px;
  padding: 10px;
  min-width: 200px;  
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
  @media (max-width: 768px) {
    margin: 10px 0px 0px 0px;
  }
`;

const CardHeader = styled.h2`
color: ${(props) => props.theme.color.white};
  text-align: center;  
`;

const TokenSymbolWrap = styled.div`  
  text-align: center;
`;

const StyledSpacer = styled.hr`    
  border:0;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);  
  margin: 30px 0px;
`

const CardSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default HomeCard;
