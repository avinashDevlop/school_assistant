import React from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";
import logo from './logo.jpg'; 
import OfflinePopup from '../OfflinePopup';
import { Offline } from 'react-detect-offline';

function Header() {
  return (
    <div className="nav-container">
      <Offline>
        <OfflinePopup />
      </Offline>
      <style>
        {`
          .nav-container {
            width: 100%;
            background-color: #f8f9fa;
            border-bottom: 2px solid #e9ecef;
          }
          .navBar {
            padding: 0;
          }
          .navContainer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 10px 20px;
          }
          .brand-container {
            display: flex;
            align-items: center;
          }
          .school-logo {
            width: 60px;
            height: 70px;
            margin-right: 10px;
            display:'flex';
            align-items:'center'
            justify-content: center;
          }

          .school-info h1,
          .school-info h2,
          .school-info h5 {
            margin: 0;
            padding: 0;
          }

          .school-info h1 {
            font-size: 1.3rem;
            color: #3C3E90;
          }

          .school-info h2 {
            font-size: 0.8rem;
            color: #BA110E;
          }

          .school-info h5 {
            font-size: 1rem;
            color: #8C2B88;
          }

          .custom-bg-body-tertiary {
            background-color: #ffffff;
          }

          .custom-content {
            display: flex;
            align-items: center;
          }

          .custom-nav-container {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .custom-nav-link-hover {
            color: #007bff;
            margin: 0 15px;
            transition: color 0.3s ease;
          }

          .custom-nav-link-hover:hover {
            color: #0056b3;
            text-decoration: none;
          }

          .button-container {
            display: flex;
            align-items: center;
          }

          .form-btn1 {
            background-color: #007bff;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            text-decoration: none;
            margin: 0 5px;
            transition: background-color 0.3s ease;
          }

          .form-btn1:hover {
            background-color: #0056b3;
          }

          @media (max-width: 992px) {
            .navContainer {
              flex-direction: column;
            }

            .brand-container {
              margin-bottom: 10px;
            }

            .button-container {
              margin-top: 10px;
            }
          }
            @media (max-width: 740px) {
          .school-info h1 {
            font-size: 0.9rem;
      
          }

          .school-info h2 {
            font-size: 0.7rem;
  
          }

          .school-info h5 {
            font-size: 0.8rem;
        
          }
          }
          @media (max-width: 480px) {
      .school-info h1 {
        font-size: 0.8rem;
      }

      .school-info h2 {
        font-size: 0.65rem;
      }

      .school-info h5 {
        font-size: 0.7rem;
      }
    }
        `}
      </style>
      <Navbar expand="lg" className="custom-bg-body-tertiary navBar">
        <div className="navContainer">
          <div className="brand-container">
            <Navbar.Brand href="/" className="custom-content"> 
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={logo} alt="School Logo" className="school-logo" />
              </div>
              <div> 
                <div className="school-info" style={{ display: 'flex', flexDirection: 'column',alignItems:'center' }}>
                  <h1>St. JOHN'S ENGLISH MEDIUM HIGH SCHOOL</h1>
                  <h2>Recognised by the Govt. of Andhra Pradesh</h2>
                  <h5>Badvel Road, Mydukur - 516172, YSR Dist. A.P. INDIA</h5>
                </div>
              </div>
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="mx-auto custom-nav-container">
                <Nav.Link href="#Gallery" className="custom-nav-link-hover">
                  Gallery
                </Nav.Link>
                <Nav.Link href="#Results" className="custom-nav-link-hover">
                  Results
                </Nav.Link>
                <Nav.Link href="#WebsiteAdmission" className="custom-nav-link-hover">
                  Adimissions
                </Nav.Link>
                <Nav.Link href="#AboutUs" className="custom-nav-link-hover">
                  AboutUs
                </Nav.Link>
              </Nav>
              <div className="button-container">
                <Link to="/LoginForm" className="form-btn1">
                  Login
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