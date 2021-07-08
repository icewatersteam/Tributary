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
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";


// core components
//import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
//import LandingPageHeader from "components/Headers/LandingPageHeader.js";
//import DemoFooter from "components/Footers/DemoFooter.js";
//import IcewaterCarousel from "./IcewaterCarousel.js";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <div className="main">
        <div className="section">
          <Container>

            <Row>
              <Col className="ml-auto mr-auto" md="8">
                H2O               
              </Col>
            </Row> 

            <Row className="text-center">
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title text-center maxWidthCenter">H2O maintains stability using three phases</h2>
                {/* <h5 className="description">
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn't scroll to get here. Add a button if you
                  want the user to see more.
                </h5>
                <br />
                <Button
                  className="btn-round"
                  color="info"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  See Details
                </Button> */}
              </Col>
            </Row>
            <br />
            <br />


            <Row style={elementRowStyle}>
              <Col md="2" className="text-center">
                <div className="info">
                  <div className="icon icon-info">                   
                    <img
                        alt="..."
                        className="iceWaterIconSvg"                        
                        // style={{ height: 65, position: 'relative', top: 15 }}
                        src={
                          require("../../assets/img/Water_Full_Color.png")
                            .default
                        }
                      />
                  </div>                  
                </div>
              </Col>
              <Col md="10">              
                  <h4>Water</h4>
                  <br/>
                  <div>
                    The stable phase of H2O. It is a liquid token that maintains its value over time
                  </div>                                                 
              </Col>
            </Row>

            <Row style={elementRowStyle}>
              <Col md="2" className="text-center">
                <div className="info">
                  <div className="icon icon-info">                   
                    <img
                        alt="..."
                        className="iceWaterIconSvg"                        
                        // style={{ height: 65, position: 'relative', top: 15 }}
                        src={
                          require("../../assets/img/Steam_Full_Color.png")
                            .default
                        }
                      />
                  </div>                  
                </div>
              </Col>
              <Col md="10">              
                  <h4>Steam</h4>
                  <br/>
                  <div>
                  Absorbs the volatility of water to keep it stable. When demand for water grows, new water is issued to steam holders. When demand for water falls, new steam is sold and water is burned.
                  </div>                                                 
              </Col>
            </Row>

            <Row style={elementRowStyle}>
              <Col md="2" className="text-center">
                <div className="info">
                  <div className="icon icon-info">                   
                    <img
                        alt="..."
                        className="iceWaterIconSvg"                        
                        // style={{ height: 65, position: 'relative', top: 15 }}
                        src={
                          require("../../assets/img/Ice_Full_Color.png")
                            .default
                          
                        }
                      />
                  </div>                  
                </div>
              </Col>
              <Col md="10">              
                  <h4>Ice</h4>
                  <br/>
                  <div>
                  Generates water every day at a constant rate. When the price of ice changes, the target price of water is adjusted to protect against inflation without reference to fiat currency.
                  </div>                                                 
              </Col>
            </Row>

            
          </Container>
          </div>
          </div>
    </>
  );
}

export default LandingPage;

const maxWidthCenter = {
  maxWidth: "500px",
  margin: "0px auto"
}

const elementRowStyle = {
  fontSize: "18px",
  padding: "40px 0px",
  maxWidth: "750px",
  margin: "0px auto"
}

// const iconStyle = {
//   height: "95px",
//   position: 'relative',
//   top: "30px"
// }

const iceWaterIconSvg = {
  height: "95px"
};