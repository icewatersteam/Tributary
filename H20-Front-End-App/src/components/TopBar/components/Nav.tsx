import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from "react-router-dom"

const Nav: React.FC = () => {

  const { pathname } = useLocation();

  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Home</StyledLink>
      
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
      </StyledLink>

      <StyledLink exact activeClassName="active" to="/docs">Docs</StyledLink> 

      {/* <StyledLink exact activeClassName="active" to="/pool">Pool</StyledLink>
      <StyledLink exact activeClassName="active" to="/govern">Govern</StyledLink>
      */}
      {/* <StyledLink exact activeClassName="active" to="/bonds">Blog</StyledLink>
      <StyledLink exact activeClassName="active" to="/boardroom">Govern</StyledLink> */}
      {/* <StyledLink2 href="https://snapshot.page/#/basiscash.eth" target="_blank" >Vote</StyledLink2> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.grey[600]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[700]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  }
`
const StyledLink2 = styled.a`
  color: ${props => props.theme.color.grey[600]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[700]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  }
`

export default Nav