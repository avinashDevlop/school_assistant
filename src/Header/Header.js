import React from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";
import "./HeaderCSS.css"; // Import the CSS file for styling
import logo from './logo.jpg'; 

function Header() {
  return (
    <div className="nav-container">
      <Navbar expand="lg" className="custom-bg-body-tertiary navBar">
        <div className="navContainer">
          <div className="brand-container">
            <Navbar.Brand href="/" className="custom-content"> 
              <div className="" style={{display:'flex',alignItems:'center'}}>
              <img src={logo} alt="School Logo" className="school-logo" /></div>
              <div>
              <h4 className="custom-h4 custom-outline-text">
                St. JOHN'S ENGLISH MEDIUM SCHOOL
              </h4>
              <h4 className="custom-h4 custom-animated-text">
                St. JOHN'S ENGLISH MEDIUM SCHOOL
              </h4>
              </div>
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="mx-auto custom-nav-container">
              <Nav.Link href="#AboutUs" className="custom-nav-link-hover">
                  About Us
                </Nav.Link>
                <Nav.Link href="#Gallery" className="custom-nav-link-hover">
                  Gallery
                </Nav.Link>
                <Nav.Link href="#WebsiteAdmission" className="custom-nav-link-hover">
                  Adimissions
                </Nav.Link>
                <Nav.Link href="#Results" className="custom-nav-link-hover">
                  Results
                </Nav.Link>
                <Nav.Link href="#ContactUs" className="custom-nav-link-hover">
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
              </div>
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
