import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navgation/NavBarDashboard.js";
import SideBar from "./navgation/SideNav.jsx";
import "./navgation/SideNavCSS.css";
import "./LayoutCSS.css";
import SmallBrowserMessage from "../../Responsive/SmallBrowserMessage.js"; 
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [numOfStudents, setNumOfStudents] = useState(1500);
  const [numOfTeachers, setNumOfTeachers] = useState(0);
  const [numOfParents, setNumOfParents] = useState(0);

  useEffect(() => {
    const studentIntervalId = setInterval(() => {
      if (numOfStudents < 2000) {
        setNumOfStudents((prevNum) => prevNum + 2);
      } else {
        clearInterval(studentIntervalId);
      }
    }, 0);

    const teacherIntervalId = setInterval(() => {
      if (numOfTeachers < 40) {
        setNumOfTeachers((prevNum) => prevNum + 1);
      } else {
        clearInterval(teacherIntervalId);
      }
    }, 2);

    const parentIntervalId = setInterval(() => {
      if (numOfParents < 1200) {
        setNumOfParents((prevNum) => prevNum + 1);
      } else {
        clearInterval(parentIntervalId);
      }
    }, 0.1);

    return () => {
      clearInterval(studentIntervalId);
      clearInterval(teacherIntervalId);
      clearInterval(parentIntervalId);
    };
  }, [numOfStudents, numOfTeachers, numOfParents]);

  useEffect(() => {
    localStorage.setItem("numOfStudents", numOfStudents.toString());
    localStorage.setItem("numOfTeachers", numOfTeachers.toString());
    localStorage.setItem("numOfParents", numOfParents.toString());
  }, [numOfStudents, numOfTeachers, numOfParents]);
  
  return (
    <div className="Layout">
      <SmallBrowserMessage />
      <NavBar onToggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        <div>
          <SideBar isOpen={isSidebarOpen} />
        </div>
        <div className="dashboard-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;  
