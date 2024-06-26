import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import "./UpdateTimeTables.css";

const UpdateTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState({});
  const [periods, setPeriods] = useState([
    'Period-1',
    'Period-2',
    'Period-3',
    'Period-4',
    'Period-5',
    'Period-6',
    'Period-7',
    'Period-8',
    'Period-9'
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

  const days = useMemo(() => [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ], []);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection(""); // Reset section when class changes
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const initializeTimetable = useCallback(() => {
    const initialTimetable = {};

    // Initialize timetable for Monday with starting and ending times
    initialTimetable["Monday"] = {};
    periods.forEach((period) => {
      initialTimetable["Monday"][period] = {
        startTime: "",
        endTime: "",
        subjectName: "",
      };
    });

    // Leave other days empty without starting and ending times
    days.slice(1).forEach((day) => {
      initialTimetable[day] = {};
      periods.forEach((period) => {
        initialTimetable[day][period] = {
          subjectName: "",
        };
      });
    });

    setTimetable(initialTimetable);
  }, [days, periods]);

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
      );
      const data = response.data;

      if (data) {
        const fetchedSections = Object.keys(data);
        setSections(fetchedSections);
        setSelectedSection(fetchedSections[0]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching sections:", error);
    }
  }, [selectedClass]);

  const fetchTimetable = useCallback(async () => {
    if (!selectedSection) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://studentassistant-18fdd-default-rtdb.firebaseio.com/SchoolTimeTable/${selectedClass}/${selectedSection}.json`
      );
      const data = response.data;

      if (data) {
        setTimetable(data);
      } else {
        initializeTimetable();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching timetable:", error);
    }
  }, [selectedClass, selectedSection, initializeTimetable]);

  useEffect(() => {
    if (selectedClass) {
      fetchSections();
    }
  }, [selectedClass, fetchSections]);

  useEffect(() => {
    if (selectedSection) {
      fetchTimetable();
    }
  }, [selectedSection, fetchTimetable]);

  const handleTimeChange = (day, period, field, value) => {
    const updatedTimetable = { ...timetable };
    if (!updatedTimetable[day]) {
      updatedTimetable[day] = {};
    }
    updatedTimetable[day][period] = {
      ...updatedTimetable[day][period],
      [field]: value
    };
    setTimetable(updatedTimetable);
  };

  const handleSubjectChange = (day, period, event) => {
    const updatedTimetable = { ...timetable };
    updatedTimetable[day][period] = {
      ...updatedTimetable[day][period],
      subjectName: event.target.value
    };
    setTimetable(updatedTimetable);
  };

  const validateTimetable = () => {
    for (let day of days) {
      for (let period of periods) {
        const entry = timetable[day]?.[period];
        if (!entry || !entry.subjectName) {
          return false;
        }
        if (day === "Monday" && (!entry.startTime || !entry.endTime)) {
          return false;
        }
      }
    }
    return true;
  };

  const sendDataToServer = async () => {
    if (!validateTimetable()) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const timetableData = timetable;

      await axios.put(
        `https://studentassistant-18fdd-default-rtdb.firebaseio.com/SchoolTimeTable/${selectedClass}/${selectedSection}.json`,
        timetableData
      );

      alert(`Timetable data saved successfully: ${selectedClass}/${selectedSection}`);
      
      // Reset the timetable after saving
      initializeTimetable();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const addPeriod = () => {
    setPeriods([...periods, `Period-${periods.length + 1}`]);
  };

  const deleteLastPeriod = () => {
    if (periods.length > 1) {
      const newPeriods = periods.slice(0, periods.length - 1);
      setPeriods(newPeriods);
    }
  };

  return (
    <div>
      <h3>
        TimeTable/<span>Update TimeTable</span>
      </h3>
      <div className="dashboard-content">
        <div className="studGraph studGraph1">
          <div className="detailStud detailStud2">
            <div className="noStud" style={{fontSize:'21px'}}>
              Update Subject Name and Timings of the Periods
            </div>
            <div className="dropdowns">
              <div className="Class">
                <select value={selectedClass} onChange={handleClassChange}>
                  {classOptions.map((className, index) => (
                    <option key={index} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>
              <div className="Section">
                <select
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
          </div>
        </div>
        <div className="updateTimeTable">
          <table className="timetable">
            <thead>
              <tr>
                <th>Period</th>
                {periods.map((period, index) => (
                  <th key={period}>
                    {period}
                    {index === periods.length - 1 && periods.length > 1 && (
                      <button onClick={deleteLastPeriod} style={{marginLeft:'10px'}}>X</button>
                    )}
                  </th>
                ))}
                <th>
                  <button onClick={addPeriod}>Add Period</button>
                </th>
              </tr>
              <tr>
                <td>Time</td>
                {periods.map((period) => (
                  <td key={period}>
                    From{" "}
                    <input
                      type="time"
                      value={timetable[days[0]]?.[period]?.startTime || ""}
                      onChange={(e) =>
                        handleTimeChange(days[0], period, 'startTime', e.target.value)
                      }
                    />
                    - To
                    <input
                      type="time"
                      value={timetable[days[0]]?.[period]?.endTime || ""}
                      onChange={(e) =>
                        handleTimeChange(days[0], period, 'endTime', e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {periods.map((period) => (
                    <td key={period}>
                      <input
                        type="text"
                        value={timetable[day]?.[period]?.subjectName || ""}
                        onChange={(e) => handleSubjectChange(day, period, e)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end" style={{paddingTop:'15px'}}>
          <button className="form-btn1" onClick={sendDataToServer}> 
            Save Timetable
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTimeTable;