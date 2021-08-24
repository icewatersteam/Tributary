import React from 'react';
import styled from 'styled-components';

import farmer from '../../assets/img/farmer.png';
import icewaterLogo from '../../assets/img/TributaryDelta.png';

const Logo: React.FC = () => {
  return (
    <StyledLogo>      
      <StyledLink href="/">
        <img src={icewaterLogo} height="32"/>
        <BrandName>Tributary</BrandName>
      </StyledLink>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.grey[900]};
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[2]}px;
`;

const BrandName = styled.span`
  color: #fff;
  margin-left: 10px;
`;



export default Logo;
