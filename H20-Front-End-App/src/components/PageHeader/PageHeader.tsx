import React from 'react'
import styled from 'styled-components'
import TokenSymbol from '../../components/TokenSymbol';
import Spacer from '../../components/Spacer';

interface PageHeaderProps {  
  subtitle?: string,
  title?: string,
  symbol?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ subtitle, title, symbol }) => {  
  return (
    <PageHeaderContent>        

      <StyledPageHeader>   
        { symbol ? (
          <div>
            <TokenSymbolWrap>
              <TokenSymbol symbol={symbol}/>
            </TokenSymbolWrap> 
            <Spacer size="sm" />
          </div>          
        ) : ( null ) }

        {title ? (
          <div>
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

      <Card>
        <AccountBalancesCardLabel>
          Your Balances
        </AccountBalancesCardLabel>

        <AccountBalances>
          
          <AccountBalance>
            <AccountBalanceLabel>
              H20:
            </AccountBalanceLabel>
            <AccountBalanceValue>
              0.000
            </AccountBalanceValue>
          </AccountBalance>

          <AccountBalance>
            <AccountBalanceLabel>
              Ice:
            </AccountBalanceLabel>
            <AccountBalanceValue>
              0.00
            </AccountBalanceValue>
          </AccountBalance>

          <AccountBalance>
            <AccountBalanceLabel>
              Steam:
            </AccountBalanceLabel>
            <AccountBalanceValue>
              0.00
            </AccountBalanceValue>
          </AccountBalance>
        </AccountBalances>
      </Card>
    </PageHeaderContent>
  )
}

const PageHeaderContent = styled.div `

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


const TokenSymbolWrap = styled.div`  
  text-align: center;
  margin-bottom: 15px;
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
  color: ${props => props.theme.color.grey[900]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.color.grey[700]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader