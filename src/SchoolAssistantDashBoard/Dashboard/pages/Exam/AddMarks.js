import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from 'react-router-dom';
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
  const [disableInputs, setDisableInputs] = useState(true);

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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
        );
        const data = response.data || {};
        if (Object.keys(data).length > 0) {
          const sections = Object.keys(data);
          setSectionOptions(sections);
          setSelectedSection(sections[0] || "");
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
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
        const students = Object.entries(data).map(([name, student]) => ({
          id: name,
          name: name,
          gender: student.gender,
          telugu: parseInt(student.telugu) || '', 
          hindi: parseInt(student.hindi) || '', 
          english: parseInt(student.english) || '', 
          maths: parseInt(student.maths) || '', 
          science: parseInt(student.science) || '', 
          social: parseInt(student.social) || '', 
          totalMarks: parseInt(student.totalMarks) || '', 
          obtainMarks: parseInt(student.obtainMarks) || '', 
          percentage: '', 
          grade: ''
        }));
        setStudentsData(students);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    
    if (selectedClass && selectedSection) {
      fetchStudentData();
    }
  }, [selectedClass, selectedSection]);

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
        } else {
          setTestName([]);
          setSelectedTestName("");
        }
      } catch (error) {
        console.error("Error fetching test names:", error);
      }
    };

    fetchTestName();
  }, [selectedClass]);

  useEffect(() => {
    const fetchExamDates = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamSchedule/${selectedClass}/${selectedTestName}.json`
        );
        const data = response.data || {};
        if (Object.keys(data).length > 0) {
          const Dates = Object.keys(data);
          setFirstDate(Dates[0]);
          const lastIndex = Dates.length - 1;
          setLastDate(Dates[lastIndex]);
        } else {
          setFirstDate(null);
          setLastDate(null);
        }
        setDisableInputs(!(selectedTestName && firstDate));
      } catch (error) {
        console.error("Error fetching exam dates:", error);
      }
    };

    if (selectedTestName) {
      fetchExamDates();
    }
  }, [selectedClass, selectedTestName, testName.length, firstDate]);

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C+";
    if (percentage >= 40) return "C";
    return "F";
  };

  const handleMarksChange = (name, subject, value) => {
    if (value === "" || (!isNaN(value) && parseInt(value) >= 0)) {
      const numericValue = value === "" ? "" : parseInt(value); 
      const index = studentsData.findIndex((student) => student.id === name);
      if (index !== -1) {
        const updatedStudentsData = [...studentsData];
        updatedStudentsData[index][subject] = numericValue;

        const obtainMarks =
          parseInt(updatedStudentsData[index].telugu || 0) +
          parseInt(updatedStudentsData[index].hindi || 0) +
          parseInt(updatedStudentsData[index].english || 0) +
          parseInt(updatedStudentsData[index].maths || 0) +
          parseInt(updatedStudentsData[index].science || 0) +
          parseInt(updatedStudentsData[index].social || 0);

        updatedStudentsData[index].obtainMarks = obtainMarks;

        const totalMarks = updatedStudentsData[index].totalMarks || 0;
        const percentage = totalMarks ? ((obtainMarks / totalMarks) * 100).toFixed(2) : 0;
        const grade = calculateGrade(percentage);

        updatedStudentsData[index].percentage = percentage;
        updatedStudentsData[index].grade = grade;

        setStudentsData(updatedStudentsData);
      }
    } else {
      console.error("Invalid marks input:", value);
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
      const allFieldsFilled = studentsData.every(student => 
        student.telugu !== "" && student.hindi !== "" && student.english !== "" &&
        student.maths !== "" && student.science !== "" && student.social !== "" &&
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
        const passFail = student.telugu >= 35 && student.hindi >= 35 && student.english >= 35 && student.maths >= 35 && student.science >= 35 && student.social >= 35 ? 'Pass' : 'Fail';
        student.passFail = passFail;
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
          telugu: student.telugu,
          hindi: student.hindi,
          english: student.english,
          maths: student.maths,
          science: student.science,
          social: student.social,
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
        telugu: '',
        hindi: '',
        english: '',
        maths: '',
        science: '',
        social: '',
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
                {sectionOptions.map((section, index) => (
                  <MenuItem key={index} value={section}>
                    {section}
                  </MenuItem>
                ))}
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
        <table>
          <thead>
            <tr>
              <th>SI</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Telugu</th>
              <th>Hindi</th>
              <th>English</th>
              <th>Maths</th>
              <th>Science</th>
              <th>Social</th>
              <th>Total Marks</th>
              <th>Obtain Marks</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>
                  <input
                    type="number"
                    value={student.telugu}
                    onChange={(e) =>
                      handleMarksChange(student.id, "telugu", e.target.value)
                    }
                    disabled={disableInputs} // Disable input conditionally
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.hindi}
                    onChange={(e) =>
                      handleMarksChange(student.id, "hindi", e.target.value)
                    }
                    disabled={disableInputs} // Disable input conditionally
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.english}
                    onChange={(e) =>
                      handleMarksChange(student.id, "english", e.target.value)
                    }
                    disabled={disableInputs} // Disable input conditionally
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.maths}
                    onChange={(e) =>
                      handleMarksChange(student.id, "maths", e.target.value)
                    }
                    disabled={disableInputs} // Disable input conditionally
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.science}
                    onChange={(e) =>
                      handleMarksChange(student.id, "science", e.target.value)
                    }
                    disabled={disableInputs} // Disable input conditionally
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.social}
                    onChange={(e) =>
                      handleMarksChange(student.id, "social", e.target.value)
                    }
                    disabled={disableInputs} // Disable input conditionally
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.totalMarks}
                    onChange={(e) =>
                      handleMarksChange(student.id, "totalMarks", e.target.value)
                    }
                    disabled={disableInputs} // Disable input conditionally
                  />
                </td>
                <td>{student.obtainMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          {disableInputs ? (
            <div className="form-btn1 disabled">Submit Marks</div>
          ) : (
            <Link className="form-btn1" onClick={handleSubmitMarks}>
              Submit Marks
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default AddMarks;