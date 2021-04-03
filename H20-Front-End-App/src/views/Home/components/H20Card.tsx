import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useModal from '../../../hooks/useModal';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import { TokenStat } from '../../../ice-water/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';

interface H20CardProps {
  title: string;  
}

const H20Card: React.FC<H20CardProps> = ({
  title  
}) => {  

    const onBuyH20 = () => {
        alert("Buy H20")
        return 
      }

    const onProvideLiquidity = () => {
        alert("Provide Liquidity")
        return 
    }

  //const [onProvideLiquidity] = useModal(<AccountModal />)

  return (
    <Wrapper>      
      <TokenSymbolWrap>
        <TokenSymbol symbol="H20"/>
      </TokenSymbolWrap>
      <CardHeader>{title}</CardHeader> 
      <CardSections>    
        <CardSection>    
            <SectionValue>
                $0.18
            </SectionValue>  
            <SectionLabel>
                H20 Price
            </SectionLabel>
            <Button
                onClick={onBuyH20}
                size="sm"
                text="Buy H20"
                />
        </CardSection> 
        <CardSection>                                    
            <SectionValue>
                +467.6%
            </SectionValue>  
            <SectionLabel>
                Liquidity APY
            </SectionLabel>
            <Button
                onClick={onProvideLiquidity}
                size="sm"
                text="Provide Liquidity"
                />
        </CardSection>              
      </CardSections>            
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 2px;  
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

const CardSections = styled.div`
    display: flex;    
    justify-content: center;
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
        flex-flow: column nowrap;
        align-items: center;
    }
`;

const CardSection = styled.div`
   flex: 1;
   background-color: ${(props) => props.theme.color.white};
   padding: ${(props) => props.theme.spacing[3]}px;
`;

const SectionValue = styled.h3`
    text-align: center;
    font-size: 24px;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.color.blue[400]};
`;

const SectionLabel = styled.h4`
    text-align: center;
    margin: 0px 0px 25px 0px;
    padding: 0;
`;

const TokenSymbolWrap = styled.div`  
  text-align: center;
`;

export default H20Card;
