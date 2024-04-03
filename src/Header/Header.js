import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./HeaderCSS.css"; // Import the CSS file for styling
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="content">
		      <h4>School&nbsp;Assistant</h4>
          <h4>School&nbsp;Assistant</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto" style={{ maxWidth: "fit-content" }}>
            <Nav.Link href="/" className="nav-link-hover">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="nav-link-hover">
              Features
            </Nav.Link>
            <Nav.Link href="#action3" className="nav-link-hover">
              About
            </Nav.Link>
            <Nav.Link href="#action4" className="nav-link-hover">
              Contact Us
            </Nav.Link>
          </Nav>
          <Button variant="outline-secondary" className="me-4 btn-width" href="/LoginForm">
            LOGIN
          </Button>
          <Button variant="outline-secondary" className="btn-width" href='/SignUpForm'>
            SIGNUP
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
