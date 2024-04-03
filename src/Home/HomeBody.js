import React from "react";
import { Button } from "react-bootstrap";
import Homeimg1 from "./HomeImgs/homepage1.png";
import { IoIosArrowForward } from "react-icons/io";
import { GiBurningDot } from "react-icons/gi";
import ImgFeatures from './HomeImgs/imgfeatures1-removebg-preview.png'
import ImgFeatures2 from './HomeImgs/imgfeatures2.png'
import ImgFeatures3 from './HomeImgs/imgfeatures3.png'
import ImgFeatures4 from './HomeImgs/imgfeatures4.png'
import ImgFeatures5 from './HomeImgs/imgfeatures5.png'
import ImgFeatures6 from './HomeImgs/imgfeatures6.png'
import ImgFeatures7 from './HomeImgs/imgfeatures7.png'
import "./HomeBodyCSS.css";
const HomeBody = () => {
  return (
    <div>
      <div className="container1">
        <div className="heading">
          <p id="h1">
            <span id="a">Build and Manage</span>
          </p>
          <p id="h2">
            <span id="b">Your School Website Without Coding.</span>
          </p>
          <p id="h3">
            <span id="c">– Simplifying Online Presence for Educators.</span>
          </p>
          <Button variant="primary" id="btn" href='/SignUpForm'>
            Get started <IoIosArrowForward style={{ paddingBottom: "2px" }} />
          </Button>
        </div>
        <div className="img1">
          <img src={Homeimg1} className="img" alt="img"/>
        </div>
      </div>
      <div className="features" id='features'>
        <div className="words word-1">
          <span>F</span>
          <span>E</span>
          <span>A</span>
          <span>T</span>
          <span>U</span>
          <span>E</span>
          <span>R</span>
          <span>S</span>
        </div>
        <div className="container1">
        <div className="img1">
          <img src={ImgFeatures} className="img" alt="img"/>
        </div>
        <div className="heading">
          <p id="h1">
            <span id="a">Student Safety</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Emergency Contact Information.</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Secure Access and Authentication.</span>
          </p>
        </div>
      </div>
      <div className="container1">
        <div className="heading">
          <p id="h1">
            <span id="a">Bus Tracking</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Real-time Bus Location</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Notifications for Parents and School Staff</span>
          </p>
        </div>
        <div className="img1">
          <img src={ImgFeatures2} className="img" alt="img"/>
        </div>
      </div>

      <div className="container1">
      <div className="img1">
          <img src={ImgFeatures3} className="img" style={{paddingRight:'50px'}} alt="img"/>
        </div>
        <div className="heading" style={{width:'110%'}}>
          <p id="h1">
            <span id="a">Student&nbsp;Maintenance</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Student Profiles with Personal Information</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Academic Progress Tracking</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Attendance Records</span>
          </p>
        </div>
      </div>
      <div className="container1">
        <div className="heading">
          <p id="h1">
            <span id="a">Better Experience</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Personalized User Dashboards</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Customizable Settings</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Interactive Features for Students, Parents, and Staff</span>
          </p>
        </div>
        <div className="img1">
          <img src={ImgFeatures4} className="img" alt="img"/>
        </div>
      </div>
      <div className="container1">
        <div className="img1">
          <img src={ImgFeatures5} className="img" alt="img"/>
        </div>
        <div className="heading" style={{width:'110%'}}>
          <p id="h1">
            <span id="a">Easy School Monitoring</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Dashboard for School Administrators</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Secure Access and Authentication.</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Analytics and Reporting Tools</span>
          </p>
        </div>
      </div>
      <div className="container1">
        <div className="heading" style={{width:'110%'}}>
          <p id="h1">
            <span id="a">Easy&nbsp;Data&nbsp;Understanding</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Personalized User Dashboards</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Customizable Settings</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Interactive Features for Students, Parents, and Staff</span>
          </p>
        </div>
        <div className="img1">
          <img src={ImgFeatures6} className="img" alt="img"/>
        </div>
      </div>

<div className="container1">
        <div className="img1">
          <img src={ImgFeatures7} className="img" alt="img"/>
        </div>
        <div className="heading" style={{width:'110%'}}>
          <p id="h1">
            <span id="a">Easy Communication for Students and Parents</span>
          </p>
          
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Announcements and Notifications.</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Messaging System.</span>
          </p>
          <p id="h2">
            <span id="b"><GiBurningDot />&nbsp;Parent-Teacher Communication Portals.</span>
          </p>
        </div>
      </div>
      </div>  
    </div>
  );
};

export default HomeBody;
