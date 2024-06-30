import React, { useState, useEffect, useMemo } from "react";
import "./AllTimeTable.css";
import axios from "axios";

const StudentTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [timetableData, setTimetableData] = useState({});
  const [periods, setPeriods] = useState([]);
  const [timeRanges, setTimeRanges] = useState([]);
  const [hasData, setHasData] = useState(false);

  const classOptions = [
    "10th Class", "9th Class", "8th Class", "7th Class", "6th Class",
    "5th Class", "4th Class", "3rd Class", "2nd Class", "1st Class",
    "UKG", "LKG", "Pre-K",
  ];

  const days = useMemo(
    () => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    []
  );

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${period}`;
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
          setSelectedSection(fetchedSections[0]);
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
          const newPeriods = Object.keys(data).sort((a, b) => {
            const aNum = parseInt(a.split('-')[1]);
            const bNum = parseInt(b.split('-')[1]);
            return aNum - bNum;
          });
          setPeriods(newPeriods);
          const newTimeRanges = newPeriods.map((period) => {
            const startTime = convertTo12HourFormat(data[period]?.startTime || "");
            const endTime = convertTo12HourFormat(data[period]?.endTime || "");
            return `${startTime} - ${endTime}`;
          });
          setTimeRanges(newTimeRanges);
          setHasData(true);
        } else {
          setHasData(false);
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
  }, [selectedClass, selectedSection, days]);

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
          if (data) {
            fetchedSubjectTables[day] = data;
          }
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
      <div className="timetable-container">
        <div className="timetable-controls">
          <div className="control-group">
            <label htmlFor="class-select">Student Class</label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={handleClassChange}
              className="form-select"
            >
              {classOptions.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="section-select">Student Section</label>
            <select
              id="section-select"
              value={selectedSection}
              onChange={handleSectionChange}
              disabled={loading || !selectedClass}
              className="form-select"
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

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          hasData ? (
            <div className="table-container" style={{ overflowY: 'hidden' }}>
              <div className="table-scroll">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="sticky-col">Time</th>
                      {timeRanges.map((timeRange, index) => (
                        <th key={index}>{timeRange}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day, index) => (
                      <tr key={index}>
                        <th className="sticky-col">{day}</th>
                        {periods.map((period, idx) => {
                          const subjectName =
                            timetableData[selectedSection]?.[day]?.[period]?.subjectName || "-";
                          return <td key={idx}>{subjectName}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="no-data">Please select correct class and section to view the timetable.</div>
          )
        )}
      </div>
    </>
  );
};

export default StudentTimeTable;