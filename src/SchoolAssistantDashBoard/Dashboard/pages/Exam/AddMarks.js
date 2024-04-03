import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import './AddMarks.css';

const AddMarks = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [loadingSections, setLoadingSections] = useState(false);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [testNames, setTestNames] = useState([
    "Geography weekly test-2",
    "Mathematics mid-term exam",
    "History quiz",
    // Add more test names as needed
  ]);

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

  // Fetches sections based on selected class
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingSections(true);
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
        );
        const data = response.data || {};
        if (Object.keys(data).length > 0) {
          const sections = Object.keys(data);
          console.log("Sections:", sections); // Log sections to verify data
          setSectionOptions(sections);
          setSelectedSection(sections[0] || "");
        }
        setLoadingSections(false);
      } catch (error) {
        setLoadingSections(false);
        console.error("Error fetching sections:", error);
        // Handle error gracefully, e.g., display a message to the user
      }
    };

    fetchData();
  }, [selectedClass]);

  // Fetch student data based on selected class and section
useEffect(() => {
  const fetchStudentData = async () => {
    try {
      setLoadingSections(true);
      const response = await axios.get(
        `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}/${selectedSection}.json`
      );
      const data = response.data || {};
      const students = Object.entries(data).map(([id, student], index) => ({
        id, // Include student ID
        ...student,
        si: index + 1, // Assign SI (serial number) starting from 1
        totalMarks:
          parseInt(student.telugu) +
          parseInt(student.hindi) +
          parseInt(student.english) +
          parseInt(student.maths) +
          parseInt(student.science) +
          parseInt(student.social),
      }));
      setStudentsData(students);
      setLoadingSections(false);
    } catch (error) {
      setLoadingSections(false);
      console.error("Error fetching student data:", error);
      // Handle error gracefully
    }
  };

  if (selectedClass && selectedSection) {
    fetchStudentData();
  }
}, [selectedClass, selectedSection]);

const handleMarksChange = (id, subject, value) => {
  // Find the index of the student in studentsData array
  const index = studentsData.findIndex(student => student.id === id);
  if (index !== -1) {
    // If the student is found, update the subject marks
    const updatedStudentsData = [...studentsData];
    updatedStudentsData[index][subject] = value;
    setStudentsData(updatedStudentsData);
  } else {
    console.error("Student not found");
  }
};

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleTestChange = (event) => {
    setSelectedTest(event.target.value);
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
            <select value={selectedTest} onChange={handleTestChange}>
              {testNames.map((test, index) => (
                <option key={index} value={test}>
                  {test}
                </option>
              ))}
            </select>
          </div>
          <div className="RightOne">
            <span className="Onename">Conducted on : </span> 10 May, 10:00AM -


            11:30AM
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
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student) => (
              <tr key={student.id}>
                <td>{student.si}</td>
                <td>{student.surname} {student.name}</td> {/* Combine surname and name */}
                <td>{student.gender}</td>
                <td>
                  <input
                    type="number"
                    value={student.telugu}
                    onChange={(e) =>
                      handleMarksChange(student.id, 'telugu', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.hindi}
                    onChange={(e) =>
                      handleMarksChange(student.id, 'hindi', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.english}
                    onChange={(e) =>
                      handleMarksChange(student.id, 'english', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.maths}
                    onChange={(e) =>
                      handleMarksChange(student.id, 'maths', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.science}
                    onChange={(e) =>
                      handleMarksChange(student.id, 'science', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.social}
                    onChange={(e) =>
                      handleMarksChange(student.id, 'social', e.target.value)
                    }
                  />
                </td>
                <td>{student.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddMarks;