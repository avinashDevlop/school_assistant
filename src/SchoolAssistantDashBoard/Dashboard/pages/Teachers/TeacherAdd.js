import React, { useState } from "react";
import "./TeacherAddCSS.css";

const AddTeacherAndEducationForm = () => {
  const [formData, setFormData] = useState({
    // Combine both teacher and education form data
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    photo: null, // Change to null as it will store the file
    dob: "",
    university: "",
    skills: "",
    aboutMe: "",
    subjects: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    // If it's a file input, use files[0] to get the selected file
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
    // You can add API calls or any other logic for saving the data
  };

  return (
    <>
      <h3>
        Teachers/<span>Add Teachers</span>
      </h3>
      <div className="forms-container">
        <h1 className="section-title" title='Fill Form'>Personal Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="add-teacher-form">
            {/* Teacher Form */}
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Photo:
              <input
                type="file"
                name="photo"
                onChange={handleInputChange}
                accept="image/*"
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <h1 className="section-title">Education Details</h1>
          <div className="education-form">
            {/* Education Form */}
            <label>
              University:
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Skills:
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </label>

            <label>
              About Me:
              <textarea
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleInputChange}
              ></textarea>
            </label>

            <label>
              Subjects:
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      
    </>
  );
};

export default AddTeacherAndEducationForm;
