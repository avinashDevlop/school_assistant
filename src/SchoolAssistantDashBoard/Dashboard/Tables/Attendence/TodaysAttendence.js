import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import "./TodaysAttendance.css";
import api from "../../../../api";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const TodaysAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentStudents, setPresentStudents] = useState(0);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [holidayName, setHolidayName] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true); // Initialize submit button as disabled
  const [attendanceNames, setAttendanceNames] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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

  // Fetches current date and formats it
  useEffect(() => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = days[now.getDay()];
    const date = now.getDate();
    const month = now
      .toLocaleString("default", { month: "long" })
      .toLowerCase(); // Get full month name
    const year = now.getFullYear();
    setCurrentDate(`${currentDay}, ${month} ${date}, ${year}`);
  }, []);
// Fetches sections based on selected class
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoadingSections(true);
      const response = await api.get(
        `admissionForms/${selectedClass}.json`
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

  // Fetches attendance data and holiday data based on selected class and section
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStudents(true);
        setErrorMessage(""); // Clear any previous error message
  
        if (selectedClass && selectedSection) {
          const response = await api.get(
            `admissionForms/${selectedClass}/${selectedSection}.json`
          );
          const studentData = response.data || {};
          if (Object.keys(studentData).length > 0) {
            const studentArray = Object.keys(studentData).map((key) => ({
              id: key,
              ...studentData[key],
              present: false,
            }));
            setStudents(studentArray);
            setTotalStudents(studentArray.length);
            setPresentStudents(0);
            setErrorMessage(""); // Clear any previous error message
          } else {
            setStudents([]);
            setTotalStudents(0);
            setPresentStudents(0);
            setErrorMessage("No students found.");
          }
        } else {
          setStudents([]);
          setTotalStudents(0);
          setPresentStudents(0);
          setErrorMessage("");
        }
        setLoadingStudents(false);
      } catch (error) {
        setLoadingStudents(false);
        setErrorMessage("Error fetching student data.");
        console.error("Error fetching student data:", error);
      }
    };
  
    // Call fetchData only if selectedClass and selectedSection are truthy
    if (selectedClass && selectedSection) {
      fetchData();
    }
  }, [selectedClass, selectedSection]);
  


  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoadingStudents(true);
        setErrorMessage(""); // Clear any previous error message
        
        if (selectedClass && selectedSection) {
          const response = await api.get(
            `admissionForms/${selectedClass}/${selectedSection}.json`
          );
          const studentData = response.data || {};
          if (Object.keys(studentData).length > 0) {
            const studentArray = Object.keys(studentData).map((key) => ({
              id: key,
              ...studentData[key],
              present: false,
            }));
            setStudents(studentArray);
            setTotalStudents(studentArray.length);
            setPresentStudents(0);
          } else {
            setStudents([]);
            setTotalStudents(0);
            setPresentStudents(0);
            setErrorMessage("No students found.");
          }
        } else {
          setStudents([]);
          setTotalStudents(0);
          setPresentStudents(0);
        }
        setLoadingStudents(false);
      } catch (error) {
        setLoadingStudents(false);
        setErrorMessage("Error fetching student data.");
        console.error("Error fetching student data:", error);
      }
    };
  
    // Call fetchStudentData only if selectedClass is truthy
    if (selectedClass) {
      fetchStudentData();
    }
  }, [selectedClass, selectedSection]);
  const toggleAttendance = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updatedStudents);
  
    const presentCount = updatedStudents.filter((student) => student.present).length;
    setPresentStudents(presentCount);
  
    // Enable submit button if at least one student's attendance is updated
    setSubmitDisabled(false);
  };
  
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoadingStudents(true);
        setErrorMessage("");
  
        if (selectedClass && selectedSection) {
          const now = new Date();
          const month = now.toLocaleString("default", { month: "long" }).toLowerCase();
          const date = now.getDate();
  
          const attendanceResponse = await api.get(
            `Attendance/StudAttendance/${selectedClass}/${selectedSection}/${month}/${month}_${date}.json`
          );
          const attendanceData = attendanceResponse.data || {};
  
          const studentResponse = await api.get(
            `admissionForms/${selectedClass}/${selectedSection}.json`
          );
          const studentData = studentResponse.data || {};
  
          if (Object.keys(studentData).length > 0) {
            const studentArray = Object.keys(studentData).map((key) => ({
              id: key,
              ...studentData[key],
              present: attendanceData.present?.includes(key) || false,
            }));
            setStudents(studentArray);
            setTotalStudents(studentArray.length);
            setPresentStudents(studentArray.filter(student => student.present).length);
            setErrorMessage("");
          } else {
            setStudents([]);
            setTotalStudents(0);
            setPresentStudents(0);
            setErrorMessage("No students found.");
          }
        } else {
          setStudents([]);
          setTotalStudents(0);
          setPresentStudents(0);
          setErrorMessage("");
        }
        setLoadingStudents(false);
      } catch (error) {
        setLoadingStudents(false);
        setErrorMessage("Error fetching student data.");
        console.error("Error fetching student data:", error);
      }
    };
  
    if (selectedClass && selectedSection) {
      fetchAttendanceData();
    }
  }, [selectedClass, selectedSection]);
  
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedSection(""); // Reset selected section
    setStudents([]); // Reset student data
    setTotalStudents(0); // Reset total students count
    setPresentStudents(0); // Reset present students count
    setHolidayName(""); // Reset holiday name
    setErrorMessage("");
  };
  // Handles section change event
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  // Handles holiday input change event
  const handleHolidayInputChange = (event) => {
    const holidayName = event.target.value;
    setHolidayName(holidayName);

    // Enable submit button if holiday name field is not empty
    setSubmitDisabled(holidayName.trim() === "");
  };

  // Handles attendance submission
  const handleSubmitAttendance = async () => {
    try {
      const holidayInput = document.getElementById("holiday-input");
      const holidayName = holidayInput.value.trim(); // Remove any leading or trailing whitespace

      if (holidayName) {
        const confirmation = window.confirm(
          `Are you sure you want to submit the holiday?\nHoliday: ${holidayName}`
        );
        if (confirmation) {
          // Submit holiday data to the database
          await submitHolidayToDatabase(holidayName);
          return;
        }
        return;
      }

      // Submit regular attendance data to the database
      await submitRegularAttendanceToDatabase();

      // Automatically select the next section in the class
      const currentSectionIndex = sectionOptions.indexOf(selectedSection);
      const nextSectionIndex =
        (currentSectionIndex + 1) % sectionOptions.length;
      setSelectedSection(sectionOptions[nextSectionIndex]);

      // Disable submit button again after submission
      setSubmitDisabled(true);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Submit Error!!!");
    }
  };

  // Submits holiday data to the database
  const submitHolidayToDatabase = async (holidayName) => {
    try {
      const now = new Date();
      const month = now
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const date = now.getDate();
      const holidayData = {
        isHoliday: true,
        holidayName: holidayName,
      };

      // Iterate over each class and section and send holiday data
      await Promise.all(
        classOptions.map(async (classOption) => {
          const response = await api.get(
            `admissionForms/${classOption}.json`
          );
          const sections = Object.keys(response.data || {});
          await Promise.all(
            sections.map(async (section) => {
              await api.put(
                `Attendance/StudAttendance/${classOption}/${section}/${month}/${month}_${date}.json`,
                holidayData
              );
            })
          );
        })
      );

      setHolidayName(""); // Reset holiday name input
    } catch (error) {
      console.error("Error submitting holiday:", error);
      alert("Submit Error!!!");
    }
  };

  // Submits regular attendance data to the database
  const submitRegularAttendanceToDatabase = async () => {
    const now = new Date();
    const month = now
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const date = now.getDate();
    const presentStudentsData = students.filter((student) => student.present);
    const absentStudentsData = students.filter((student) => !student.present);
    const attendanceData = {
      [`present`]: presentStudentsData.map(
        (student) => `${student.id}`
      ),
      [`absent`]: absentStudentsData.map(
        (student) => `${student.id}`
      ),
    };
    const confirmation = window.confirm(
      `Are you sure you want to submit the attendance?\nPresent: ${presentStudentsData.length}, Absent: ${absentStudentsData.length}`
    );
    if (confirmation) {
      await api.put(
        `Attendance/StudAttendance/${selectedClass}/${selectedSection}/${month}/${month}_${date}.json`,
        attendanceData
      );
    }
  };

  return (
    <div>
      <div className="studGraph">
        <div className="detailStud alldropdowns">
          <div className="noStud title">Today's Attendance - {currentDate}</div>
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
                ;
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
        <div className="tableTopStud">
          <div className="tableStudentMarks forcss">
            {loadingStudents ? (
              <CircularProgress />
            ) : (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th className="center">Roll Number</th>
                    <th className="center">Name</th>
                    <th className="center">
                     Present:{" "}<span className="Present">{presentStudents}</span>
                      / Absent:{" "}
                      <span className="Absent">
                        {totalStudents - presentStudents}
                      </span>{" "}                  
                     </th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td className="student-name">
                         {`${student.surname || ''} ${student.name || ''}` || attendanceNames[student.id] || student.id}
                       </td>
                        <td> 
                          <Android12Switch
                            checked={student.present}
                            onChange={() => toggleAttendance(student.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {loadingSections
                          ? "Loading sections..."
                          : "No students found"}
                      </td>
                    </tr>
                  )}
                  {/* Displaying IRR if it's a holiday */}
                  {holidayName && (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {holidayName}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="markFooter">
            <div className="buttonContainer">
              <InputLabel htmlFor="outlined-input">
                If Holiday : &nbsp;
              </InputLabel>
              <OutlinedInput
                id="holiday-input"
                value={holidayName}
                onChange={handleHolidayInputChange}
                placeholder="Holiday name then submit"
                className="customInput"
                style={{ width: "300px" }} // Adjust width as needed
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmitAttendance}
                disabled={submitDisabled} // Set disabled attribute based on submitDisabled state
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysAttendance;
