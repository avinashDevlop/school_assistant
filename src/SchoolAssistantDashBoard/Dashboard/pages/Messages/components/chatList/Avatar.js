// Avatar.js
import React from "react";
import { PiStudentDuotone } from "react-icons/pi";
import "./Avatar.css";

const Avatar = (props) => {
  return (
    <div className="avatar">
      <div className={`isOnline ${props.isOnline}`}></div>
      <PiStudentDuotone className="avatar-icon" />
    </div>
  );
};

export default Avatar;
