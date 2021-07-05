import React from 'react'
import styled from 'styled-components'

import Footer from '../Footer'
import TopBar from '../TopBar'

type PageProps = {
  className?: 'default' | 'ocean' | 'ice' | 'steam';
};

const Page: React.FC<PageProps> = ({ className = "default", children }) => {
  return (
    <StyledPage className={className}>
      <TopBar />

      { className == 'ocean' && (
        <div className='ocean'>
          <div className='wave'></div>
          <div className='wave'></div>
        </div>
      )} 

      <StyledMain>
        {children}
      </StyledMain>
      <Footer />
    </StyledPage>
  )
}
  
// CSS Ocean
// https://codepen.io/tedmcdo/pen/PqxKXg
// linear-gradient(180deg,#34b291,#0a6997 50%,#432b7c)

const StyledPage = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 70px;
  
  &.default {
    background: ${props => props.theme.color.grey[200]};
  }
  &.ocean {
    background:radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 20%, #0a6997 75%);
    overflow: hidden;
  }
  &.ice {
    background: linear-gradient(180deg,#34b291,#0a6997 50%,#432b7c);
  }
  &.steam {
    background: linear-gradient(180deg,#34b291,#0a6997 50%,#432b7c);
  }

  .ocean { 
    height: 5%;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #015871;
  }
  
  .wave {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x; 
    position: absolute;
    top: -198px;
    width: 6400px;
    height: 198px;
    animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
    z-index: 1;
  }
  
  .wave:nth-of-type(2) {
    top: -175px;
    animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
    opacity: 1;
  }
  
  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1600px;
    }
  }
  
  @keyframes swell {
    0%, 100% {
      transform: translate3d(0,-25px,0);
    }
    50% {
      transform: translate3d(0,5px,0);
    }
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