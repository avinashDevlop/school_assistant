import React, { useState, useEffect } from "react";
import "./UpdateTimeTables.css";

const UpdateTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [timetable, setTimetable] = useState([]);

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
    "Pre-K",
  ];

  const sectionOptions = ["Section A", "Section B", "Section C"];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleSubjectChange = (dayIndex, rowIndex, event) => {
    const value = event.target.value;
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex].subjects[rowIndex] = value;
    setTimetable(updatedTimetable);

    // Send data to the server
    sendDataToServer(dayIndex, rowIndex, value);
  };

  const handleTimeChange = (dayIndex, timeType, event) => {
    const value = event.target.value;
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex][timeType] = value;
    setTimetable(updatedTimetable);

    // Send data to the server
    sendDataToServer(dayIndex, null, value);
  };

  const handleExtraChange = (dayIndex, event) => {
    const value = event.target.value;
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex].extra = value;
    setTimetable(updatedTimetable);

    // Send data to the server
    sendDataToServer(dayIndex, null, value);
  };

  const sendDataToServer = (dayIndex, rowIndex, value) => {
    // Example code to send data to the server using fetch API
    fetch("http://your-server-url.com/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dayIndex, rowIndex, value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully sent to the server:", data);
      })
      .catch((error) => {
        console.error("There was a problem sending data to the server:", error);
      });
  };

  const initializeTimetable = () => {
    const periods = new Array(13).fill(""); // Adjusted to 13 periods
    const initialTimetable = days.map((day) => ({
      day,
      startTime: "",
      endTime: "",
      subjects: [...periods],
      extra: "",
    }));
    setTimetable(initialTimetable);
  };

  useEffect(() => {
    initializeTimetable();
  }, [selectedClass, selectedSection]);

  return (
    <div>
      <h3>
        TimeTable/<span>Update TimeTable</span>
      </h3>
      <div className="dashboard-content">
        <div className="studGraph studGraph1">
          <div className="detailStud detailStud2">
            <div className="noStud">
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
                <select value={selectedSection} onChange={handleSectionChange}>
                  {sectionOptions.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="updateTimeTable">
          <table className="timetable">
            <thead>
              <tr>
                <td>Time</td>
                {days.map((day, dayIndex) => (
                  <td key={dayIndex}>
                    From{" "}
                    <input
                      type="time"
                      value={timetable[dayIndex]?.startTime || ""} // Add optional chaining to prevent errors
                      onChange={(event) =>
                        handleTimeChange(dayIndex, "startTime", event)
                      }
                    />
                    - To
                    <input
                      type="time"
                      value={timetable[dayIndex]?.endTime || ""} // Add optional chaining to prevent errors
                      onChange={(event) =>
                        handleTimeChange(dayIndex, "endTime", event)
                      }
                    />
                  </td>
                ))}
                <td>
                  From{" "}
                  <input
                    type="time"
                    value={timetable[0]?.extraStartTime || ""} // Add optional chaining to prevent errors
                    onChange={(event) => handleTimeChange("startTime", event)}
                  />
                  - To{" "}
                  <input
                    type="time"
                    value={timetable[0]?.extraEndTime || ""} // Add optional chaining to prevent errors
                    onChange={(event) => handleTimeChange("endTime", event)}
                  />
                </td>
                <td>
                  From{" "}
                  <input
                    type="time"
                    value={timetable[0]?.extraStartTime || ""} // Add optional chaining to prevent errors
                    onChange={(event) => handleTimeChange("startTime", event)}
                  />
                  - To{" "}
                  <input
                    type="time"
                    value={timetable[0]?.extraEndTime || ""} // Add optional chaining to prevent errors
                    onChange={(event) => handleTimeChange("endTime", event)}
                  />
                </td>
                <td>
                  From{" "}
                  <input
                    type="time"
                    value={timetable[0]?.extraStartTime || ""} // Add optional chaining to prevent errors
                    onChange={(event) => handleTimeChange("startTime", event)}
                  />
                  - To{" "}
                  <input
                    type="time"
                    value={timetable[0]?.extraEndTime || ""} // Add optional chaining to prevent errors
                    onChange={(event) => handleTimeChange("endTime", event)}
                  />
                </td>
              </tr>
            </thead>
            <tbody>
              {days.map((day, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{day}</td>
                  {timetable.map((dayData, dayIndex) => (
                    <React.Fragment key={dayIndex}>
                      <td>
                        <input
                          type="text"
                          value={dayData.subjects[rowIndex]}
                          onChange={(event) =>
                            handleSubjectChange(dayIndex, rowIndex, event)
                          }
                        />
                      </td>
                    </React.Fragment>
                  ))}
                  <td>
                    <input
                      type="text"
                      value={timetable[rowIndex]?.extra || ""} // Add optional chaining to prevent errors
                      onChange={(event) => handleExtraChange(rowIndex, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={timetable[rowIndex]?.extra || ""} // Add optional chaining to prevent errors
                      onChange={(event) => handleExtraChange(rowIndex, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={timetable[rowIndex]?.extra || ""} // Add optional chaining to prevent errors
                      onChange={(event) => handleExtraChange(rowIndex, event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="teach">
          <div>
            Telugu : <input type="text" value="" />
          </div>
          <div>
            Hindi : <input type="text" value="" />
          </div>
          <div>
            English : <input type="text" value="" />
          </div>
          <div>
            Maths : <input type="text" value="" />
          </div>
          <div>
            Science : <input type="text" value="" />
          </div>
          <div>
            Social : <input type="text" value="" />
          </div>
        </div>
        <button onClick={sendDataToServer}>Save Timetable</button>
      </div>
    </div>
  );
};

export default UpdateTimeTable;
