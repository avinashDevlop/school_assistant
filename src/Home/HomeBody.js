import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import blogimg1 from './blog/schoolbig.jpg';
import blogimg2 from './blog/awardTaking.jpg';
import blogimg3 from './blog/planting.jpg';
import "./HomeBodyCSS.css";

const HomeBody = () => {
  const commonImageStyle = {
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  const laptopImageStyle = {
    ...commonImageStyle, 
    height: '100vh'
  };

  const phoneImageStyle = {
    ...commonImageStyle,
    height: '100vh'
  };

  // Determine if the current screen is a phone or laptop
  const isPhone = window.innerWidth <= 1023;
  const imageStyle = isPhone ? phoneImageStyle : laptopImageStyle;
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block"
            style={imageStyle}
            src={blogimg1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h4>St. JOHN'S ENGLISH MEDIUM HIGH SCHOOL</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={blogimg2}
            style={imageStyle}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h4>Leading by Example: NIIT Award-Winning School</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={blogimg3}
            style={imageStyle}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h4>Nurturing Growth: The Active Planting Approach</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeBody;