import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { NavLink } from "react-router-dom"

const SignInButton: React.FC = (props) => {

  return (
      <NavLink to="/signin">
        <StyledAccountButton>
              <Button
                size="sm"
                text="Sign In"
                variant="secondary"
              />
        </StyledAccountButton>
      </NavLink>
  )
}

const StyledAccountButton = styled.div``

export default SignInButton;
