import React, { useState } from "react";
import "./TeacherDetailsCSS.css";
import imgg from "../../images/teacher4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const TeacherDashboard = () => {
  const teacherInfo = {
    photo: "imgg",
    name: "John Doe",
    address: "123 School St, Cityville",
    contact: "123-456-7890",
    email: "john.doe@example.com",
    education: "Bachelor of Education, XYZ University",
    skills: "Subject expertise, Classroom management",
    about:
      "Experienced teacher dedicated to fostering a positive learning environment...",
    subjects: ["Mathematics", "Science"],
  };
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const teacherNames = [
    "John Doe",
    "Jane Doe",
    "Joe Doe",
    "Marry Smith",
    "Bob Johnson",
  ];

  return (
    <>
      <h3>
      Teachers/<span>Teacher Details</span>
      </h3>
      <div className="topOption">
        <div className="dropdown">
          <label htmlFor="teacherDropdown">Select Teacher:</label>
          <select
            id="teacherDropdown"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            {teacherNames.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="teacher-dashboard">
        <div className="teacher-header">
          <div>
            <img src={imgg} alt="Teacher" className="teacher-photo" />
          </div>
          <div className="teacher-details">
            <h2>{teacherInfo.name}</h2>
            <p>{teacherInfo.address}</p>
            <p>Contact: {teacherInfo.contact}</p>
            <p>Email: {teacherInfo.email}</p>
          </div>
        </div>
        <div className="teacher-body">
          <div className="teacher-section">
            <h3>Education</h3>
            <p>{teacherInfo.education}</p>
          </div>
          <div className="teacher-section">
            <h3>Skills</h3>
            <p>{teacherInfo.skills}</p>
          </div>
          <div className="teacher-section">
            <h3>About Me</h3>
            <p>{teacherInfo.about}</p>
          </div>
          <div className="teacher-section">
            <h3>Subjects</h3>
            <ul>
              {teacherInfo.subjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>
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
    </>
  );
};

export default TeacherDashboard;
