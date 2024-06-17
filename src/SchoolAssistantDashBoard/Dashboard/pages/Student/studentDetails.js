import React, { useState, useEffect } from "react";
import axios from "axios";
import "./studentDetailsCSS.css";
import sisImage from "./sis.jpg";
import StudentReportCard from "../../graphs/reportCardGraph";
import PaymentHistory from "../../Tables/Student/SPaymentHystory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const StudentDetails = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [studentNames, setStudentNames] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const classes = [
    "10th Class",
    "9th Class",
    "8th Class",
    "7th Class",
    "6th Class",
    "5th Class",
    "4th Class",
    "3rd Class",
    "2nd Class",
    "1st Class",
    "UKG",
    "LKG",
    "Pre-K",
  ];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection("");
    setSelectedName("");
  };

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      axios
        .get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            const sections = Object.keys(data);
            setSections(sections);
            // Automatically select the first section
            setSelectedSection(sections[0]);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      axios
        .get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}/${selectedSection}.json`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            const names = Object.keys(data);
            setStudentNames(names);
            // Automatically select the first name
            setSelectedName(names[0]);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    if (selectedName) {
      axios
        .get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}/${selectedSection}/${selectedName}.json`
        )
        .then((response) => {
          const studentDetails = response.data;
          console.log("Student details:", studentDetails); // Log the response data
          setStudentDetails(studentDetails);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [selectedName, selectedClass, selectedSection]);

  useEffect(() => {
    if (selectedClass && sections.length > 0) {
      setSelectedSection(sections[0]);
    }
  }, [selectedClass, sections]);

  useEffect(() => {
    if (selectedClass && selectedSection && studentNames.length > 0) {
      setSelectedName(studentNames[0]);
    } 
  }, [selectedClass, selectedSection, studentNames]);

  const imgStyle = {
    height: "150px",
    width: "100%",
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h3>
        Student/<span>Student Details</span>
      </h3>
      <div className="dashboard-content" style={{overflow:'hidden'}}>
        <div className="container"> 
          <div className="detailStud margin">
            <label htmlFor="classDropdown">Class:</label>
            <select
              id="classDropdown"
              value={selectedClass}
              onChange={handleClassChange}
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>

            <label htmlFor="sectionDropdown">Section:</label>
            <select
              id="sectionDropdown"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>

            <label htmlFor="nameDropdown">Name:</label>
            <select
              id="nameDropdown"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            >
              {studentNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="details">
            <div className="img">
              <img src={sisImage} alt="bg" style={imgStyle} className="img" />
            </div>
            <div className="studInfo">
              <div className="allDetails">
                <div className="info">
                  <div>Name: {studentDetails?.surname}{" "}{studentDetails?.name}</div>
                  <div>Class: {studentDetails?.selectedClass}</div>
                  <div>Section: {studentDetails?.selectedSection}</div>
                  <div>Gender: {studentDetails?.gender}</div>
                  <div>Blood Group: {studentDetails?.bloodGroup}</div>
                  <div>Date of Birth: {studentDetails?.dob}</div>
                  <div>Father Name: {studentDetails?.surname}{" "}{studentDetails?.fathersName}</div>
                  <div>Mother Name: {studentDetails?.surname}{" "}{studentDetails?.mothersName}</div>
                  <div>Caste: {studentDetails?.caste}</div>
                  <div>Category: {studentDetails?.category}</div>
                  <div>Religion: {studentDetails?.religion}</div>
                  <div>Phone Number: {studentDetails?.contactNumber}</div>
                  <div>Aadhar Number: {studentDetails?.aadharCardNo}</div>
                  <div>Email ID: {studentDetails?.email}</div>
                  <div>
                    Address: {studentDetails?.residentialAddress},{" "}
                    {studentDetails?.city}, {studentDetails?.state},{" "}
                    {studentDetails?.pincode}
                  </div>
                  
                </div>
                <div className="about">
                  <div>
                    <div className="profile">img</div>
                    <div className="name">Avinash</div>
                  </div>
                  <div className="gradeAndAttend">
                    <div className="results">
                      <div className="attendence">89%</div>
                      <div>Attendence</div>
                    </div>
                    <div className="results">
                      <div className="grades">A+</div>
                      <div>Grade</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reportCard">
            <StudentReportCard />
          </div>
          <div className="paymentHystory">
            <div className="noStud" id="payment">
              Payment History
            </div>
            <PaymentHistory />
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
    </>
  );
};

export default StudentDetails;
