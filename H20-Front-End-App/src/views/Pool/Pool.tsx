import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';

const Docs: React.FC = () => {
  return (
    <Page>
      <PageHeader        
        subtitle="Provide Liquidity on Uniswap and Earn Ice Water Shares"
        title="Pools"
      />
      <Spacer size="md" />      
    </Page>
  );
};

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

export default Docs;
