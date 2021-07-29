import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import TokenSymbol from '../../components/TokenSymbol';
import Spacer from '../../components/Spacer';
import useIceWater from '../../hooks/useIceWater';
import { BalanceData } from '../../ice-water/types';
import { useWallet } from 'use-wallet';
import numeral from 'numeral'

interface PageHeaderProps {
  subtitle?: string,
  title?: string,
  symbol?: string,
  background?: 'white' | 'gradient',
}

interface BalancesData {
  water?: BalanceData,
  ice?: BalanceData,
  steam?: BalanceData,
}

const PageHeader: React.FC<PageHeaderProps> = ({ subtitle, title, symbol, background = "gradient" }) => {
  return (
    <PageHeaderContent className={background}>

      <StyledPageHeader>
        { symbol ? (
          <div>
            <TokenSymbolWrap>
              <TokenSymbol symbol={symbol}/>
            </TokenSymbolWrap>
            <Spacer size="sm" />
          </div>
        ) : ( null ) }

        {title && symbol ? (
          <div>
            <StyledTitle>{title}</StyledTitle>
            <Spacer size="sm" />
          </div>
        ) : ( null )}

        {title && !symbol ? (
          <div>
            <Spacer size="lg" />
            <StyledTitle>{title}</StyledTitle>
            <Spacer size="sm" />
          </div>
        ) : ( null )}
        {subtitle ? (
          <div>
            <StyledSubtitle>{subtitle}</StyledSubtitle>
            <Spacer size="lg" />
          </div>
        ) : ( null )}

      </StyledPageHeader>

    </PageHeaderContent>
  )
}

const PageHeaderContent = styled.div `
  color: ${(props) => props.theme.color.grey[800]};

  div.card {
    padding: ${(props) => props.theme.spacing[3]}px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    background-color: ${(props) => props.theme.color.white};
  }


  &.gradient {
    color: ${(props) => props.theme.color.white};
    div.card {
      box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;



// const Card = styled.div`
//   padding: ${(props) => props.theme.spacing[3]}px;

//   -webkit-border-radius: 15px;
//   -moz-border-radius: 15px;
//   border-radius: 15px;
//   background-color: rgba(255, 255, 255, 0.1);
//   box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
//   border-top: 1px solid rgba(255, 255, 255, 0.2);
//   border-left: 1px solid rgba(255, 255, 255, 0.2);
//   backdrop-filter: blur(5px);
//   -webkit-backdrop-filter: blur(5px);
// `;

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


const TokenSymbolWrap = styled.div`
  margin-top: 25px;
  text-align: center;
`;

const AccountBalances = styled.div`
  display: flex;
`;

const AccountBalance = styled.div`
  flex: 1
`;


const AccountBalancesCardLabel = styled.div`
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const AccountBalanceLabel = styled.span`
  font-weight: bold;
`;

const AccountBalanceValue = styled.span`
  margin-left: 5px;
`;


const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`

// const StyledPageHeader = styled.div`
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   padding-bottom: ${props => props.theme.spacing[6]}px;
//   padding-top: ${props => props.theme.spacing[6]}px;
//   width: 100%;
//   margin: 0 auto;
// `

// const StyledIcon = styled.div`
//   font-size: 96px;
//   height: 96px;
//   line-height: 96px;
//   text-align: center;
//   width: 96px;
// `

const StyledTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0px 0px 0px 0px;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
