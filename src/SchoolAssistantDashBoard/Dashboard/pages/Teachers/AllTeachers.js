import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api";
import "./AllTeachersCSS.css";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async (query = "") => {
      try {
        const response = await api.get('Teachers.json');
        const data = response.data;

        const teachersArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        // Filter teachers based on the search query
        const filteredTeachers = teachersArray.filter(teacher =>
          teacher.fullName.toLowerCase().includes(query.toLowerCase()) ||
          teacher.subjects.toLowerCase().includes(query.toLowerCase())
        );

        setTeachers(filteredTeachers);
      } catch (error) {
        console.error("Error fetching teachers data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers(searchQuery);
  }, [searchQuery]);

  const handleAddTeacher = () => {
    navigate("/Dashboard/AddTeacher");
  };

  const Card = ({ name, role, imgSrc, socialMediaLinks }) => (
    <div className="card">
      <div className="content">
        <div className="img">
          <img src={imgSrc} alt={name} />
        </div>
        <div className="cardContent">
          <h3>
            {name}
            <br />
            <span>{role}</span>
          </h3>
        </div>
      </div>
      <ul className="sci">
        {socialMediaLinks.map((link, index) => (
          <li key={index} style={{ "--i": index + 1 }}>
            <a
              href={link.url}
              target={link.newTab ? "_blank" : "_self"}
              rel={link.newTab ? "noopener noreferrer" : ""}
              style={{ color: "#0000ff", textDecoration: 'none' }}
            >
              {link.icon()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h3>
        Teachers/<span>All Teachers</span>
      </h3>
      <div className="dashboard-content">
        <div className="topOption1">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="newTeacher">
            <button onClick={handleAddTeacher}>+ Add Teacher</button>
          </div>
        </div>
        {loading ? (
          <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        ) : (
          <div className='AllCards'>
            <div className="containerCard">
              {teachers.map(teacher => (
                <Card
                  key={teacher.id}
                  name={teacher.fullName}
                  role={teacher.subjects}
                  imgSrc={teacher.photo || "https://unsplash.it/200/200"}
                  socialMediaLinks={[
                    { url: `tel:${teacher.phone}`, icon: IoMdCall, newTab: false },
                    { url: `mailto:${teacher.email}`, icon: IoMdMail, newTab: false },
                    {
                      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${teacher.email}&su=Subject&body=Body`,
                      icon: () => <FcAbout />,
                      newTab: true,
                    },
                  ]}
                />
              ))}
            </div>
          </div>
        )}
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
            <div className="details">Chat</div>
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

export default AllTeachers;