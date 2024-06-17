import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { IoIosPaper } from "react-icons/io";
import { FaRupeeSign, FaShuttleVan } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { IoLibrarySharp } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SideNavCSS.css';
const routes = [
  {
    path: "/Dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
    subRoutes: [
      {
        path: "AdminDashboard",
        name: "Admin",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "StudentDashboard",
        name: "Student",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "TeacherDashboard",
        name: "Teachers",
        icon:<IoIosArrowForward />
      },
    ],
  },
  {
    path: "/Student",
    name: "Student",
    icon: <PiStudentFill />,
    subRoutes: [
      {
        path: "AllStudent",
        name: "All Students",
        icon: <IoIosArrowForward /> ,
      },
      {
        path: "StudentDetails",
        name: "Student Details",
        icon: <IoIosArrowForward />,
      },
      {
        path: "AdmissionForm",
        name: "Admission Form",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "StudentPromotion",
        name: "Stud Promotion",
        icon: <IoIosArrowForward />,
      },
    ],
  },
  {
    path: "",
    name: "Teachers",
    icon: <GiTeacher />,
    subRoutes: [
      {
        path: "AllTeachers",
        name: "All Teachers",
        icon: <IoIosArrowForward />,
      },
      {
        path: "TeacherDetails", 
        name: "Teachers Details",
        icon: <IoIosArrowForward />,
      },
      {
        path: "AddTeacher",
        name: "Add Teacher",
        icon: <IoIosArrowForward />,
      },
    ],
  },
  {
    path: "",
    name: "Library",
    icon: <IoLibrarySharp />,
    subRoutes: [
      {
        path: "LibraryBooks",
        name: "All Books",
        icon:<IoIosArrowForward />,
      },
      {
        path: "AddLibraryBooks",
        name: "Add Book",
        icon: <IoIosArrowForward />,
      },
    ],
  },
  {
    path: "",
    name: "Time table",
    icon: <SiGoogleclassroom />,
    exact: true,
    subRoutes: [
      {
        path: "AllTimeTables",
        name: "All timeTables",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "UpdateTimeTables",
        name: "Update timeTable",
        icon: <IoIosArrowForward />
        ,
      },
    ],
  },
  {
    path: "Attendence",
    name: "Attendence",
    icon:<TbReport />
    ,
  },
  {
    path: "",
    name: "Exam",
    icon: <IoIosPaper />
    ,
    subRoutes: [
      {
        path: "ExamSchedule",
        name: "Exam Schedule",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "AddExamSchedule",
        name: "Add ExamSchedule",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "AddMarks",
        name: "Add Marks",
        icon: <IoIosArrowForward />
        ,
      },
    ],
  },
  {
    path: "Finance",
    name: "Finance",
    icon: <FaRupeeSign />,
  },
  {
    path: "Transport",
    name: "Transport",
    icon: <FaShuttleVan />,
  },
  {
    path: "Notice",
    name: "Notice",
    icon: <RiMailSendLine />
    ,
  },
  {
    path: "chatStudent",
    name: "Messeage",
    icon: <AiOutlineMessage />,
  },
  {
    path: "Account",
    name: "Account",
    icon: <MdManageAccounts />
    ,subRoutes: [
      {
        path: "StudAccount",
        name: "Student",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "TeachAccounts",
        name: "Teacher",
        icon: <IoIosArrowForward />
        ,
      },
      {
        path: "DriverAccounts",
        name: "Driver",
        icon: <IoIosArrowForward />
        ,
      },
    ],
  },

];

const SideBar = ({ isOpen, children }) =>  {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
 

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <>
      <div className={`main-container ${isOpen ? '' : 'sidebar-close'}`}  style={{overflow:'scroll',minHeight:'92vh',maxHeight:'100%'}} >
        <motion.div 
          animate={{ 
            width: isOpen ? '195px' : '50px',
            transition: {
              duration: 0.1,
              type: 'spring',
              damping: 15,
            },
          }}
          className={`sidebar `}
        >
          <section className="routes">
            {routes.map((route, index) => (
              <React.Fragment key={index}>
                {route.subRoutes ? (
                  <SidebarMenu
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    isMenuOpen={isMenuOpen}
                    toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                    closeMenu={closeMenu}
                  />
                ) : (
                  <NavLink
                    to={route.path}
                    className="link"
                    activeClassName="active"
                    onClick={() => handleNavigation(route.path)}
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink> 
                )}
              </React.Fragment>
            ))}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;