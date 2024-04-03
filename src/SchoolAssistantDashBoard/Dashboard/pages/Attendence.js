import React from "react";
import AttendenceYear from "../Tables/Attendence/AttendenceYear";
import TodaysAttendence from "../Tables/Attendence/TodaysAttendence";
import "./AttendenceCSS.css";

const Attendence = () => {
  return (
    <div>
      <h3>Attendance</h3>
        <div className="attendance-container">
          <TodaysAttendence/>
        </div>
        <div className="attendenceYear">
          <AttendenceYear />
        </div>
    </div>
  );
};

export default Attendence;
