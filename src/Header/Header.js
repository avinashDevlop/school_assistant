import React from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";
import "./HeaderCSS.css"; // Import the CSS file for styling

function Header() {
  return (
    <div className="nav-container">
      <Navbar expand="lg" className="custom-bg-body-tertiary navBar">
        <div className="navContainer">
          <Navbar.Brand href="/" className="custom-content">
            <h4 className="custom-h4 custom-outline-text">
              School&nbsp;Assistant
            </h4>
            <h4 className="custom-h4 custom-animated-text">
              School&nbsp;Assistant
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto custom-nav-container">
              <Nav.Link href="/" className="custom-nav-link-hover">
                Home
              </Nav.Link>
              <Nav.Link href="#features" className="custom-nav-link-hover">
                Features
              </Nav.Link>
              <Nav.Link href="#action3" className="custom-nav-link-hover">
                About
              </Nav.Link>
              <Nav.Link href="#action4" className="custom-nav-link-hover">
                Contact Us
              </Nav.Link>
            </Nav>
            <div className="button-container">
            <Link to="/LoginForm" className="form-btn1">
        Login
      </Link>
      <Link to="/SignUpForm" className="form-btn1">
        SignUp
      </Link>

              {/* <Button variant="outline-secondary" className="form-btn1" href="/LoginForm">
                LOGIN
              </Button>
              <Button variant="outline-secondary" className="form-btn1" href="/SignUpForm">
                SIGNUP
              </Button> */}
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
