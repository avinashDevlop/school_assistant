import React, { useState } from "react";
import "./AddExamSchedule.css";
import api from "../../../../api";
import { Link } from 'react-router-dom';

const AddExamSchedule = () => {
  const [selectedTest, setSelectedTest] = useState("Class Test");
  const [selectedClass, setSelectedClass] = useState("10th Class");
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
    "Class Test",
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

  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    fromTime: "",
    toTime: "",
    subject: "",
    maxMarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (validateForm()) {
      setExams((prevExams) => [...prevExams, formData]);
      setFormData({
        date: "",
        fromTime: "",
        toTime: "",
        subject: "",
        maxMarks: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleClear = () => {
    setExams([]); // Clear the exams array
  };

  // Function to validate form fields
  const validateForm = () => {
    return (
      formData.date !== "" &&
      formData.fromTime !== "" &&
      formData.toTime !== "" &&
      formData.subject !== "" &&
      formData.maxMarks !== ""
    );
  };

  const handlePost = async () => {
    try {
      for (const exam of exams) {
        const { date, fromTime, toTime, subject, maxMarks } = exam;
  
        const rowExamData = {
          date:date,
          fromTime: fromTime,
          toTime: toTime,
          subject: subject,
          maxMarks: maxMarks
        };
  
        await api.put(
          `ExamSchedule/${selectedClass}/${selectedTest}/${date}.json`,
          rowExamData
        );
      }
  
      alert("Exam Schedule posted successfully!");
      setExams([]); // Clear the exams array after posting
    } catch (error) {
      console.error("Error posting exams:", error);
      // Handle error here (e.g., show error message)
    }
  };
  

  return (
    <>
      <h3>
        Exam/<span className="subtitle">Add Exam Schedule</span>
      </h3>

      <div className="exam-schedule-container">
        <form onSubmit={handleSubmit} className="exam-form">
          <div className="detailStud headerAddNewExam">
            <div className="noStud">Add New Exam Schedule</div>
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
              <div className="leftOne exam-name">
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
          <div className="form-row">
            <div className="form-group">
              <label className="label">Date :</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label className="label">From Time :</label>
              <input
                type="time"
                name="fromTime"
                placeholder="Enter from time"
                value={formData.fromTime}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label className="label">To Time :</label>
              <input
                type="time"
                name="toTime"
                placeholder="Enter to time"
                value={formData.toTime}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Subject :</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Max Marks :</label>
              <input
                type="number"
                name="maxMarks"
                placeholder="Enter max marks"
                value={formData.maxMarks}
                onChange={handleChange}
                className="input-field w-100"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Add Exam
          </button>
        </form>
        <table className="exam-table">
          <thead>
            <tr>
              <th colSpan={2} className="headerTableClassTest">
                Class : {selectedClass}
              </th>
              <th colSpan={3} className="headerTableClassTest">
                Exam Name : {selectedTest}
              </th>
            </tr>
            <tr>
              <th>Date</th>
              <th>From Time</th>
              <th>To Time</th>
              <th>Subject Name</th>
              <th>Max Marks</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={index}>
                <td>{exam.date}</td>
                <td>{exam.fromTime}</td>
                <td>{exam.toTime}</td>
                <td>{exam.subject}</td>
                <td>{exam.maxMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tableFooter">
          <Link className="form-btn1" onClick={handleClear}>
              Clear
          </Link>
          <Link className="form-btn1" onClick={handlePost}>
              Submit
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddExamSchedule;