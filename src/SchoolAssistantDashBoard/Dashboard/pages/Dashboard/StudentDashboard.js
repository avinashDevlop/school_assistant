import React, { useState } from "react";
import StudentAttendence from "../../graphs/AttendanceSatus.js";
import SExamStatus from "../../graphs/SExamStatus.js";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import "./StudentDashboardCSS.css";
import TopStudTableClassWise from "../../Tables/STopStudentClassWise.js";
import UnpaidStud from "../../Tables/SUnpaidFees.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
const StudentDashboard = () => {
  // class
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamClass, setSelectedExamClass] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  //  Define class options from 10th class to pre-K
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
    "Pre-K",
  ];
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
  const yearOptions = ["2024", "2023", "2022"];

  const examClassOptions = [
    "10th Class Students",
    "9th Class Students",
    "8th Class Students",
    "7th Class Students",
    "6th Class Students",
    "5th Class Students",
    "4th Class Students",
    "3rd Class Students",
    "2nd Class Students",
    "1st Class Students",
    "Pre-K Students",
  ];

  const testNames = [
    "Geography weekly test-2",
    "Mathematics mid-term exam",
    "History quiz",
    // Add more test names as needed
  ];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
  };
  const handleExamClassChange = (e) => {
    setSelectedExamClass(e.target.value);
  };
  return (
    <>
      <h3>
        Dashboard/<span>Student</span>
      </h3>
      <div>
        <div className="studGraph studGraphtop">
          <div className="detailStud">
            <div className="noStud">Attendance status</div>
             <div className="Class">
              <select value={selectedClass} onChange={handleClassChange}>
                {classOptions.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
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
             <div className="Year">
              <select value={selectedYear} onChange={handleYearChange}>
                {yearOptions.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="threeDots">
              <span>
                <IoMdArrowDropleft />
              </span>
              <span>
                <IoMdArrowDropright />
              </span>
            </div>
          </div>
          <StudentAttendence />
        </div>
        {/* graph */}
        <div className="studGraph">
          <div className="detailStud">
            <div className="noStud">Recent Exam Overall statistics</div>
            <div className="threeDots">
              <select
                value={selectedExamClass}
                onChange={handleExamClassChange}
              >
                {examClassOptions.map((examClass, index) => (
                  <option key={index} value={examClass}>
                    {examClass}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="detailExam">
            <div className="leftOne">
              <span className="Onename">Test Name :</span>
              <select value={selectedTest} onChange={handleTestChange}>
                {testNames.map((test, index) => (
                  <option key={index} value={test}>
                    {test}
                  </option>
                ))}
              </select>
            </div>
            <div className="RightOne">
              <span className="Onename">Conducted on :</span> 10 May, 10:00AM -
              11:30AM
            </div>
          </div>
          <div className="pieGrade">
            <SExamStatus />
          </div>
          <div className="detailExam">
            <div className="leftOne">
              Students attended the test <span className="Onename">: 300</span>
            </div>
            <div className="RightOne">
              Students didn’t attend the test{" "}
              <span className="Onename">: 20</span>
            </div>
          </div>
        </div>
        <div className="studGraph">
          <div className="detailStud">
            <div className="noStud">Top Students Class Wise</div>
            <div className="threeDots">
              <select
                value={selectedExamClass}
                onChange={handleExamClassChange}
              >
                {examClassOptions.map((examClass, index) => (
                  <option key={index} value={examClass}>
                    {examClass}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="tableTopStud">
            <div className="tableStudentMarks">
              <TopStudTableClassWise />
            </div>
          </div>
        </div>
        <div className="studGraph">
          <div className="detailStud">
            <div className="noStud">Class Wise : Unpaid Students</div>
          </div>
          <div className="tableTopStud">
            <div className="tableStudentMarks">
              <UnpaidStud />
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
      </div>
    </>
  );
};

export default StudentDashboard;
