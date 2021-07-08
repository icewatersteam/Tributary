import React from 'react'
import styled from 'styled-components'

import Footer from '../Footer'
import TopBar from '../TopBar'

type PageProps = {
  className?: 'default' | 'ice' | 'steam';
};

const Page: React.FC<PageProps> = ({ className = "default", children }) => {
  return (
    <StyledPage className={className}>
      <TopBar />
      <StyledMain>
        {children}
      </StyledMain>
      <Footer />
    </StyledPage>
  )
}

const StyledPage = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 70px;
  
  &.default {
    background: rgb(42,42,42);
    background: linear-gradient(180deg, rgba(42,42,42,1) 0%, rgba(0,0,0,1) 100%);
  }
  &.ice {
    background: linear-gradient(180deg,#34b291,#0a6997 50%,#432b7c);
  }
  &.steam {
    background: linear-gradient(180deg,#34b291,#0a6997 50%,#432b7c);
  }
`

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${props => props.theme.topBarSize * 2}px);
  padding-bottom: ${props => props.theme.spacing[5]}px;
  z-index: 20;
`

export default Page