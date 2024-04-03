import React from "react";
import { PiStudentDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GiMoneyStack } from "react-icons/gi";
import { BsCalendar3 } from "react-icons/bs";
import StudentAttendence from "../../graphs/TotalStudentAttendence.js";
import TotalStudentExamGrades from "../../graphs/TotalStudentExamGrades.js";
import TopStudTable from "../../Tables/topStudent.js";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./AdminDashboardCSS.css";
const AdminDashboard = () => {
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
                <div className="dataName">Student</div>
                <div>
                  <span className="green">211</span>/233
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
                <div className="dataName">Teacher</div>
                <div>
                  <span className="green">21</span>/33
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
                  <span className="green">201</span>/233
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
                  <span>23</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="studGraph">
          <div className="detailStud">
            <div className="noStud">Number of Students class wise</div>
            <div className="threeDots">
              <BsThreeDotsVertical />
            </div>
          </div>
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
              <span className="Onename">Conducted on :</span> 10 May, 10:00AM -
              11:30AM
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
        {/* social media */}
        <div className="container_Bottom_data">
          <div className="Lastcard">
            <div className="facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div className="details">Visit</div>
          </div>
          <div className="Lastcard">
            <div className="instragram">
              <FontAwesomeIcon icon={faInstagramSquare} />
            </div>
            <div className="details">Visit</div>
          </div>
          <div className="Lastcard">
            <div className="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </div>
            <div className="details">Chart</div>
          </div>
          <div className="Lastcard">
            <div className="Website">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className="details">Visit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
