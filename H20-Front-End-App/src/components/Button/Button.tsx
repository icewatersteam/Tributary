import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  type?: 'button' | 'submit' | 'reset',
  variant?: 'default' | 'secondary' | 'tertiary'
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  type='button',
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.teal[200]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let boxShadow: string = ""
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{text}</StyledExternalLink>
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={boxShadow}      
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
      type={type}
      className={variant}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  boxShadow: string,  
  disabled?: boolean,
  fontSize: number,
  padding: number,
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${props => props.theme.color.blue[200]};
  border: 0;
  border-radius: 20px;
  box-shadow: ${props => props.boxShadow};
  color: ${props => !props.disabled ? props.theme.color.white : `${props.color}55`};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.fontSize}px;
  font-weight: 700;
  height: ${props => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  width: 100%;  
  &:hover {
    background-color: ${props => props.theme.color.blue[100]};
    color: ${props => props.theme.color.white};
  }

  &.secondary {
    background: #D655A9;
    background: -webkit-linear-gradient(top left, #D655A9, #656CCC);
    background: -moz-linear-gradient(top left, #D655A9, #656CCC);
    background: linear-gradient(to bottom right, #D655A9, #656CCC);
  }
  &.secondary:hover {
    background: #E653B2;
    background: -webkit-linear-gradient(top left, #E653B2, #6871E6);
    background: -moz-linear-gradient(top left, #E653B2, #6871E6);
    background: linear-gradient(to bottom right, #E653B2, #6871E6);
  }

  &.tertiary {
    background-color: rgba(255, 255, 255, 0.1);  
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 0;
    border-right: 0;
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px);
  }
  &.tertiary:hover {    
    background-color: rgba(255, 255, 255, 0.2);
    color: ${props => props.theme.color.white};    
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button