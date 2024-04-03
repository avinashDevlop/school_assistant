import React from "react";
import "./AllTeachersCSS.css";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
const AllTeachers = () => {
  // Placeholder function for adding a new teacher
  const handleAddTeacher = () => {
    // Add logic to handle the addition of a new teacher
    console.log("Adding a new teacher");
  };

  const Card = ({ name, role, imgSrc, socialMediaLinks }) => (
    <div className="card">
      <div className="content">
        <div className="img">
          <img src={imgSrc} alt={name} />
        </div>
        <div className="cardContent">
          <h3>
            {name}
            <br />
            <span>{role}</span>
          </h3>
        </div>
      </div>
      <ul className="sci">
        {socialMediaLinks.map((link, index) => (
          <li key={index} style={{ "--i": index + 1 }}>
            <a href={link.url}>
              {link.icon()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h3>
      Teachers/<span>All Teachers</span>
      </h3>
      <div className="dashboard-content">
        <div className="topOption">
          <div className="searchBar">
            <input type="text" placeholder="Search teachers..." />
            {/* You can add additional search functionality here */}
          </div>
          <div className="newTeacher">
            <button onClick={handleAddTeacher}>+ Add Teacher</button>
            {/* Use the defined function when the button is clicked */}
          </div>
        </div>
        <div className='AllCards'>
          <div className="containerCard">
            <Card
              name="Luis Molina Mam"
              role="Telugu"
              imgSrc="https://unsplash.it/200/200"
              socialMediaLinks={[
                { url: "tel:", icon: IoMdCall },
                { url: "mailto:", icon: IoMdMail },
                { url: "#", icon: FcAbout },
              ]}
            />
            <Card
              name="Manohar Sir"
              role="Hindi"
              imgSrc="https://unsplash.it/200/201"
              socialMediaLinks={[
                { url: "tel:", icon: IoMdCall },
                { url: "mailto:", icon: IoMdMail },
                { url: "#", icon: FcAbout },
              ]}
            />
            <Card
              name="Mahesh Sir"
              role="English"
              imgSrc="https://unsplash.it/200/201"
              socialMediaLinks={[
                { url: "tel:", icon: IoMdCall },
                { url: "mailto:", icon: IoMdMail },
                { url: "#", icon: FcAbout },
              ]}
            />
            <Card
              name="Anil Sir"
              role="Maths"
              imgSrc="https://unsplash.it/200/201"
              socialMediaLinks={[
                { url: "tel:", icon: IoMdCall },
                { url: "mailto:", icon: IoMdMail },
                { url: "#", icon: FcAbout },
              ]}
            />
          </div>
        </div>
        {/* social media */}
        <div className="container_Bottom_data">
          <div className="Lastcard">
            <div className="facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div className="details">Visit</div>
          </div>
          <div className="Lastcard">
            <div className="instragram">
              <FontAwesomeIcon icon={faInstagramSquare} />
            </div>
            <div className="details">Visit</div>
          </div>
          <div className="Lastcard">
            <div className="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </div>
            <div className="details">Chart</div>
          </div>
          <div className="Lastcard">
            <div className="Website">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className="details">Visit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTeachers;
