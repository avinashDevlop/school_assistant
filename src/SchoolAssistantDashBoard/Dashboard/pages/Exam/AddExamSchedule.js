import React, { useState } from "react";
import "./AddExamSchedule.css";
import api from "../../../../api";

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
    "UKG",
    "LKG",
    "Pre-K",
  ];
  const testNames = [
    "Class Test",
    "FORMATIVE ASSESSMENT - I",
    "FORMATIVE ASSESSMENT - II",
    "SUMMATIVE ASSESSMENT - I",
    "FORMATIVE ASSESSMENT - III",
    "FORMATIVE ASSESSMENT - IV",
    "SUMMATIVE ASSESSMENT - II",
    "SUMMATIVE ASSESSMENT - III",
  ];
  const subjectOptions = [
    "Telugu",
    "Hindi",
    "English",
    "Mathematics",
    "Science",
    "Social",
    "Computer",
    "General Knowledge",
    "Drawing",
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
    subject: subjectOptions[0],
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
    if (validateForm()) {
      setExams((prevExams) => [
        ...prevExams,
        {
          ...formData,
          date: formatDate(formData.date),
        },
      ]);
      setFormData({
        date: "",
        fromTime: "",
        toTime: "",
        subject: subjectOptions[0],
        maxMarks: "",
      });
    }
  };

  const handleClear = () => {
    setExams([]);
  };

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
    if (exams.length >= 2) {
      try {
        await api.delete(`ExamSchedule/${selectedClass}/${selectedTest}.json`);
        for (const exam of exams) {
          const { date, fromTime, toTime, subject, maxMarks } = exam;
          const rowExamData = {
            date: date,
            fromTime: fromTime,
            toTime: toTime,
            subject: subject,
            maxMarks: maxMarks,
          };
          await api.put(
            `ExamSchedule/${selectedClass}/${selectedTest}/${date}.json`,
            rowExamData
          );
        }
        alert("Exam Schedule posted successfully!");
        setExams([]);
      } catch (error) {
        console.error("Error posting exams:", error);
        alert("There was an error posting the exam schedule. Please try again.");
      }
    } else {
      alert("Please select minimum two exams.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  return (
    <>
      <h3>
        Exam/<span className="subtitle">Add Exam Schedule</span>
      </h3>

      <div className="exam-schedule-container">
        <form onSubmit={handleSubmit} className="exam-form" style={{ width: "100%" }}>
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
          <div className="form-row" style={{ width: "100%" }}>
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
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                required
                style={{height:'45px'}}
              >
                {subjectOptions.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Max Marks :</label>
              <input
                type="number"
                name="maxMarks"
                placeholder="Enter max marks"
                value={formData.maxMarks}
                onChange={handleChange}
                className="input-field"
                style={{ width: "200px" }}
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
                <td>{formatTime(exam.fromTime)}</td>
                <td>{formatTime(exam.toTime)}</td>
                <td>{exam.subject}</td>
                <td>{exam.maxMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tableFooter">
          <button className="form-btn1" onClick={handleClear}>
            Clear
          </button>
          <button type="button" className="form-btn1" onClick={handlePost}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExamSchedule;