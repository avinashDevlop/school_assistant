import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./ExamSchedule.css";

const ExamSchedule = () => {
    const [exams, setExams] = useState([
        {
          date: "2024-02-18",
          time: "10:00 AM - 12:00 PM",
          subject: "Science",
          maxMarks: 100,
        },
        {
          date: "2024-02-20",
          time: "1:00 PM - 3:00 PM",
          subject: "Mathematics",
          maxMarks: 100,
        },
        {
          date: "2024-02-22",
          time: "10:00 AM - 12:00 PM",
          subject: "English",
          maxMarks: 100,
        },
        {
          date: "2024-02-23",
          time: "9:30 AM - 11:30 AM",
          subject: "Telugu",
          maxMarks: 100,
        },
        {
          date: "2024-02-24",
          time: "1:00 PM - 3:00 PM",
          subject: "Hindi",
          maxMarks: 100,
        },
        {
            date: "2024-02-24",
            time: "1:00 PM - 3:00 PM",
            subject: "Social",
            maxMarks: 100,
          },
        // Add more exams as needed
      ]);
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
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
  const testNames = [
    "Unit Test - 1",
    "Quarterly Exam",
    "Unit Test - 2",
    "Half Yearly Exam",
    "Unit Test - 3",
    "Annual Exam",
  ];
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };
  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
  };
  return (
    <>
      <h3>
        Exam/<span>Exam Schedule</span>
      </h3>
      <div className="exam-schedule">
        <div className="detailStud">
          <div className="noStud">Exam Schedule</div>
          <div className="dropdown1">
            <div className="Class">
              <span className="Onename">Class : </span>
              <select value={selectedClass} onChange={handleClassChange}>
                {classOptions.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="leftOne">
              <span className="Onename">Exam Name : </span>
              <select value={selectedTest} onChange={handleTestChange}>
                {testNames.map((test, index) => (
                  <option key={index} value={test}>
                    {test}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Timings</th>
              <th>Subject Name</th>
              <th>Max Marks</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={index}>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.subject}</td>
                <td>{exam.maxMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default ExamSchedule;
