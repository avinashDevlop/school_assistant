import React, { useState, useEffect } from "react";
import "./ExamSchedule.css";
import api from "../../../../api";

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [testNames, setTestNames] = useState([]);
  const [classOptions, setClassOptions] = useState([
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
  ]);
  const [newClassDropdown, setNewClassDropdown] = useState(false);
  const [selectedPreviousClass, setselectedPreviousClass] =
    useState("@10th Class");
  const [dataArray, setDataArray] = useState([]);
  const newBatchOptions = [
    "@10th Class",
    "@9th Class",
    "@8th Class",
    "@7th Class",
    "@6th Class",
    "@5th Class",
    "@4th Class",
    "@3rd Class",
    "@2nd Class",
    "@1st Class",
    "@UKG",
    "@LKG",
    "@Pre-K",
  ];

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await api.get(
          "admissionForms/previousYearStudents.json"
        );
        const data = response.data;
        if (data) {
          const fetchedClassOptions = Object.keys(data);
          setClassOptions((prevOptions) => [
            ...new Set([...prevOptions, ...fetchedClassOptions]),
          ]);
          setDataArray(fetchedClassOptions);
        }
      } catch (error) {
        console.error("Error fetching class options:", error);
      }
    };

    fetchClassOptions();
  }, []);

  useEffect(() => {
    const fetchExamDataOnLoad = async () => {
      try {
        const allowedTestNames = [
          "Class Test",
          "FORMATIVE ASSESSMENT - I",
          "FORMATIVE ASSESSMENT - II",
          "SUMMATIVE ASSESSMENT - I",
          "FORMATIVE ASSESSMENT - III",
          "FORMATIVE ASSESSMENT - IV",
          "SUMMATIVE ASSESSMENT - II",
          "SUMMATIVE ASSESSMENT - III",
        ];
        let response;

        // Check if selectedClass or selectedPreviousClass are valid
        if (!selectedClass) {
          console.error("selectedClass is undefined or invalid.");
          return;
        }

        // Fetch data based on condition
        if (dataArray.includes(selectedClass)) {
          response = await api.get(
            `/ExamSchedule/previousYearStudents/${selectedClass}/${selectedPreviousClass}.json`
          );
        } else {
          response = await api.get(`/ExamSchedule/${selectedClass}.json`);
        }

        const data = response?.data;

        if (data && typeof data === "object") {
          const names = Object.keys(data).filter((name) =>
            allowedTestNames.includes(name)
          );
          setTestNames(names);
          if (names.length > 0) {
            setSelectedTest(names[0]);
          }
        } else {
          console.warn("No data or invalid data structure received.");
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
  }, [selectedClass, selectedPreviousClass, dataArray]);

  useEffect(() => {
    const fetchExamData = async () => {
      if (selectedTest) {
        try {
          const endpoint = dataArray.includes(selectedClass)
            ? `/ExamSchedule/previousYearStudents/${selectedClass}/${selectedPreviousClass}/${selectedTest}.json`
            : `/ExamSchedule/${selectedClass}/${selectedTest}.json`;

          const response = await api.get(endpoint);
          const data = response.data;

          if (data) {
            const dates = Object.keys(data);

            const examDataArray = dates.map((date) => ({
              ...data[date],
              date,
            }));

            examDataArray.sort((a, b) => {
              const [dayA, monthA, yearA] = a.date.split("-").map(Number);
              const [dayB, monthB, yearB] = b.date.split("-").map(Number);
              return (
                new Date(yearA, monthA - 1, dayA) -
                new Date(yearB, monthB - 1, dayB)
              );
            });

            setExams(examDataArray);
          } else {
            setExams([]);
          }
        } catch (error) {
          console.error("Error fetching exam data:", error);

          setExams([]);
        }
      } else {
        setExams([]);
      }
    };

    fetchExamData();
  }, [selectedClass, selectedTest, dataArray, selectedPreviousClass]);

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);

    const isFetchedOption = dataArray.includes(selectedClass);

    if (isFetchedOption) {
      setNewClassDropdown("show");
    } else {
      setNewClassDropdown("");
    }

    setSelectedTest("");
  };

  const handleTestChange = (e) => {
    const selectedTest = e.target.value;
    setSelectedTest(selectedTest);
  };

  const handlePreviousClassChange = (e) => {
    const selectedPreviousClass = e.target.value;
    setselectedPreviousClass(selectedPreviousClass);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";

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
            {newClassDropdown && (
              <div className="newDropdown">
                <span className="Onename">Previous Class : </span>
                <select
                  value={selectedPreviousClass}
                  onChange={handlePreviousClassChange}
                >
                  {newBatchOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
        {testNames.length > 0 ? (
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
        ) : (
          <p>No exam schedules are found</p>
        )}
      </div>
    </>
  );
};

export default ExamSchedule;
