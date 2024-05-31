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
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
    const month = now.toLocaleString("default", { month: "long" }).toLowerCase();
    const year = now.getFullYear();
    setCurrentDate(`${currentDay}, ${month} ${date}, ${year}`);
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoadingSections(true);
        const response = await api.get(`admissionForms/${selectedClass}.json`);
        const data = response.data || {};
        const sections = Object.keys(data);
        setSectionOptions(sections);
        setSelectedSection(sections[0] || "");
        setLoadingSections(false);
      } catch (error) {
        setLoadingSections(false);
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, [selectedClass]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoadingStudents(true);
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
          const studentArray = Object.keys(studentData).map((key) => ({
            id: key,
            ...studentData[key],
            present: attendanceData.present?.includes(key) || false,
          }));
          setStudents(studentArray);
          setTotalStudents(studentArray.length);
          setPresentStudents(studentArray.filter(student => student.present).length);
        } else {
          setStudents([]);
          setTotalStudents(0);
          setPresentStudents(0);
        }
        setLoadingStudents(false);
      } catch (error) {
        setLoadingStudents(false);
        console.error("Error fetching student data:", error);
      }
    };
    if (selectedClass && selectedSection) {
      fetchAttendanceData();
    }
  }, [selectedClass, selectedSection]);

  const toggleAttendance = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updatedStudents);
    setPresentStudents(updatedStudents.filter((student) => student.present).length);
    setSubmitDisabled(false);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedSection("");
    setStudents([]);
    setTotalStudents(0);
    setPresentStudents(0);
    setHolidayName("");
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleHolidayInputChange = (event) => {
    const holidayName = event.target.value;
    setHolidayName(holidayName);
    setSubmitDisabled(holidayName.trim() === "");
  };

  const handleSubmitAttendance = async () => {
    try {
      const holidayInput = document.getElementById("holiday-input");
      const holidayName = holidayInput.value.trim();

      if (holidayName) {
        const confirmation = window.confirm(
          `Are you sure you want to submit the holiday?\nHoliday: ${holidayName}`
        );
        if (confirmation) {
          await submitHolidayToDatabase(holidayName);
          return;
        }
        return;
      }

      await submitRegularAttendanceToDatabase();

      const currentSectionIndex = sectionOptions.indexOf(selectedSection);
      const nextSectionIndex =
        (currentSectionIndex + 1) % sectionOptions.length;
      setSelectedSection(sectionOptions[nextSectionIndex]);

      setSubmitDisabled(true);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Submit Error!!!");
    }
  };

  const submitHolidayToDatabase = async (holidayName) => {
    try {
      const now = new Date();
      const month = now.toLocaleString("default", { month: "long" }).toLowerCase();
      const date = now.getDate();
      const holidayData = {
        isHoliday: true,
        holidayName: holidayName,
      };
      await Promise.all(
        classOptions.map(async (classOption) => {
          const response = await api.get(`admissionForms/${classOption}.json`);
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
      setHolidayName("");
    } catch (error) {
      console.error("Error submitting holiday:", error);
      alert("Submit Error!!!");
    }
  };

  const submitRegularAttendanceToDatabase = async () => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" }).toLowerCase();
    const date = now.getDate();
    const presentStudentsData = students.filter((student) => student.present);
    const absentStudentsData = students.filter((student) => !student.present);
    const attendanceData = {
      present: presentStudentsData.map((student) => student.id),
      absent: absentStudentsData.map((student) => student.id),
    };
    const confirmation = window.confirm(
      `Are you sure you want to submit the attendance?\

n\nTotal Students: ${totalStudents}\nPresent Students: ${presentStudents}\n\nPresent Students:\n${presentStudentsData
        .map((student) => `${student.firstName} ${student.lastName}`)
        .join("\n")}\n\nAbsent Students:\n${absentStudentsData
        .map((student) => `${student.firstName} ${student.lastName}`)
        .join("\n")}`
    );
    if (confirmation) {
      await api.put(
        `Attendance/StudAttendance/${selectedClass}/${selectedSection}/${month}/${month}_${date}.json`,
        attendanceData
      );
    }
  };

  return (
    <div className="attendance-page">
      <h2 className="attendance-heading">Today's Attendance</h2>
      <p className="current-date">{currentDate}</p>
      <div className="attendance-form">
        <FormControl variant="outlined" className="attendance-form-control">
          <InputLabel id="class-select-label">Select Class</InputLabel>
          <Select
            labelId="class-select-label"
            id="class-select"
            value={selectedClass}
            onChange={handleClassChange}
            label="Select Class"
            input={<OutlinedInput label="Select Class" />}
          >
            {classOptions.map((classOption) => (
              <MenuItem key={classOption} value={classOption}>
                {classOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="attendance-form-control">
          <InputLabel id="section-select-label">Select Section</InputLabel>
          {loadingSections ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              labelId="section-select-label"
              id="section-select"
              value={selectedSection}
              onChange={handleSectionChange}
              label="Select Section"
              input={<OutlinedInput label="Select Section" />}
            >
              {sectionOptions.map((section) => (
                <MenuItem key={section} value={section}>
                  {section}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </div>
      <div className="holiday-section">
        <label htmlFor="holiday-input">Holiday Name (if any):</label>
        <input
          type="text"
          id="holiday-input"
          value={holidayName}
          onChange={handleHolidayInputChange}
          className="holiday-input"
          placeholder="Enter holiday name"
        />
      </div>
      {loadingStudents ? (
        <div className="loading-indicator">
          <CircularProgress size={48} />
        </div>
      ) : (
        <div className="attendance-container">
          <div className="attendance-header">
            <h3>Students List</h3>
            <p>Total Students: {totalStudents}</p>
            <p>Present Students: {presentStudents}</p>
          </div>
          <div className="student-list">
            {students.map((student) => (
              <div key={student.id} className="student-item">
                <span>
                  {student.firstName} {student.lastName}
                </span>
                <Android12Switch
                  checked={student.present}
                  onChange={() => toggleAttendance(student.id)}
                  inputProps={{ "aria-label": "attendance switch" }}
                />
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAttendance}
            className="submit-button"
            disabled={submitDisabled}
          >
            Submit Attendance
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodaysAttendance;