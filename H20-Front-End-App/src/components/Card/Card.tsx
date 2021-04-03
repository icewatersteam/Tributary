import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => (
  <StyledCard>
    {children}
  </StyledCard>
)

const StyledCard = styled.div`
  background-color: ${props => props.theme.color.white};  
  border-radius: 12px;  
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card