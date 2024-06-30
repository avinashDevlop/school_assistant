import React, { useState, useEffect } from "react";
import "./TeacherDetailsCSS.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagramSquare, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import axios from '../../../../api';
import imgg from "../../images/teacher4.png";

const TeacherDashboard = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherInfo, setTeacherInfo] = useState({});
  const [teacherNames, setTeacherNames] = useState([]);

  useEffect(() => {
    const fetchTeacherNames = async () => {
      try {
        const response = await axios.get('Teachers.json');
        const data = response.data;
        const names = Object.keys(data);
        setTeacherNames(names);
        // Set the first teacher as the selected one by default
        if (names.length > 0) {
          setSelectedTeacher(names[0]);
        }
      } catch (error) {
        console.error("Error fetching teacher names:", error);
      }
    };

    fetchTeacherNames();
  }, []);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      if (selectedTeacher) {
        try {
          const response = await axios.get(`Teachers/${selectedTeacher}.json`);
          const data = response.data;
          setTeacherInfo(data);
        } catch (error) {
          console.error("Error fetching teacher details:", error);
        }
      }
    };

    fetchTeacherDetails();
  }, [selectedTeacher]);

  return (
    <>
      <h3>
        Teachers/<span>Teacher Details</span>
      </h3>
      <div className="topOption">
        <div className="dropdown2"> 
          <label htmlFor="teacherDropdown" style={{fontSize:'20px',color:'Highlight'}}>Select Teacher Resume and Details :</label>
          <select
            id="teacherDropdown"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            style={{height:'45px'}}
          >
            {teacherNames.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>
      </div>
      {teacherInfo && (
        <div className="teacher-dashboard">
          <div className="teacher-header">
            <div>
              <img src={teacherInfo.photo || imgg} alt="Teacher" className="teacher-photo" />
            </div>
            <div className="teacher-details">
              <h2>{teacherInfo.fullName}</h2>
              <p>Address: {teacherInfo.address}</p>
              <p>Contact: {teacherInfo.phone}</p>
              <p>Email: {teacherInfo.email}</p>
            </div>
          </div>
          <div className="teacher-body">
            <div className="teacher-section">
              <h3>Education :</h3>
              <p>{teacherInfo.university}</p>
            </div>
            <div className="teacher-section">
              <h3>Skills :</h3>
              <p>{teacherInfo.skills}</p>
            </div>
            <div className="teacher-section">
              <h3>About Teacher :</h3>
              <p>{teacherInfo.aboutTeacher}</p>
            </div>
            <div className="teacher-section">
              <h3>Subjects :</h3>
              <p>{teacherInfo.subjects}</p>
            </div>
          </div>
        </div>
      )}
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
          <div className="details">Chat</div>
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