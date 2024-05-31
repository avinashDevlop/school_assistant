import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Checkbox, Button } from '@mui/material';
import api from '../../../../api';
import './Transport.css';
import AssinedTransportList from './AssinedTransportList';
const Transport = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [sectionOptions, setSectionOptions] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const classOptions = [
    "10th Class", "9th Class", "8th Class", "7th Class", "6th Class",
    "5th Class", "4th Class", "3rd Class", "2nd Class", "1st Class", "UKG", "LKG", "Pre-K"
  ];

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
        console.error("Error fetching sections:", error);
        setLoadingSections(false);
      }
    };

    fetchSections();
  }, [selectedClass]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoadingStudents(true);

        if (selectedClass && selectedSection) {
          const response = await api.get(
            `admissionForms/${selectedClass}/${selectedSection}.json`
          );
          const studentData = response.data || {};
          const studentArray = Object.keys(studentData).map((key) => ({
            id: key,
            ...studentData[key],
            present: false,
            assignedToAnotherDriver: false,
          }));

          if (selectedDriver) {
            const driverResponse = await api.get(
              `accounts/Driver/${selectedDriver}/students/${selectedClass}/${selectedSection}.json`
            );
            const assignedStudents = driverResponse.data || {};
            studentArray.forEach(student => {
              if (assignedStudents[student.id]) {
                student.present = true;
              }
            });
          }

          const allDriversResponse = await api.get(`accounts/Driver.json`);
          const allDrivers = allDriversResponse.data || {};
          studentArray.forEach(student => {
            Object.keys(allDrivers).forEach(driverKey => {
              if (driverKey !== selectedDriver) {
                const otherDriverStudents = allDrivers[driverKey]?.students?.[selectedClass]?.[selectedSection] || {};
                if (otherDriverStudents[student.id]) {
                  student.assignedToAnotherDriver = true;
                }
              }
            });
          });

          setStudents(studentArray);
        } else {
          setStudents([]);
        }
        setLoadingStudents(false);
      } catch (error) {
        setLoadingStudents(false);
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [selectedClass, selectedSection, selectedDriver]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoadingDrivers(true);
        const response = await api.get('accounts/Driver.json');
        const data = response.data || {};
        const drivers = Object.values(data);
        setDriverOptions(drivers);
        setSelectedDriver(drivers[0]?.name || "");
        setLoadingDrivers(false);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setLoadingDrivers(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const selectedStudents = students
        .filter(student => student.present)
        .reduce((acc, student) => {
          acc[student.id] = {
            name: student.name,
            surname: student.surname
          };
          return acc;
        }, {});

      if (selectedDriver) {
        await api.put(
          `accounts/Driver/${selectedDriver}/students/${selectedClass}/${selectedSection}.json`,
          selectedStudents
        );
        alert("Student assignments updated successfully!");
      } else {
        alert("Please select a driver.");
      }
    } catch (error) {
      console.error("Error updating student assignments:", error);
      alert("Failed to update student assignments.");
    }
  };

  return (
    <>
      <h3>Transport</h3>
      <div className="transport-container">
        <div className="studGraph">
          <div className="detailStud alldropdowns">
            <div className="DriverList">
              <div className="noStud title1">
                Assign student's for:
              </div>
              <div>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="driver-label">Driver</InputLabel>
                  <Select
                    labelId="driver-label"
                    id="driver-select"
                    value={selectedDriver}
                    onChange={handleDriverChange}
                    disabled={loadingDrivers}
                  >
                    {driverOptions.length > 0 ? (
                      driverOptions.map((driver, index) => (
                        <MenuItem key={index} value={driver.name}>
                          {driver.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No drivers available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
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
                  disabled={loadingSections}
                >
                  {sectionOptions.length > 0 ? (
                    sectionOptions.map((section, index) => (
                      <MenuItem key={index} value={section}>
                        {section}
                      </MenuItem>
                    ))
                  ) : (
                      <MenuItem disabled>No sections available</MenuItem>
                    )}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="tableTopStud allStud">
  <div className="tableStudentMarks forcss">
    {loadingStudents ? (
      <CircularProgress />
    ) : (
      <table className="stud-list">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Roll Number</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Assign</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td className="student-name" style={{ textAlign: "center" }}>
                  {`${student.surname || ''} ${student.name || ''}` || student.id}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={student.present}
                    disabled={student.assignedToAnotherDriver}
                    onChange={() => {
                      const updatedStudents = students.map((s) =>
                        s.id === student.id ? { ...s, present: !s.present } : s
                      );
                      setStudents(updatedStudents);
                    }}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                {loadingSections ? "Loading sections..." : "No students found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )}
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={loadingStudents || loadingDrivers}
    >
      Submit
    </Button>
  </div>
</div>

        <AssinedTransportList/>
      </div>
    </>
  );
};

export default Transport;