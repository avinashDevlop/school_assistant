import React, { useState, useEffect, useRef } from "react";
import "./AdmissionFormCSS.css";
import api from '../../../../api';

const AdmissionForm = () => {
  const topRef = useRef(null);
  const initialFormData = {
    surname: "",
    name: "",
    fathersName: "",
    mothersName: "",
    aadharCardNo: "",
    dob: "",
    caste: "",
    motherTongue: "",
    category: "",
    religion: "",
    lastSchoolName: "",
    residentialAddress: "",
    city: "",
    state: "",
    pincode: "",
    photo: null,
    formNo: "",
    dateOfIssue: "",
    bloodGroup: "",
    identificationMarks: "",
    contactNumber: "",
    email: "",
    selectedClass: "",
    selectedSection: "",
    gender: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    generateFormNumber();
  }, []);

  const generateFormNumber = () => {
    // Generate a 6-digit random number
    const randomFormNo = Math.floor(100000 + Math.random() * 900000);
    const formattedRandomFormNo = String(randomFormNo).padStart(6, "0");

    // Combine the random number and class code to form the final form number
    const finalFormNo = `${formattedRandomFormNo}`;

    // Ensure setFormData is available and a function
    if (typeof setFormData === "function") {
      setFormData((prevData) => ({
        ...prevData,
        formNo: finalFormNo,
      }));
    } else {
      console.error("setFormData is not a function or not defined properly.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "aadharCardNo") {
      const formattedAadharNo = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1-");
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedAadharNo,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if (formData.selectedClass === "") {
      //   window.alert("Class is required");
      //   return;
      // }
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (formData[key] === "" && key !== "photo") {
            window.alert(`${key} is required`);
            return;
          }
        }
      }

      // Capitalize the first letter of the name
      const capitalizedFirstName =
        formData.name.charAt(0).toUpperCase() +
        formData.name.slice(1).toLowerCase();
      const lowersurName = formData.surname.toLowerCase();
      // Concatenate surname and capitalized first name, trim spaces, and convert to lower case
      const lowerCaseName = `${lowersurName} ${capitalizedFirstName}`.trim();

      // Construct the URL dynamically based on the selected class
      const url = `admissionForms/${formData.selectedClass}/${formData.selectedSection}/${lowerCaseName}.json`;

      // Post form data to Firebase Realtime Database using Axios
      await api.put(url, formData).then((res) => {
        console.log("Form submitted successfully!",res);
      // Show a window alert
      window.alert("Form submitted successfully!");
      // Reset the form after successful submission
      setFormData(initialFormData);
      generateFormNumber();
      // Scroll to the top of the page
      topRef.current.scrollIntoView({ behavior: "smooth" });
        
      })
       .catch((err) => {
         console.error("Error submitting form: ", err);
       })
      // Handle successful submission
      
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };
  const sectionOptions = ["Section A", "Section B", "Section C"];
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
    "UKG",
    "LKG",
    "Pre-K",
  ];

  return (
    <>
      <h3 ref={topRef}>
        Student/<span>Admission Form</span>
      </h3>
      <div className="admission-form">
        <h2>ADMISSION FORM</h2>
        <form onSubmit={handleSubmit}>
          <label>Form Number:</label>
          <input
            type="text"
            name="formNo"
            value={formData.formNo}
            onChange={handleChange}
            readOnly
            required
          />
          <label>Date of Issue:</label>
          <input
            type="date"
            name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleChange}
            required
          />
          <label>Class:</label>
          <select
            name="selectedClass"
            value={formData.selectedClass}
            onChange={handleChange}
            className="droplist"
            required
          >
            <option value="">Select Class...</option>
            {classOptions.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>
          <label>Section:</label>
          <select
            name="selectedSection"
            value={formData.selectedSection}
            onChange={handleChange}
            className="droplist"
            required
          >
            <option value="">Select Section...</option>
            {sectionOptions.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>

          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
            {/* Add Gender Field */}
            <label className="gender-label">
            Gender:
            <label className="gender-radio">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <span class='gender'>Male</span>
            </label>
            <label className="gender-radio female-radio">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <span class='gender'>Female</span>
            </label>
          </label>
          <label>Father's Name:</label>
          <input
            type="text"
            name="fathersName"
            value={formData.fathersName}
            onChange={handleChange}
            required
          />

          <label>Mother's Name:</label>
          <input
            type="text"
            name="mothersName"
            value={formData.mothersName}
            onChange={handleChange}
            required
          />

          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Aadhar Card Number:</label>
          <input
            type="text"
            name="aadharCardNo"
            value={formData.aadharCardNo}
            onChange={handleChange}
            data-type="adhaar-number"
            maxLength="19"
            required
          />

          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label>Caste:</label>
          <input
            type="text"
            name="caste"
            value={formData.caste}
            onChange={handleChange}
            required
          />

          <label>Mother Tongue:</label>
          <select
            name="motherTongue"
            value={formData.motherTongue}
            onChange={handleChange}
            className="droplist"
            required
          >
            <option value="">Select Mother Tongue</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
            <option value="Urdu">Urdu</option>
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
          </select>

          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <label>Religion:</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
          />

          <label>Name of the School Last Attended:</label>
          <input
            type="text"
            name="lastSchoolName"
            value={formData.lastSchoolName}
            onChange={handleChange}
          />

          <label>Residential Address:</label>
          <textarea
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            required
          ></textarea>

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label>Pincode:</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />

          <label>Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />

          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          />

          <label>Identification Marks:</label>
          <textarea
            name="identificationMarks"
            value={formData.identificationMarks}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdmissionForm;
