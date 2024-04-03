import React, { useState } from 'react';
import './AllTimeTable.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const StudentTimeTable = () => {
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
  
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  return (
    <>
      <h3>
        TimeTable/<span>All TimeTables</span>
      </h3>
      <div className="container py-5">
        <div className="card text-bg-light mb-3">
          <div className="card-header text-center head">
            <div className='dropdown'>
              Student TimeTable
              <select value={selectedClass} onChange={handleClassChange} className="form-select mb-2">
                {classOptions.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className='dropdown'>
              Section
              <select value={selectedSection} onChange={handleSectionChange} className="form-select mb-2">
                {sectionOptions.map((section, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered text-center">
              <thead className="table-dark" style={{ backgroundColor: "blue" }}>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">8:30-9:30</th>
                  <th scope="col">9:30-10:30</th>
                  <th scope="col">10:30-11:30</th>
                  <th scope="col">11:30-12:30</th>
                  <th scope="col">12:30-1:30</th>
                  <th scope="col">1:30-2:00</th>
                  <th scope="col">3:00-3:30</th>
                  <th scope="col">3:00-4:00</th>
                  <th scope="col">4:00-4:30</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Monday</th>
                  <td>Telugu</td>
                  <td>English</td>
                  <td>Maths</td>
                  <td>Science</td>
                  <td>Lunch</td>
                  <td>Hindi</td>
                  <td>Social</td>
                  <td>Maths</td>
                  <td>Science</td>
                </tr>
                <tr>
                  <th scope="row">Tuesday</th>
                  <td>Telugu</td>
                  <td>English</td>
                  <td>Maths</td>
                  <td>Science</td>
                  <td>Lunch</td>
                  <td>Computer</td>
                  <td>Hindi</td>
                  <td>Social</td>
                  <td>Maths</td>
                </tr>
                <tr>
                  <th scope="row">Wednesday</th>
                  <td>Telugu</td>
                  <td>English</td>
                  <td>Maths</td>
                  <td>Science</td>
                  <td>Lunch</td>
                  <td>Maths</td>
                  <td>Maths</td>
                  <td>Maths</td>
                  <td>Maths</td>
                </tr>
                <tr>
                  <th scope="row">Thursday</th>
                  <td>Telugu</td>
                  <td>English</td>
                  <td>Maths</td>
                  <td>Science</td>
                  <td>Lunch</td>
                  <td>Computer</td>
                  <td>Hindi</td>
                  <td>Social</td>
                  <td>Maths</td>
                </tr>
                <tr>
                  <th scope="row">Friday</th>
                  <td>Science Lab</td>
                  <td>English</td>
                  <td>Computer</td>
                  <td>Chemistry</td>
                  <td>Lunch</td>
                  <td>Science</td>
                  <td>English</td>
                  <td>Maths</td>
                  <td>Maths</td>
                </tr>
                <tr>
                  <th scope="row">Saturday</th>
                  <td>Maths</td>
                  <td>Maths</td>
                  <td>Maths</td>
                  <td>Maths</td>
                  <td>Lunch</td>
                  <td>Computer</td>
                  <td>Chemistry</td>
                  <td>Social</td>
                  <td>Maths</td>
                </tr>
              </tbody>
            </table>
            <caption className='teaching'>
              <div>Telugu : swami sir</div>
              <div>Hindi : siri mam</div>
              <div>English : manhor sir</div>
              <div>Maths : raju sir</div>
              <div>Science : raghu sir</div>
              <div>Social : swami sir</div>
            </caption>
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
    </>
  );
}

export default StudentTimeTable;
