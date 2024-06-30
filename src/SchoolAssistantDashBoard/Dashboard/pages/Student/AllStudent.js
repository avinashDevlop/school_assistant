import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import AllStudentDetails from "../../Tables/AllStudentDetails.js";
import AttendenceYear from "../../Tables/Attendence/AttendenceYear";
import SAllExamReaslts from "../../Tables/Student/SAllExamResults.js";
import "./AllStudentCSS.css";

const AllStudent = () => {
  
  return (
    <div className="dashboard-content">
      <h3>
      Student/<span>All Student</span> 
      </h3>
      <div className="studGraph" id="sheet">
        <div className="tableStud" >
          <div className="tableStudentMarks" style={{overflow:'hidden'}}>
            <AllStudentDetails />
          </div>
        </div>
      </div>
      {/* attendence sheet */}
      
      <div className="attendenceYear">
          <AttendenceYear />
        </div>
      {/* all exam results */}
      <div className="Tableresults"> 
        <div className="resultsTable">
          <SAllExamReaslts />
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
  );
};

export default AllStudent;
