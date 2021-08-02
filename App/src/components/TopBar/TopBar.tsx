import React, { useContext } from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom"
import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import TxButton from './components/TxButton'

import { AuthContext } from "../../contexts/Auth/AuthContext";

const TopBar: React.FC = () => {

  const user = useContext(AuthContext);

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
          <AccountButton />  
          </div>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
  color: ${(props) => props.theme.color.white};
  background-color: rgba(20, 20, 20, 1);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);  
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

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.purple[400]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.purple[300]};
  }
  &.active {
    color: ${props => props.theme.color.purple[200]};
  }
  &.signout {
    padding-top: 8px;
    margin-right: 10px;
  }
`

export default TopBar
