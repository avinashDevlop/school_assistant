import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import "./AddMarks.css";

const AddMarks = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sectionOptions, setSectionOptions] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [testName, setTestName] = useState([]);
  const [selectedTestName, setSelectedTestName] = useState("");
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [examsAvailable, setExamsAvailable] = useState(false);

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

  const subjectOrder = [
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
        );
        const data = response.data || {};
        if (Object.keys(data).length > 0) {
          const sections = Object.keys(data);
          setSectionOptions(sections || []);
          setSelectedSection(sections[0] || "");
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
        setSectionOptions([]);
      }
    };

    fetchData();
  }, [selectedClass]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}/${selectedSection}.json`
        );
        const data = response.data || {};
        const students = Object.entries(data).map(([id, student]) => ({
          id,
          name: student.name,
          gender: student.gender,
          subjects: subjects.reduce((acc, subj) => ({ ...acc, [subj]: '' }), {}),
          totalMarks: '',
          obtainMarks: '',
          percentage: '',
          grade: '',
          passFail: ''
        }));
        setStudentsData(students);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (selectedClass && selectedSection) {
      fetchStudentData();
    }
  }, [selectedClass, selectedSection, subjects]);

  useEffect(() => {
    const fetchTestName = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamSchedule/${selectedClass}.json`
        );
        const data = response.data || {};
        if (Object.keys(data).length > 0) {
          const testnames = Object.keys(data);
          setTestName(testnames);
          setSelectedTestName(testnames[0] || "");
          setExamsAvailable(true);
        } else {
          setTestName([]);
          setSelectedTestName("");
          setExamsAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching test names:", error);
      }
    };

    fetchTestName();
  }, [selectedClass]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamSchedule/${selectedClass}/${selectedTestName}.json`
        );
        const data = response.data || {};
        if (Object.keys(data).length > 0) {
          const Dates = Object.keys(data);
          const subjects = Dates.map(date => data[date].subject);
          setSubjects(subjects);
          setFirstDate(Dates[0]);
          setLastDate(Dates[Dates.length - 1]);
        } else {
          setSubjects([]);
          setFirstDate(null);
          setLastDate(null);
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    if (selectedClass && selectedTestName) {
      fetchExamData();
    }
  }, [selectedClass, selectedTestName]);

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C+";
    if (percentage >= 40) return "C";
    return "F";
  };

  const handleMarksChange = (id, field, value) => {
    const numericValue = value === "" ? "" : parseInt(value, 10);
  
    if (value === "" || (!isNaN(value) && numericValue >= 0)) {
      setStudentsData((prevData) => {
        return prevData.map((student) => {
          if (student.id === id) {
            const updatedStudent = { ...student };
  
            if (subjects.includes(field)) {
              updatedStudent.subjects[field] = numericValue;
            } else if (field === "totalMarks") {
              updatedStudent.totalMarks = numericValue;
            }
  
            const obtainMarks = subjects.reduce(
              (total, subj) => total + (parseInt(updatedStudent.subjects[subj]) || 0),
              0
            );
            updatedStudent.obtainMarks = obtainMarks;
  
            if (field === "totalMarks" || obtainMarks > 0) {
              updatedStudent.totalMarks = field === "totalMarks" ? numericValue : updatedStudent.totalMarks;
              updatedStudent.percentage = ((obtainMarks / updatedStudent.totalMarks) * 100).toFixed(2);
              updatedStudent.grade = calculateGrade(updatedStudent.percentage);
  
              // Calculate pass/fail based on dynamic threshold
              const passThreshold = updatedStudent.totalMarks / subjects.length * 0.3;
              updatedStudent.passFail = subjects.every((subj) => parseInt(updatedStudent.subjects[subj]) >= passThreshold) ? 'Pass' : 'Fail';
            }
  
            return updatedStudent;
          }
          return student;
        });
      });
    }
  };
  
    
  const calculateTotalExamPercentage = () => {
    let totalMarks = 0;
    let totalObtainMarks = 0;

    studentsData.forEach(student => {
      totalMarks += parseInt(student.totalMarks) || 0;
      totalObtainMarks += parseInt(student.obtainMarks) || 0;
    });

    return totalMarks ? ((totalObtainMarks / totalMarks) * 100).toFixed(2) : 0;
  };

  const handleSubmitMarks = async () => {
    try {
      if (!selectedClass || !selectedSection || !selectedTestName) {
        window.alert("Please select a class, section, and test name before submitting.");
        return;
      }

      const allFieldsFilled = studentsData.every(student => 
        subjects.every(subject => student.subjects[subject] !== "") &&
        student.totalMarks !== ""
      );

      if (!allFieldsFilled) {
        window.alert("Please fill in all fields before submitting.");
        return;
      }

      const totalExamPercentage = calculateTotalExamPercentage();
      const gradeCounts = {
        'A+': 0,
        'A': 0,
        'B+': 0,
        'B': 0,
        'C+': 0,
        'C': 0,
        'F': 0,
      };

      studentsData.forEach(student => {
        const grade = calculateGrade(student.percentage);
        gradeCounts[grade]++;
      });

      const dataToSend = {
        conductedOn: {
          firstDate: firstDate,
          lastDate: lastDate
        },
        studentResults: {},
        TotalExamPercentage: totalExamPercentage,
        NoOfGrades: gradeCounts
      };

      studentsData.forEach(student => {
        dataToSend.studentResults[student.id] = {
          name: student.name,
          gender: student.gender,
          subjects: student.subjects,
          totalMarks: student.totalMarks,
          obtainMarks: student.obtainMarks,
          percentage: student.percentage,
          grade: student.grade,
          passFail: student.passFail
        };
      });

      await axios.put(
        `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamMarks/${selectedClass}/${selectedSection}/${selectedTestName}.json`,
        dataToSend
      );

      window.alert("Marks submitted successfully!");

      setStudentsData(studentsData.map(student => ({
        ...student,
        subjects: subjects.reduce((

acc, subj) => ({ ...acc, [subj]: ''}), {}),
        totalMarks: '',
        obtainMarks: '',
        percentage: '',
        grade: '',
        passFail: ''
      })));

    } catch (error) {
      console.error("Error submitting marks:", error);
    }
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSectionOptions([]);
  };
  

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

 

 const handleTestChange = (event) => {
    setSelectedTestName(event.target.value);
  };

  return (
    <>
      <h3>
        Exam/<span>Add Marks</span>
      </h3>
      <div>
        <div className="detailStud alldropdowns">
          <div className="noStud title">Add Exam Marks</div>
          <div className="Class">
            <FormControl fullWidth variant="filled">
              <InputLabel id="class-label">Class</InputLabel>
              <Select
                labelId="class-label"
                id="class-select"
                value={selectedClass}
                onChange={handleClassChange}
              >
                {classOptions.map((className, index) => (
                  <MenuItem key={index} value={className}>
                    {className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="Section">
            <FormControl fullWidth variant="filled">
              <InputLabel id="section-label">Section</InputLabel>
              <Select
                labelId="section-label"
                id="section-select"
                value={selectedSection}
                onChange={handleSectionChange}
              >
                {sectionOptions.length > 0 ? (
                  sectionOptions.map((section, index) => (
                    <MenuItem key={index} value={section}>
                      {section}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">
                    <em>No sections available</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="detailExam">
          <div className="leftOne">
            <span className="Onename">Test Name : </span>
            {testName.length > 0 ? (
              <select value={selectedTestName} onChange={handleTestChange}>
                {testName.map((test, index) => (
                  <option key={index} value={test}>
                    {test}
                  </option>
                ))}
              </select>
            ) : (
              <span>No exams available</span>
            )}
          </div>
          <div className="RightOne">
            <span className="Onename">Conducted on : </span>{" "}
            {firstDate && lastDate ? `${firstDate} to ${lastDate}` : "-"}
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="marks-table">
          <thead>
            <tr style={{backgroundColor:'#007bff'}}>
              <th>Name</th>
              <th>Gender</th>
              {subjectOrder.filter(subject => subjects.includes(subject)).map((subject) => (
                <th key={subject}>{subject}</th>
              ))}
              <th>Total Marks</th>
              <th>Obtain Marks</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Pass/Fail</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                {subjectOrder.filter(subject => subjects.includes(subject)).map((subject) => (
                  <td key={subject}>
                    <input
                      type="number"
                      value={student.subjects[subject] || ''}
                      onChange={(e) => handleMarksChange(student.id, subject, e.target.value)}
                      disabled={!examsAvailable}
                    />
                  </td>
                ))}
                <td>
                  <input
                    type="number"
                    value={student.totalMarks}
                    onChange={(e) => handleMarksChange(student.id, "totalMarks", e.target.value)}
                    disabled={!examsAvailable}
                  />
                </td>
                <td>{student.obtainMarks}</td>
                <td>{student.percentage}</td>
                <td>{student.grade}</td>
                <td>{student.passFail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          {examsAvailable && studentsData.length > 0 ? (
            <button className="form-btn1" onClick={handleSubmitMarks}>
              Submit Marks
            </button>
          ) : (
            <button className="form-btn1 disabled" disabled>
              Submit Marks
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddMarks;