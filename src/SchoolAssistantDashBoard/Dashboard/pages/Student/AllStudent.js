import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import AllStudentDetails from "../../Tables/AllStudentDetails.js";
import SAttendenceStud from "../../Tables/Student/SAttendenceStud.js";
import SAllExamReaslts from "../../Tables/Student/SAllExamResults.js";
import "./AllStudentCSS.css";


const AllStudent = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const classOptions = [
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

  const sectionOptions = ["Section A", "Section B", "Section C"];
    const monthOptions = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  
  return (
    <div className="dashboard-content">
      <h3>
      Student/<span>All Student</span>
      </h3>
      <div className="studGraph" id="sheet">
        <div className="tableStud">
          <div className="tableStudentMarks">
            <AllStudentDetails />
          </div>
        </div>
      </div>
      {/* attendence sheet */}
      <div className="studGraph">
        <div className="detailStud alldropdowns">
        <div className="noStud">Student Attendence</div>
          <div className="Class">
            <select value={selectedClass} onChange={handleClassChange}>
              {classOptions.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
          <div className="Section">
            <select value={selectedSection} onChange={handleSectionChange}>
              {sectionOptions.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div className="Month">
            <select value={selectedMonth} onChange={handleMonthChange}>
              {monthOptions.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="tableTopStud">
          <div className="tableStudentMarks forcss">
            <SAttendenceStud />
          </div>
        </div>
      </div>
      {/* all exam results */}
      <div className="Tableresults"> 
        <div className="resultsTable">
          <SAllExamReaslts />
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
  );
};

export default AllStudent;
