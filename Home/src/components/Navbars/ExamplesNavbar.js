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
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons'

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
} from "reactstrap";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
      id='navbar'
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            target="_blank"
            title="Ice Water"
            tag={Link}            
          > 
            <img
              alt="Ice Water"              
              //style={iconStyle}
              style={{ height: 25 }}
              className="ifNavbarNotFixed"
              src={
                require("assets/img/logos/icewater_logo_white.svg")
                  .default
              }
            />
            <img
              alt="Ice Water"              
              //style={iconStyle}
              style={{ height: 25 }}
              className="ifNavbarFixed"
              src={
                require("assets/img/logos/icewater_logo_color.svg")
                  .default
              }
            />
            {/* Ice Water            */}
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            
            {/* <NavItem>
              <NavLink to="/index" tag={Link}>
                <i className="nc-icon nc-layout-11" /> Components
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-examples-navbar"
                target="_blank"
              >
                <i className="nc-icon nc-book-bookmark" /> Documentation
              </NavLink>
            </NavItem> */}

            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/icewatermoney"
                target="_blank"
                title="Follow us on Twitter"
              >                
                <FontAwesomeIcon size="lg" icon={faTwitter} />
                <p className="d-lg-none"> Twitter</p>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim?ref=creativetim"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://medium.com/icewatermoney"
                target="_blank"
                title="Join us on Medium"
              >
                {/* <i className="fa fa-medium" /> */}
                <FontAwesomeIcon size="lg" icon={faMedium} />
                <p className="d-lg-none"> Medium</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://discord.gg/kVwSxRPrk5"
                target="_blank"
                title="Join us on Discord"
              >
                {/* <i className="fa fa-discord" /> */}
                <FontAwesomeIcon size="lg" icon={faDiscord} />
                <p className="d-lg-none"> Discord</p>
              </NavLink>
            </NavItem>            
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;


const ifFixedTop = {
  height: "65px"
};