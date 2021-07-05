/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

import { startAurora } from './NorthernLights.js';

// reactstrap components
//import { Button, Container } from "reactstrap";

// import IcewaterCarousel from "views/index-sections/IcewaterCarousel.js";


// core components
const items = [
  {
    src: require("assets/img/soroush-karimi.jpg").default,
    altText: "Pure.",
    caption: "The value of H20 does not depend on fiat currency.",
  },
  {
    src: require("assets/img/federico-beccari.jpg").default,
    altText: "Stable.",
    caption: "A reliable algorithm keeps H20 stable.",
  },
  {
    src: require("assets/img/joshua-stannard.jpg").default,
    altText: "Money.",
    caption: "H20 provides all the functions of a currency.",
  },
];


function LandingPageHeader() {


  //useEffect(() => startAurora, []);

  const [carouselItem, setCarouselItemData] = useState({id: 0});

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true); 
    let pure = document.getElementById("pure");
    pure.classList.remove("active");

    let stable = document.getElementById("stable");
    stable.classList.remove("active");

    let money = document.getElementById("money");
    money.classList.remove("active");

    if ( activeIndex == 0 ) {
      pure.classList.add("active");
    }
    if ( activeIndex == 1 ) {
      stable.classList.add("active");
    }
    if ( activeIndex == 2 ) {
      money.classList.add("active");
    }   
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;    
    setActiveIndex(newIndex);
  };


  // function changeCarouselIndex(newKey) {
  //   setCarouselItemData({...carouselItem,['id']:newKey});
  // }

  let pageHeader = React.createRef(); 

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const onKeywordClick = (e) => {
    let index = 0
    switch(e.target.getAttribute('id')) {
      case 'pure':
        index = 0
        break;
      case 'stable':
        index = 1
        break;
        case 'money':
          index = 2
          break;
      default:
        index = 0
    }
    setActiveIndex(index);
  };

  return (
    <>
      <div
        // style={{
        //   backgroundImage:
        //     "url(" + require("assets/img/icewater-feature-01.jpg").default + ")",
        // }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          {/* <canvas style={northernLightsCanvas} id='nothernLightsCanvas'></canvas> */}

          <div id='motto' className="motto text-center">            
            <h1 style={h1Style}>H2O</h1>                        
            <h2 style={h2Style}><span style={psmStyle} onClick={onKeywordClick} className='active' id='pure'>Pure. </span><span style={psmStyle} id='stable' onClick={onKeywordClick}>Stable. </span><span style={psmStyle} id='money' onClick={onKeywordClick}>Money.</span></h2>            
            {/* <h3>Long-term bonds with long-term people.</h3> */}
            <br/>
            {/* <IcewaterCarousel setCarouselIndex={changeCarouselIndex}></IcewaterCarousel>   */}

            <div id="icewaterCarousel">
              <div style={CarouselStyle}>
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  {/* <div >
                    <CarouselIndicators
                      items={items}
                      activeIndex={activeIndex}
                      onClickHandler={goToIndex}
                    /> 
                  </div> */}
                  
                  {items.map((item) => {
                    return (
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={item.src}
                      >                        
                        <h3 style={CarouselH2Style}>{item.caption}</h3>                        
                      </CarouselItem>
                    );
                  })}                  
                </Carousel> 
              </div>
            </div>
            
          </div>
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;

const northernLightsCanvas = {
  zIndex: "100"
}

const psmStyle = {
  cursor: 'pointer',
  "&:hover": {
    fontWeight: "bold"
  },
};

const h1Style = {
  fontSize: "10em",
  fontWeight: "600",
  textShadow: "2px 2px rgba(0, 0, 0, 0.4)"
};

const h2Style = {  
  fontWeight: "400",
  textShadow: "2px 2px rgba(0, 0, 0, 0.4)"
};

const CarouselStyle = {
  //height: '400px'
  color: '#ffffff'
};

const CarouselIndicatorsStyle = {
  display: 'block'
}

const CarouselH2Style = {
  color: '#ffffff'
};
