import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from "react-router-dom"

const Nav: React.FC = () => {

  const { pathname } = useLocation();

  return (
    <StyledNav>
      {/* <StyledLink exact activeClassName="active" to="/">Home</StyledLink>
      
      <StyledLink 
        exact
        activeClassName="active"
        to="/ice"
        isActive={() => [`/ice`, `/ice/bid`, `/ice/ask`].includes(pathname)}
      >
        Ice
      </StyledLink>

      <StyledLink 
        exact
        activeClassName="active"
        to="/steam"
        isActive={() => [`/steam`, `/steam/bid`, `/steam/ask`].includes(pathname)}
      >
        Steam
      </StyledLink> */}
      <StyledLink 
        exact
        activeClassName="active"
        to="/tributary"
        isActive={() => [`/tributary`, `/tributary/contribute`, `/tributary/exchange`].includes(pathname)}
      >
        Tributary
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/about">About</StyledLink>
      <StyledLink exact activeClassName="active" to="/projects">Projects</StyledLink>      

      {/* <StyledLink exact activeClassName="active" to="/docs">Docs</StyledLink>        */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.purple[400]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.purple[200]};
  }
  &.active {
    color: ${props => props.theme.color.purple[200]};
  }
`

export default Nav