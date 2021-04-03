import React, { useMemo } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'ethers';
import numeral from 'numeral'

import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'

import { getDisplayBalance } from '../../../utils/formatBalance'

interface CardStatsProps {
  supply?: number,
  apy?: number
}
const CardStats: React.FC<CardStatsProps> = ({
  supply,
  apy,  
}) => {

  const formattedSupply = useMemo(() => {
    if (supply) {
      return numeral(supply).format('0,0')      
    } else return '--'
  }, [supply])

  // http://numeraljs.com/
  const formattedAPY = useMemo(() => {
    if (apy) {
      return numeral(apy).format('0.00%')
    } else return '--'
  }, [apy])

  return (
    <StyledStats>

      <StyledStat>
        <StyledValue>{formattedSupply}</StyledValue>
        <StyledLabel>Circulating Supply</StyledLabel>       
      </StyledStat>

      <StyledSpacer /> 

      <StyledStat>
        <StyledValue>{formattedAPY}</StyledValue>
        <StyledLabel>APY</StyledLabel>       
      </StyledStat>   

      <StyledSpacerEnd />

    </StyledStats>
  )
}

const StyledStats = styled.div`
  
`

const StyledStat = styled.div`
  &:after {
    clear: both;
  }
`
const StyledLabel = styled.div`    
  overflow: hidden;  
`

const StyledValue = styled.div`
  color: ${props => props.theme.color.grey[600]};  
  font-weight: 700;
  text-align: right;
  width: 150px;
  float: right;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[1]}px;
`

const StyledSpacerEnd = styled.div`
  height: ${props => props.theme.spacing[4]}px;
`

export default CardStats