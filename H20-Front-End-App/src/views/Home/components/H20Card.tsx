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
                {/* $0.18 */}
                --
            </SectionValue>  
            <SectionLabel>
                H20 Price
            </SectionLabel>
            <Button
                onClick={onBuyH20}
                size="sm"
                text="Buy H20"
                variant='tertiary'
                />
        </CardSection> 
        <CardSection>                                    
            <SectionValue>
                {/* +467.6% */}
                --
            </SectionValue>  
            <SectionLabel>
                Liquidity APY
            </SectionLabel>
            <Button
                onClick={onProvideLiquidity}
                size="sm"
                text="Provide Liquidity"
                variant='tertiary'
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
  padding: ${(props) => props.theme.spacing[3]}px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px); 
  @media (max-width: 768px) {
    margin: 10px 0px 0px 0px;
  }
`;

const CardHeader = styled.h2`
  color: ${(props) => props.theme.color.white};
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
   padding: ${(props) => props.theme.spacing[3]}px;
`;

const SectionValue = styled.h3`
    text-align: center;
    font-size: 24px;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.color.white};
`;

const SectionLabel = styled.h4`
    text-align: center;
    margin: 0px 0px 25px 0px;
    padding: 0;
    color: ${(props) => props.theme.color.white};
`;

const TokenSymbolWrap = styled.div`  
  text-align: center;
`;

export default H20Card;
