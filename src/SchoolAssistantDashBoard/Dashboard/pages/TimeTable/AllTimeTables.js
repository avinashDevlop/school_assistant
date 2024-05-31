import React, { useState, useEffect, useMemo } from "react";
import "./AllTimeTable.css";
import axios from "axios";

const StudentTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timetableData, setTimetableData] = useState({});

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

  const days = useMemo(() => [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ], []);

  const periods = useMemo(() => [
    "Period-1",
    "Period-2",
    "Period-3",
    "Period-4",
    "Period-5",
    "Period-6",
    "Period-7",
    "Period-8",
    "Period-9",
  ], []);

  const [timeRanges, setTimeRanges] = useState([
    "8:30 - 9:30",
    "9:30 - 10:30",
    "10:30 - 11:30",
    "11:30 - 12:30",
    "12:30 - 1:30",
    "1:30 - 2:00",
    "3:00 - 3:30",
    "3:30 - 4:00",
    "4:00 - 4:30",
  ]);

  const handleClassChange = async (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
        );
        const data = response.data;
        if (data) {
          const fetchedSections = Object.keys(data);
          setSections(fetchedSections);
          setSelectedSection(fetchedSections[0]); // Set the first section as default
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedClass]);

  useEffect(() => {
    const fetchTimesDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/SchoolTimeTable/${selectedClass}/${selectedSection}/${days[0]}.json`
        );
        const data = response.data;
        if (data) {
          const newTimeRanges = periods.map((period) => {
            const startTime = data[period]?.startTime || "";
            const endTime = data[period]?.endTime || "";
            return `${startTime} - ${endTime}`;
          });
          setTimeRanges(newTimeRanges);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching time details:", error);
        setLoading(false);
      }
    };

    if (selectedClass && selectedSection) {
      fetchTimesDetails();
    }
  }, [selectedClass, selectedSection, days, periods]);

  useEffect(() => {
    const fetchSubjectsDetails = async () => {
      try {
        setLoading(true);
        const fetchedSubjectTables = {};
        for (const day of days) {
          const response = await axios.get(
            `https://studentassistant-18fdd-default-rtdb.firebaseio.com/SchoolTimeTable/${selectedClass}/${selectedSection}/${day}.json`
          );
          const data = response.data;
          fetchedSubjectTables[day] = data;
        }
        setTimetableData((prevState) => ({
          ...prevState,
          [selectedSection]: fetchedSubjectTables,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subject details:", error);
        setLoading(false);
      }
    };

    if (selectedClass && selectedSection) {
      fetchSubjectsDetails();
    }
  }, [selectedClass, selectedSection, days]);

  return (
    <>
      <h3>
        TimeTable/<span>All TimeTables</span>
      </h3>
      <div className="container py-5">
        <div className="card text-bg-light mb-3">
          <div className="card-header text-center head">
            <div className="dropdown">
              Student TimeTable
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="form-select mb-2"
              >
                {classOptions.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Student Section
              <select
                className="Section"
                value={selectedSection}
                onChange={handleSectionChange}
                disabled={loading || !selectedClass}
              >
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered text-center">
              <thead className="table-dark" style={{ backgroundColor: "blue" }}>
                <tr>
                  <th scope="col">Time</th>
                  {timeRanges.map((timeRange, index) => (
                    <th key={index} scope="col">
                      {timeRange}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, index) => (
                  <tr key={index}>
                    <th scope="row">{day}</th>
                    {periods.map((periods, idx) => {
                      const subjectName =
                        timetableData[selectedSection]?.[day]?.[periods]
                          ?.subjectName || "-";
                      return <td key={idx}>{subjectName}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentTimeTable;