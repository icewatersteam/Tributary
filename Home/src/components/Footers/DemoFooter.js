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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="https://twitter.com/icewatermoney"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/icewatermoney"
                  target="_blank"
                >
                  Medium
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/kVwSxRPrk5"
                  target="_blank"
                >
                  Discord
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, Ice Water
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
