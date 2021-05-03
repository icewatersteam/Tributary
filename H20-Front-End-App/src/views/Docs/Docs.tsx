import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';

import SimpleModal from './components/SimpleModal';

import useModal from '../../hooks/useModal';

const Docs: React.FC = () => {

 
  const [onPresentSimpleModal] = useModal(
    <SimpleModal />
  )  

  return (
    <Page>
      <ResponsiveWrap>  
      <PageHeader        
        subtitle="The Documentation Station"
        title="Documentation"
        background="white"
      />
      <Spacer size="md" />    

      <Button
        onClick={onPresentSimpleModal}
        size="sm"
        text="Modal Test"
      />

      </ResponsiveWrap>  
    </Page>
  );
};

const ResponsiveWrap = styled.div`
  width: 100%;
  max-width: 800px;  
`;

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
