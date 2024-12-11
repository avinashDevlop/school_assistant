import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database"; // Firebase imports
import { PiStudentDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GiMoneyStack } from "react-icons/gi";
import { BsCalendar3, BsThreeDotsVertical } from "react-icons/bs";
import StudentAttendence from "../../graphs/TotalStudentAttendence.js";
import TotalStudentExamGrades from "../../graphs/TotalStudentExamGrades.js";
import TopStudTable from "../../Tables/topStudent.js";
import "./AdminDashboardCSS.css";

const AdminDashboard = () => {
  const [studentCount, setStudentCount] = useState(0); // State for total students
  const [teacherCount, setTeacherCount] = useState(0); // State for total teachers

  // Function to count total students from Firebase
  const countStudents = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "admissionForms"); // Path in Firebase

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        let totalStudents = 0;

        // Loop through classes and sections to count students
        Object.keys(data).forEach((classKey) => {
          const sections = data[classKey];
          Object.keys(sections).forEach((sectionKey) => {
            const students = sections[sectionKey];
            totalStudents += Object.keys(students).length;
          });
        });

        return totalStudents;
      } else {
        console.log("No data found in Firebase");
        return 0;
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return 0;
    }
  };

  // Function to count total teachers from Firebase
  const countTeachers = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "accounts/Teachers"); // Path in Firebase

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const totalTeachers = Object.keys(data).length; // Count teacher entries
        return totalTeachers;
      } else {
        console.log("No teachers found in Firebase");
        return 0;
      }
    } catch (error) {
      console.error("Error fetching teachers from Firebase:", error);
      return 0;
    }
  };

  // Fetch total students and teachers on component mount
  useEffect(() => {
    const fetchData = async () => {
      const studentCount = await countStudents();
      setStudentCount(studentCount); // Update state with student count

      const teacherCount = await countTeachers();
      setTeacherCount(teacherCount); // Update state with teacher count
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>
        Dashboard/<span>Admin</span>
      </h3>
      <div className="dashboard-content">
        <div className="container_top">
          <div className="container_top_data">
            <div className="item">
              <div className="icon1">
                <span>
                  <PiStudentDuotone />
                </span>
              </div>
              <div className="details">
                <div className="dataName">Students</div>
                <div>
                  <span className="green">{studentCount}</span>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="icon2">
                <span>
                  <LiaChalkboardTeacherSolid />
                </span>
              </div>
              <div className="details">
                <div className="dataName">Teachers</div>
                <div>
                  <span className="green">{teacherCount}</span>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="icon3">
                <span>
                  <GiMoneyStack />
                </span>
              </div>
              <div className="details">
                <div className="dataName">Fees</div>
                <div>
                  <span className="green">0</span>/{studentCount}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="icon4">
                <span>
                  <BsCalendar3 />
                </span>
              </div>
              <div className="details">
                <div className="dataName">Events</div>
                <div>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="studGraph">
          <StudentAttendence />
        </div>
        <div className="studGraph">
          <div className="detailStud">
            <div className="noStud">Recent Exam Overall statistics</div>
            <div className="threeDots">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="detailExam">
            <div className="leftOne">
              <span className="Onename">Test Name :</span> Geography weekly
              test-2
            </div>
            <div className="RightOne">
              <span className="Onename">Conducted on :</span> 10 May, 10:00AM - 11:30AM
            </div>
          </div>
          <div className="pieGrade">
            <TotalStudentExamGrades />
          </div>
          <div className="detailExam">
            <div className="leftOne">
              Students attended the test <span className="Onename">: 300</span>
            </div>
            <div className="RightOne">
              Students didn’t attend the test <span className="Onename">: 20</span>
            </div>
          </div>
        </div>
        <div className="studGraph">
          <div className="detailStud">
            <div className="noStud">Top Students</div>
            <div className="threeDots">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="tableTopStud">
            <div className="tableStudentMarks">
              <TopStudTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
