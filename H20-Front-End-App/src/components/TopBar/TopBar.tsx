import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import TxButton from './components/TxButton'

const TopBar: React.FC = () => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <div style={{ flex: 1 }}>
            <Logo />
          </div>
          <Nav />
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <TxButton />
            <AccountButton />
          </div>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
  color: ${(props) => props.theme.color.white};
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);  
  -webkit-backdrop-filter: blur(5px);
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  z-index: 2;
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${props => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
  flex-wrap: wrap;
`

export default TopBar