import React, { useState, useEffect } from "react";
import "./ExamSchedule.css";

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [testNames, setTestNames] = useState([]);
  const [testDates, setTestDates] = useState([]);

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

  useEffect(() => {
    const fetchExamDataOnLoad = async () => {
      try {
        const response = await fetch(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamSchedule/${selectedClass}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data) {
          const names = Object.keys(data);
          setTestNames(names);
          if (names.length > 0) {
            setSelectedTest(names[0]);
          }
        } else {
          setTestNames([]);
          setSelectedTest("");
        }
      } catch (error) {
        console.error("Error fetching test names:", error);
        setTestNames([]);
        setSelectedTest("");
      }
    };

    fetchExamDataOnLoad();
  }, [selectedClass]);

  useEffect(() => {
    const fetchExamDatesOnLoad = async () => {
      if (selectedTest) {
        try {
          const response = await fetch(
            `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamSchedule/${selectedClass}/${selectedTest}.json`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          if (data) {
            setTestDates(Object.keys(data));
          } else {
            setTestDates([]);
          }
        } catch (error) {
          console.error("Error fetching test dates:", error);
          setTestDates([]);
        }
      } else {
        setTestDates([]);
      }
    };

    fetchExamDatesOnLoad();
  }, [selectedClass, selectedTest]);

  useEffect(() => {
    const fetchExamData = async () => {
      if (testDates.length > 0) {
        const examDataArray = [];

        for (const date of testDates) {
          try {
            const response = await fetch(
              `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamSchedule/${selectedClass}/${selectedTest}/${date}.json`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch exam schedule");
            }

            const examData = await response.json();
            if (examData) {
              examDataArray.push(examData);
            }
          } catch (error) {
            console.error(`Error fetching exam schedule for ${date}:`, error);
          }
        }

        setExams(examDataArray);
      } else {
        setExams([]);
      }
    };

    fetchExamData();
  }, [selectedClass, selectedTest, testDates]);

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);
    setSelectedTest(""); 
  };

  const handleTestChange = (e) => {
    const selectedTest = e.target.value;
    setSelectedTest(selectedTest);
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
              <th>From Time</th>
              <th>To Time</th>
              <th>Subject</th>
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
      </div>
    </>
  );
};

export default ExamSchedule;