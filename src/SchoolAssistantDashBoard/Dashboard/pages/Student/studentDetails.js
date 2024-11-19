import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../../../api'
import "./studentDetailsCSS.css";
import sisImage from "./sis.png";
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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { class: classParam, section: sectionParam, name: nameParam } = location.state;
      setSelectedClass(classParam);
      setSelectedSection(sectionParam|| "");
      setSelectedName(nameParam|| "");
    }
  }, [location.state]);

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
    setStudentDetails({});
    setStudentNames([]);
    setSections([]);
  };

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      api
        .get(
          `admissionForms/${selectedClass}.json`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            const sections = Object.keys(data);
            setSections(sections);
            if (!location.state || !location.state.section) {
              setSelectedSection(sections[0]);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [selectedClass, location.state]);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      api
        .get(
          `admissionForms/${selectedClass}/${selectedSection}.json`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            const names = Object.keys(data);
            setStudentNames(names);
            if (!location.state || !location.state.name) {
              setSelectedName(names[0]);
            }
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [selectedClass, selectedSection, location.state]);

  useEffect(() => {
    if (selectedName) {
      api
        .get(
          `admissionForms/${selectedClass}/${selectedSection}/${selectedName}.json`
        )
        .then((response) => {
          const studentDetails = response.data;
          setStudentDetails(studentDetails);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [selectedName, selectedClass, selectedSection]);

  const handleEditClick = () => {
    if (selectedName) {
    navigate("/Dashboard/AdmissionForm", { state: { studentData: studentDetails } });
    }else{
      alert('!! No student select to edit!!')
    }
  };

  const handleDeleteClick = () => {
    if(selectedName){
    if (window.confirm(`Are you sure you want to delete ${selectedName}?`)) {
      api
        .delete(
          `admissionForms/${selectedClass}/${selectedSection}/${selectedName}.json`
        )
        .then(() => {
          alert("Student deleted successfully");
          // Refresh the student names and details after deletion
          setStudentNames((prev) => prev.filter((name) => name !== selectedName));
          setSelectedName("");
          setStudentDetails({});
        })
        .catch((error) => {
          setError(error.message);
        });
    }}else{
      alert("!!Please select a student to delete!!")
    }
  };

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
      <div className="dashboard-content" style={{ overflow: "hidden" }}>
        <div className="container1">
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
                  <div>
                    Name: {studentDetails?.surname} {studentDetails?.name}
                  </div>
                  <div>Class: {studentDetails?.selectedClass}</div>
                  <div>Section: {studentDetails?.selectedSection}</div>
                  <div>Gender: {studentDetails?.gender}</div>
                  <div>Blood Group: {studentDetails?.bloodGroup}</div>
                  <div>Date of Birth: {studentDetails?.dob}</div>
                  <div>Father's Name: {studentDetails?.fathersName}</div>
                  <div>
                    Father's Occupation: {studentDetails?.fathersOccupation}
                  </div>
                  <div>Mother's Name: {studentDetails?.mothersName}</div>
                  <div>Mother's Surname: {studentDetails?.mothersSurname}</div>
                  <div>
                    Mother's Occupation: {studentDetails?.mothersOccupation}
                  </div>
                  <div>Mother Tongue: {studentDetails?.motherTongue}</div>
                  <div>Caste: {studentDetails?.caste}</div>
                  <div>Category: {studentDetails?.category}</div>
                  <div>Religion: {studentDetails?.religion}</div>
                  <div>Aadhar Number: {studentDetails?.aadharCardNo}</div>
                  <div>
                    Father's Aadhar Number:{" "}
                    {studentDetails?.fathersAadharCardNo}
                  </div>
                  <div>
                    Mother's Aadhar Number:{" "}
                    {studentDetails?.mothersAadharCardNo}
                  </div>
                  <div>Email ID: {studentDetails?.email}</div>
                  <div>Phone Number: {studentDetails?.fathersMobileNumber}</div>
                  <div>Guardian's Name: {studentDetails?.guardianName}</div>
                  <div>
                    Guardian's Mobile Number:{" "}
                    {studentDetails?.guardianMobileNumber}
                  </div>
                  <div>
                    Residential Address: {studentDetails?.residentialAddress}
                  </div>
                  <div>City: {studentDetails?.city}</div>
                  <div>State: {studentDetails?.state}</div>
                  <div>Pincode: {studentDetails?.pincode}</div>
                  <div>Last School Name: {studentDetails?.lastSchoolName}</div>
                  <div>
                    Identification Marks: {studentDetails?.identificationMarks}


                  </div>
                  <div>
                    Enclosures:
                    {studentDetails?.enclosures?.aadhar && "Aadhar, "}
                    {studentDetails?.enclosures?.birthCertificate &&
                      "Birth Certificate, "}
                    {studentDetails?.enclosures?.casteCertificate &&
                      "Caste Certificate, "}
                    {studentDetails?.enclosures?.mothersBankPassbook &&
                      "Mother's Bank Passbook, "}
                    {studentDetails?.enclosures?.progressReport &&
                      "Progress Report"}
                  </div>
                </div>
                <div className="about">
                  <div>
                    <div className="profile">
                      <img
                        src={studentDetails?.photo}
                        alt="student"
                      />
                    </div>
                    <div className="name">
                      {studentDetails?.surname} {studentDetails?.name}
                    </div>
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
                  <div className="actionButtons2">
                    <button className="editButton1" onClick={handleEditClick}>
                      <FaEdit /> Edit
                    </button>
                    <button className="deleteButton2" onClick={handleDeleteClick}>
                      <FaTrash /> Delete
                    </button>
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
