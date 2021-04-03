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
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol, 
  supply,
  apy,
  description,   
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
        onClick={onBuy}
        size="sm"
        text={"Buy " + title}
        /> 
      <Spacer size="sm" />
      <Button
        onClick={onSell}
        size="sm"
        text={"Sell " + title}
        />           
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 2px;
  padding: 10px;
  min-width: 200px;
  background-color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.grey[700]};
  border-radius: 5px;
  @media (max-width: 768px) {
    margin: 10px 0px 0px 0px;
  }
`;

const CardHeader = styled.h2`
  color: ${(props) => props.theme.color.grey[900]};
  text-align: center;  
`;

const TokenSymbolWrap = styled.div`  
  text-align: center;
`;

const StyledSpacer = styled.hr`  
  border-top: 1px solid ${(props) => props.theme.color.grey[400]};
  border-bottom: 1px solid ${(props) => props.theme.color.grey[100]};
  border-left: 0;
  border-right: 0;
  height: 0px;  
  margin: 30px 0px;
`

const CardSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default HomeCard;
