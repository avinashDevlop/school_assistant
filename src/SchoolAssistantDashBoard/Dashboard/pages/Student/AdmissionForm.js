import React, { useState, useEffect, useRef } from "react";
import "./AdmissionFormCSS.css";
import api from "../../../../api";

const AdmissionForm = () => {
  const topRef = useRef(null);
  const initialFormData = {
    surname: "",
    name: "",
    fathersName: "",
    fathersOccupation: "",
    fathersMobileNumber: "",
    fathersAadharCardNo: "",
    mothersSurname: "",
    mothersName: "",
    mothersOccupation: "",
    mothersMobileNumber: "",
    mothersAadharCardNo: "",
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
    email: "",
    selectedClass: "",
    selectedSection: "",
    gender: "",
    guardianName: "",
    guardianMobileNumber: "",
    admissionNumber: "", // Added admissionNumber field
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    generateFormNumber();
  }, []);

  const generateFormNumber = () => {
    const randomFormNo = Math.floor(100000 + Math.random() * 900000);
    const formattedRandomFormNo = String(randomFormNo).padStart(6, "0");
    const finalFormNo = `${formattedRandomFormNo}`;

    setFormData((prevData) => ({
      ...prevData,
      formNo: finalFormNo,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name.endsWith("AadharCardNo") || name === "aadharCardNo") {
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
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (formData[key] === "" && key !== "photo") {
            window.alert(`${key} is required`);
            return;
          }
        }
      }

      const lowersurName = formData.surname.trim();
      const capitalizedFirstName = formData.name.trim();
      const lowerCaseName = `${lowersurName} ${capitalizedFirstName}`.trim();

      const url = `admissionForms/${formData.selectedClass}/${formData.selectedSection}/${lowerCaseName}.json`;

      await api
        .put(url, formData)
        .then((res) => {
          console.log("Form submitted successfully!", res);
          window.alert("Form submitted successfully!");
          setFormData(initialFormData);
          generateFormNumber();
          topRef.current.scrollIntoView({ behavior: "smooth" });
        })
        .catch((err) => {
          console.error("Error submitting form: ", err);
        });
    } catch (error) {
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

  const religionOptions = [
    "Hinduism",
    "Islam",
    "Christianity",
    "Buddhism",
    "Jainism",
    "Sikhism",
  ];
  const widthundred = {
    width: "100%",
  };
  return (
    <>
      <h3 ref={topRef}>
        Student/<span>Admission Form</span>
      </h3>
      <div className="admission-form">
        <h2>ADMISSION FORM</h2>
        <form onSubmit={handleSubmit} style={widthundred}>
          <div className="form-group1">
            <label>Form Number</label>
            <input
              type="text"
              name="formNo"
              value={formData.formNo}
              readOnly
              required
            />
          </div>
          <div className="form-group1">
            <label>Date of Issue</label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Class</label>
            <select
              name="selectedClass"
              value={formData.selectedClass}
              onChange={handleChange}
              className="form-dropdown"
              required
            >
              <option value="">Select Class...</option>
              {classOptions.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group1">
            <label>Section</label>
            <select
              name="selectedSection"
              value={formData.selectedSection}
              onChange={handleChange}
              className="form-dropdown"
              required
            >
              <option value="">Select Section...</option>
              {sectionOptions.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group1">
            <label>Admission Number</label>
            <input
              type="text"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              placeholder="Enter admission number"
              required
            />
          </div>
          <div className="form-group1">
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Enter surname"
              required
            />
          </div>
          <div className="form-group1">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group1 flex">
            <label>Gender</label>
            <div className="form-check-inline flex">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check-inline flex">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
          <div className="form-group1">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Aadhar Card Number</label>
            <input
              type="text"
              name="aadharCardNo"
              value={formData.aadharCardNo}
              onChange={handleChange}
              maxLength={14}
              placeholder="xxxx-xxxx-xxxx"
              required
            />
          </div>
          <div className="form-group1">
            <label>Father's Name</label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              placeholder="Enter father's name"
              required
            />
          </div>
          <div className="form-group1">
            <label>Father's Occupation</label>
            <input
              type="text"
              name="fathersOccupation"
              value={formData.fathersOccupation}
              onChange={handleChange}
              placeholder="Enter father's occupation"
              required
            />
          </div>
          <div className="form-group1">
            <label>Father's Mobile Number</label>
            <input
              type="text"
              name="fathersMobileNumber"
              value={formData.fathersMobileNumber}
              onChange={handleChange}
              placeholder="Enter father's mobile number"
              required
            />
          </div>
          <div className="form-group1">
            <label>Father's Aadhar Card Number</label>
            <input
              type="text"
              name="fathersAadharCardNo"
              value={formData.fathersAadharCardNo}
              onChange={handleChange}
              maxLength={14}
              placeholder="xxxx-xxxx-xxxx"
              required
            />
          </div>
          <div className="form-group1">
            <label>Mother's Surname</label>
            <input
              type="text"
              name="mothersSurname"
              value={formData.mothersSurname}
              onChange={handleChange}
              placeholder="Enter mother's surname"
              required
            />
          </div>
          <div className="form-group1">
            <label>Mother's Name</label>
            <input
              type="text"
              name="mothersName"
              value={formData.mothersName}
              onChange={handleChange}
              placeholder="Enter mother's name"
              required
            />
          </div>
          <div className="form-group1">
            <label>Mother's Occupation</label>
            <input
              type="text"
              name="mothersOccupation"
              value={formData.mothersOccupation}
              onChange={handleChange}
              placeholder="Enter mother's occupation"
              required
            />
          </div>
          <div className="form-group1">
            <label>Mother's Mobile Number</label>
            <input
              type="text"
              name="mothersMobileNumber"
              value={formData.mothersMobileNumber}
              onChange={handleChange}
              placeholder="Enter mother's mobile number"
              required
            />
          </div>
          <div className="form-group1">
            <label>Mother's Aadhar Card Number</label>
            <input
              type="text"
              name="mothersAadharCardNo"
              value={formData.mothersAadharCardNo}
              onChange={handleChange}
              maxLength={14}
              placeholder="xxxx-xxxx-xxxx"
              required
            />
          </div>
          <div className="form-group1">
            <label>Guardian Name</label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              placeholder="Enter guardian name"
              required
            />
          </div>
          <div className="form-group1">
            <label>Guardian Mobile Number</label>
            <input
              type="text"
              name="guardianMobileNumber"
              value={formData.guardianMobileNumber}
              onChange={handleChange}
              placeholder="Enter guardian mobile number"
              required
            />
          </div>
          <div className="form-group1">
            <label>Caste</label>
            <input
              type="text"
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              placeholder="Enter caste"
              required
            />
          </div>
          <div className="form-group1">
            <label>Mother Tongue</label>
            <input
              type="text"
              name="motherTongue"
              value={formData.motherTongue}
              onChange={handleChange}
              placeholder="Enter mother tongue"
              required
            />
          </div>
          <div className="form-group1">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </div>
          <div className="form-group1">
            <label>Religion</label>
            <select
              name="religion"
              className="form-dropdown"
              value={formData.religion}
              onChange={handleChange}
              required
            >
              <option value="">Select Religion...</option>
              {religionOptions.map((religion, index) => (
                <option key={index} value={religion}>
                  {religion}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group1">
            <label>Last School Name</label>
            <input
              type="text"
              name="lastSchoolName"
              value={formData.lastSchoolName}
              onChange={handleChange}
              placeholder="Enter last school name"
              required
            />
          </div>
          <div className="form-group1">
            <label>Residential Address</label>
            <input
              type="text"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={handleChange}
              placeholder="Enter residential address"
              required
            />
          </div>
          <div className="form-group1">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="form-group1">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>
          <div className="form-group1">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              required
            />
          </div>
          <div className="form-group1">
            <label>Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              placeholder="Enter blood group"
              required
            />
          </div>
          <div className="form-group1">
            <label>Identification Marks</label>
            <input
              type="text"
              name="identificationMarks"
              value={formData.identificationMarks}
              onChange={handleChange}
              placeholder="Enter identification marks"
              required
            />
          </div>
          <div className="form-group1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group1">
            <label>Photo</label>
            <input type="file" name="photo" onChange={handleChange} required />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "550px",
            }}
          >
            <button type="submit" style={{ width: "100px" }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdmissionForm;
