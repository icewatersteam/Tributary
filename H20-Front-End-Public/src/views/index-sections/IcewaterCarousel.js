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
import React from "react";

// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

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
    caption: "H20 provides all the functions of a currency",
  },
];

// interface PriceAmountFormProps {
//   title?: string,
//   onSubmit: (data:object) => void,
// }

function IcewaterCarousel({}) {
  
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



  return (
    <>
      <div id="icewaterCarousel">
        <div style={CarouselStyle}>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <div >
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              /> 
            </div>
            
            {items.map((item) => {
              return (
                <CarouselItem
                  onExiting={onExiting}
                  onExited={onExited}
                  key={item.src}
                >
                  {/* <img src={item.src} alt={item.altText} /> */}                                              
                  <h3 style={h2Style}>{item.caption}</h3>
                  {/* <CarouselCaption
                    captionText={item.caption}
                    captionHeader="test"
                  /> */}
                </CarouselItem>
              );
            })}
            {/* <a
              className="left carousel-control carousel-control-prev"
              data-slide="prev"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                previous();
              }}
              role="button"
            >
              <span className="fa fa-angle-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control carousel-control-next"
              data-slide="next"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              role="button"
            >
              <span className="fa fa-angle-right" />
              <span className="sr-only">Next</span>
            </a> */}
          </Carousel> 
        </div>
      </div>{" "}
    </>
  );
}

export default IcewaterCarousel;

const CarouselStyle = {
  //height: '400px'
  color: '#ffffff'
};

const CarouselIndicatorsStyle = {
  display: 'block'
}

const h2Style = {
  color: '#ffffff'
};
