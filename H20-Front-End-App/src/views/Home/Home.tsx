import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import H20Card from './components/H20Card';
import { OverviewData } from './types';
import useIceWater from '../../hooks/useIceWater';
import config from '../../config';
import Notice from '../../components/Notice';

const Home: React.FC = () => {

  return (
    <Page>

      <ResponsiveWrap>
        <PageHeader     
          subtitle="Long-term bonds with long-term people."
          title="Welcome to Ice Water!"
        />
        <Spacer size="md" />      
        <CardWrapper>

          <H20Card
            title="H20 is in an Expansionary State"          
          >
          </H20Card>
          <Spacer size="md" /> 

          <HomeCards>
            {/* <HomeCard
              title="H20"
              symbol="H20"          
              description="The primary token in this protocol and should remain stable relative to itself"          
            /> 
            <Spacer size="lg" />
            */}
            <HomeCard
              title="Ice"
              symbol="ICE"
              supply={57755040}
              apy={11758.98}
              description="Similar to a bond that never expires unless sold. It distributes a constant amount of H20 every day."          
            />
            <Spacer size="md" />
            <HomeCard
              title="Steam"
              symbol="STEAM"          
              supply={491755}
              apy={188.71}
              description="Similar to a share in that new H20 will be minted when demand increases and distributed to Steam holders."          
            />
          </HomeCards>
        </CardWrapper>
      </ResponsiveWrap>
    </Page>
  );
};

const ResponsiveWrap = styled.div`
  width: 100%;
  max-width: 800px;  
`;


const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const CardWrapper = styled.div`
  
`;

const HomeCards = styled.div`
  display: flex;
  margin: 5px 0;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledNoticeContainer = styled.div`
  max-width: 768px;
  width: 90vw;
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

export default Home;
