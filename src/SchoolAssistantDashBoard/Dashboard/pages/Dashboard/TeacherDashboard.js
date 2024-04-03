import React, { useState } from "react";
import TeacherPerformance from "../../graphs/TeacherPerformance";
import "./TeacherDashboardCSS.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  return (
    <>
      <h3>
        Dashboard/<span>Teacher</span>
      </h3>
      <div className="dashboard-content">
        <div className="teacherPerformance">
          <div className="detailStud Stdinfo">
            <div className="noStud">Overall Subject Percentage of a Exams</div>
            <div className="dropdowns">
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
          </div>
          <TeacherPerformance />
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

export default TeacherDashboard;
