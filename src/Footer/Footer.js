import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import logo from "../Header/logo.jpg";

const FooterContainer = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const FooterTitle = styled.span`
  margin-left: 1rem;
  font-weight: bold;
  color: #333;
`;

const SchoolInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 1.1rem;
    color: #3C3E90;
  }

  h2 {
    font-size: 0.6rem;
    color: #BA110E;
  }

  h5 {
    font-size: 0.8rem;
    color: #8C2B88;
  }

  @media (min-width: 769px) {
    h1 {
      font-size: 1.3rem;
    }

    h2 {
      font-size: 0.7rem;
    }

    h5 {
      font-size: 0.9rem;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ContactLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const DeveloperInfo = styled.div`
  font-size: 1rem;
  color: #333;
  margin-top: 0.5rem;
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const DevelopedBy = styled.small`
  font-weight: bold;
  font-style: italic;
  letter-spacing: 0.05em;
`;

const HexaFire = styled.span`
  color: #C1C0C0; /* Use your preferred color */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <FooterLink href="/">
            <img alt="logo" src={logo} width="80px" />
            <FooterTitle>
              <SchoolInfo>
                <h1>St. JOHN'S ENGLISH MEDIUM HIGH SCHOOL</h1>
                <h2>Recognised by the Govt. of Andhra Pradesh</h2>
                <h5>Badvel Road, Mydukur - 516172, YSR Dist. A.P. INDIA</h5>
              </SchoolInfo>
            </FooterTitle>
          </FooterLink>
        </FooterLogo>
        <DeveloperInfo>
          <FooterLink href="https://hexafire4.com/" target="_blank">
            <DevelopedBy>
              Developed by: <HexaFire>Hexa <span style={{color:'#f27d0c'}}>fire</span> 4</HexaFire>
            </DevelopedBy>
          </FooterLink>
        </DeveloperInfo>
        <ContactInfo>
          <ContactItem>
            <ContactLink
              href="https://maps.app.goo.gl/N6kad11ypavsX2ANA"
              target="_blank"
            >
            <FaMapMarkerAlt style={{ color: "#ff0000", marginRight: "0.5rem" }} />
              <span style={{ color: "#ff0000" }}>Badvel Road, Mydukur, Kadapa, AP-516172</span>
            </ContactLink>
          </ContactItem>
          <ContactItem>
            <ContactLink href="tel:+917386550733">
            <FaPhoneAlt style={{ color: "#00ff00", marginRight: "0.5rem" }} />
              <span style={{ color: "#00ff00" }}>+91 73865 50733</span>
            </ContactLink>
          </ContactItem>
          <ContactItem>
            <ContactLink
              href="https://mail.google.com/mail/?view=cm&fs=1&to=stjohnsmyd@gmail.com&su=Subject&body=Body"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope style={{ color: "#0000ff", marginRight: "0.5rem" }} />
              <span style={{ color: "#0000ff" }}>stjohnsmyd@gmail.com</span>
            </ContactLink>
          </ContactItem>
          <ContactItem>
            <ContactLink href="https://wa.me/919393140561" target="_blank">
              <FaWhatsapp style={{ color: "#25D366", marginRight: "0.5rem" }} />
              <span style={{ color: "#25D366" }}>Chat</span>
            </ContactLink>
          </ContactItem>
        </ContactInfo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;