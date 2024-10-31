import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdmissionFormCSS.css";
import api from "../../../../api";
import { storage } from "../../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../../Header/logo.jpg";

const AdmissionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.studentData || null;
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
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
    academicYear: `${currentYear}-${nextYear}`,
    bloodGroup: "",
    identificationMarks: "",
    email: "",
    selectedClass: "",
    selectedSection: "",
    gender: "",
    guardianName: "",
    guardianMobileNumber: "",
    admissionNumber: "",
    recordSheetOrTcNumber: "",
    enclosures: {
      tcRcStudyCertificate: false,
      aadhar: false,
      mothersBankPassbook: false,
      rationCard: false,
      birthCertificate: false,
      casteCertificate: false,
      progressReport: false,
    },
    //new data
    permanentEducationNumber: "",
    rationCardNumber: "",
    previousClassPercentage: "",
    previousSchoolRecordSheetNumber: "",
    scholarshipDetails: "",
  };
  const [formData, setFormData] = useState(studentData || initialFormData);
  const [imagePreview, setImagePreview] = useState(studentData?.photo || null);
  const [submittedData, setSubmittedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const categoryOptions = [
    "BC-A",
    "BC-B",
    "BC-C",
    "BC-D",
    "BC-E",
    "EWS",
    "OC",
    "SC",
    "ST",
  ];
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      enclosures: {
        ...prevData.enclosures,
        [name]: checked,
      },
    }));
  };

  // Function to handle changes in identification marks textarea
  const handleIdentificationMarksChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      identificationMarks: value,
    }));
  };

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

  const fetchAddressData = async (pincode) => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      // Check if the request was successful
      if (data && data[0] && data[0].Status === "Success") {
        const postOffices = data[0].PostOffice;

        // Assuming you want to access data from the first post office in the array
        if (postOffices.length > 0) {
          const firstPostOffice = postOffices[0];
          const state = firstPostOffice.State;
          const city = firstPostOffice.Name;

          // Update formData with city and state
          setFormData((prevData) => ({
            ...prevData,
            city: city,
            state: state,
          }));
        } else {
          console.log("No post office data found for this pincode.");
          // Handle case where no post office data is found
        }
      } else {
        console.log("No data found for this pincode.");
        // Handle case where no data is found for the pincode
      }
    } catch (error) {
      console.error("Error fetching address data: ", error);
      // Handle error state in UI
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handling pincode field
    if (name === "pincode") {
      // Limit pincode to 6 digits
      if (value.length > 6) {
        return;
      }
      // Fetch address data when pincode reaches 6 digits
      if (value.length === 6) {
        fetchAddressData(value);
      }
    }

    // Function to format mobile number with a space after the fifth digit
    const formatMobileNumber = (number) => {
      const cleaned = number.replace(/\D/g, ""); // Remove non-digit characters
      if (cleaned.length <= 5) {
        return cleaned; // If 5 or fewer digits, return as is
      }
      const part1 = cleaned.slice(0, 5);
      const part2 = cleaned.slice(5, 10);
      return `${part1} ${part2}`; // Add space between 5th and 6th digits
    };

    // Check if the field is a mobile number field
    const isMobileNumberField = [
      "fathersMobileNumber",
      "mothersMobileNumber",
      "guardianMobileNumber",
    ].includes(name);

    // Validate and format the mobile number
    let formattedValue = value;
    if (isMobileNumberField) {
      formattedValue = formatMobileNumber(value);
      // Limit the mobile number field to 10 digits (excluding space)
      if (formattedValue.replace(/\D/g, "").length > 10) {
        return;
      }
    }

    // Check if the field is an Aadhar number field
    if (name.endsWith("AadharCardNo") || name === "aadharCardNo") {
      const formattedAadharNo = value
        .replace(/\D/g, "") // Remove non-digit characters
        .replace(/(\d{4})(?=\d)/g, "$1-"); // Add a hyphen after every 4 digits
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedAadharNo,
      }));
    } else {
      // Check if the field is a photo file input
      if (name === "photo" && type === "file") {
        const file = files[0];
        setFormData((prevData) => ({
          ...prevData,
          photo: file,
        }));
        setImagePreview(URL.createObjectURL(file));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]:
            type === "file"
              ? files[0]
              : [
                  "surname",
                  "mothersSurname",
                  "name",
                  "mothersName",
                  "fathersName",
                  "guardianName",
                ].includes(name)
              ? formattedValue.toUpperCase()
              : formattedValue,
          ...(name === "surname" && { mothersSurname: value.toUpperCase() }), // Update mothersSurname when surname changes
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const lowersurName = formData.surname.trim();
      const capitalizedFirstName = formData.name.trim();
      const lowerCaseName = `${lowersurName} ${capitalizedFirstName}`.trim();

      let imageUrl = formData.photo;

      // Check if a new image file is selected
      if (formData.photo && typeof formData.photo !== "string") {
        const image = formData.photo;
        const storageRef = ref(
          storage,
          `StudentPhotos/${formData.selectedClass}/${formData.selectedSection}/${image.name}`
        );

        // Upload image to Firebase Storage
        await uploadBytes(storageRef, image);

        // Get download URL for the uploaded image
        imageUrl = await getDownloadURL(storageRef);
      }

      // Update formData with the new image URL
      const updatedFormData = { ...formData, photo: imageUrl };

      // Prepare API URL for submitting form data
      const url = `admissionForms/${updatedFormData.selectedClass}/${updatedFormData.selectedSection}/${lowerCaseName}.json`;

      // Submit form data to API
      await api
        .put(url, updatedFormData)
        .then(() => {
          setSubmittedData(updatedFormData);
          window.alert("Form submitted successfully!");
          setIsModalOpen(true);
          setFormData(initialFormData); // Reset form data after successful submission
          document.getElementsByName("photo")[0].value = null;
          generateFormNumber();
        })
        .catch((err) => {
          console.error("Error submitting form: ", err);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleDownload = (selectedClass, academicYear) => async () => {
    const printSection = document.querySelector(".print-section");

    if (!printSection) return;

    const canvas = await html2canvas(printSection);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10; // you can adjust this value to set the margin-top

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save(`${selectedClass}_${academicYear}_Admission_Form.pdf`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setSubmittedData(null);
    generateFormNumber();
    setImagePreview(null);
    if (studentData) {
      try {
        const classParam = studentData.selectedClass;
        const sectionParam = studentData.selectedSection;
        const nameParam = `${studentData.surname} ${studentData.name}`;
        navigate("/Dashboard/StudentDetails", {
          state: { class: classParam, section: sectionParam, name: nameParam },
        });
      } catch (error) {
        console.error("Error updating form:", error);
      }
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
  const motherTongueOptions = [
    "English",
    "Hindi",
    "Marathi",
    "Gujarati",
    "Tamil",
    "Telugu",
    "Bengali",
    "Kannada",
    "Malayalam",
    "Punjabi",
  ];
  const widthundred = {
    width: "100%",
  };
  return (
    <>
      <h3 id="moveTop">
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
            <label>Date of Admission</label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label>Academic Year</label>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="Enter academic year"
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
              autoComplete="new-password"
            />
          </div>
          <div className="form-group1">
            <label>Permanent Education Number (PEN)</label>
            <input
              type="text"
              name="permanentEducationNumber"
              value={formData.permanentEducationNumber}
              placeholder="Enter Permanent Education Number"
              onChange={handleChange}
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
              className="uppercase"
              required
              autoComplete="new-password"
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
              className="uppercase"
              required
              autoComplete="new-password"
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
              autoComplete="new-password"
            />
          </div>
          <div className="form-group1">
            <label>Ration Card Number</label>
            <input
              type="text"
              name="rationCardNumber"
              value={formData.rationCardNumber}
              onChange={handleChange}
              placeholder="Enter Ration Card Number"
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
              className="uppercase"
              autoComplete="new-password"
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
              autoComplete="new-password"
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
              autoComplete="new-password"
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
              className="uppercase"
              autoComplete="new-password"
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
              className="uppercase"
              autoComplete="new-password"
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
              autoComplete="new-password"
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
              autoComplete="new-password"
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
              className="uppercase"
              autoComplete="new-password"
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
              autoComplete="new-password"
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
            />
          </div>
          <div className="form-group1">
            <label>Mother Tongue</label>
            <select
              name="motherTongue"
              className="form-dropdown"
              value={formData.motherTongue}
              onChange={handleChange}
            >
              <option value="">Select Mother Tongue...</option>
              {motherTongueOptions.map((tongue, index) => (
                <option key={index} value={tongue}>
                  {tongue}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group1">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              className="form-dropdown"
              onChange={handleChange}
            >
              <option value="" disabled>
                Select category
              </option>
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group1">
            <label>Religion</label>
            <select
              name="religion"
              className="form-dropdown"
              value={formData.religion}
              onChange={handleChange}
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
            <label>Whether the Student was in Receipt of Any Scholarship</label>
            <input
              type="text"
              name="scholarshipDetails"
              value={formData.scholarshipDetails}
              onChange={handleChange}
              placeholder="Enter Scholarship Details"
            />
          </div>
          {formData.selectedClass !== "Pre-K" && (
            <>
              <div className="form-group1">
                <label>Last School Name</label>
                <input
                  type="text"
                  name="lastSchoolName"
                  value={formData.lastSchoolName}
                  onChange={handleChange}
                  placeholder="Enter last school name"
                />
              </div>

              <div className="form-group1">
                <label>Previous Class Percentage of Marks</label>
                <input
                  type="text"
                  name="previousClassPercentage"
                  value={formData.previousClassPercentage}
                  onChange={handleChange}
                  placeholder="Enter Previous Class Percentage"
                />
              </div>
              <div className="form-group1">
                <label>
                  Record Sheet/Transfer Certificate Number of Previous School
                </label>
                <input
                  type="text"
                  name="recordSheetOrTcNumber"
                  value={formData.recordSheetOrTcNumber}
                  onChange={handleChange}
                  placeholder="Enter Record Sheet or TC Number"
                />
              </div>
            </>
          )}

          <div className="form-group1">
            <label>Residential Address</label>
            <input
              type="text"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={handleChange}
              placeholder="Enter residential address"
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
            />
          </div>
          <div className="form-group1">
            <label>
              Personal Marks of Identification (Enter each mark on a new line)
            </label>
            <textarea
              rows="2"
              value={formData.identificationMarks}
              onChange={handleIdentificationMarksChange}
              placeholder="Enter identification marks"
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
              autoComplete="new-password"
            />
          </div>
          <div className="form-group1">
            <label>Photo</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt=""
                  style={{
                    marginLeft: "10px",
                    maxWidth: "100px",
                    maxHeight: "100px",
                    border: "2px solid #ad8dfc",
                    borderRadius: "5px",
                  }}
                />
              )}
            </div>
          </div>
          <div className="form-group1">
            <label>Enclosers:</label>
            <div className="checkbox-group">
              <div className="checkbox-items">
                <div>
                  <label>T.C. / R.C. / Study Certificate</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="tcRcStudyCertificate"
                    checked={formData.enclosures.tcRcStudyCertificate}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="checkbox-items">
                <div>
                  <label>Aadhar (Student, Mother, Father)</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="aadhar"
                    checked={formData.enclosures.aadhar}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="checkbox-items">
                <div>
                  <label>Mother's Bank Passbook</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="mothersBankPassbook"
                    checked={formData.enclosures.mothersBankPassbook}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="checkbox-items">
                <div>
                  <label>Ration Card</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="rationCard"
                    checked={formData.enclosures.rationCard}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="checkbox-items">
                <div>
                  <label>Birth Certificate</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="birthCertificate"
                    checked={formData.enclosures.birthCertificate}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="checkbox-items">
                <div>
                  <label>Caste Certificate</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="casteCertificate"
                    checked={formData.enclosures.casteCertificate}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="checkbox-items">
                <div>
                  <label>Progress Report (Previous)</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="progressReport"
                    checked={formData.enclosures.progressReport}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "550px",
            }}
          >
            <button
              type="submit"
              style={{ width: "110px" }}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        {submittedData && (
          <div
            className={`modals ${isModalOpen ? "show" : ""}`}
            style={{ display: isModalOpen ? "block" : "none" }}
          >
            <div
              className="modal-contents"
              style={{ overflow: "auto", cursor: "grab" }}
            >
              <div ref={printRef} className="print-section">
                <div className="printTop">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="School Logo" className="school-logo" />
                  </div>
                  <div>
                    <div
                      className="school-info2"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p className="p1">
                        St. JOHN'S ENGLISH MEDIUM HIGH SCHOOL
                      </p>
                      <p className="p2">
                        Recognised by the Govt. of Andhra Pradesh
                      </p>
                      <p className="p3">
                        Badvel Road, Mydukur - 516172, YSR Dist. A.P. INDIA
                      </p>
                      <p className="AFA">APPLICATION FOR ADMISSION</p>
                    </div>
                  </div>
                  <div className="studentPhoto">
                    <img
                      src={imagePreview}
                      alt="Student"
                      className="student-photo"
                      style={{
                        width: "100px",
                        height: "110px",
                        border: "2px solid #87CEEB",
                      }}
                    />
                  </div>
                </div>
                <div className="admission-details">
                  <div>
                  <div className="formCorrect">
                    <p>
                      <strong>Form No:</strong> {submittedData.formNo}
                    </p>
                    <p>
                      <strong>Date of Issue:</strong>{" "}
                      {submittedData.dateOfIssue}
                    </p>
                    <p>
                      <strong>Admission Number:</strong>{" "}
                      {submittedData.admissionNumber}
                    </p>
                  </div>
                  <p>
                      <strong>Permanent Education Number:</strong>{" "}
                      {submittedData.permanentEducationNumber}
                    </p>
                    <div className="formCorrect">
                  <p>
                    <strong>Student Name:</strong>
                    {submittedData.surname}&nbsp;&nbsp;{submittedData.name}
                  </p>
                  <p>
                    <strong>Gender:</strong> {submittedData.gender}
                  </p></div>
                  <div className="formCorrect">
                  <p>
                    <strong>Date of Birth:</strong> {submittedData.dob}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {submittedData.bloodGroup}
                  </p></div>
                  <div className="formCorrect">
                    <p>
                      <strong>Class:</strong> {submittedData.selectedClass}
                    </p>
                    <p>
                      <strong>Section:</strong> {submittedData.selectedSection}
                    </p>
                  </div>
                  <div className="formCorrect">
                  <p>
                    <strong>Aadhar Card No:</strong>{" "}
                    {submittedData.aadharCardNo}
                  </p>
                  <p>
                      <strong>Ration Card No:</strong>{" "}
                      {submittedData.rationCardNumber}
                    </p>
                    </div>
                  <div className="formCorrect">
                    <p>
                      <strong>Fathers Name:</strong>
                      {submittedData.surname}&nbsp;&nbsp;
                      {submittedData.fathersName}
                    </p>
                    <p>
                      <strong>Occupation:</strong>{" "}
                      {submittedData.fathersOccupation}
                    </p>
                  </div>
                  <div className="formCorrect">
                    <p>
                      <strong>Mobile Number:</strong>{" "}
                      {submittedData.fathersMobileNumber}
                    </p>
                    <p>
                      <strong>Aadhar Card No:</strong>{" "}
                      {submittedData.fathersAadharCardNo}
                    </p>
                  </div>
                  <div className="formCorrect">
                    <p>
                      <strong>Mothers Name:</strong>
                      {submittedData.mothersSurname}&nbsp;&nbsp;
                      {submittedData.mothersName}
                    </p>
                    <p>
                      <strong>Occupation:</strong>{" "}
                      {submittedData.mothersOccupation}
                    </p>
                  </div>
                  <div className="formCorrect">
                    <p>
                      <strong>Mobile Number:</strong>{" "}
                      {submittedData.mothersMobileNumber}
                    </p>
                    <p>
                      <strong>Aadhar Card No:</strong>{" "}
                      {submittedData.mothersAadharCardNo}
                    </p>
                  </div>
                  <div className="formCorrect">
                    <p>
                      <strong>Guardian Name:</strong>{" "}
                      {submittedData.guardianName}
                    </p>
                    <p>
                      <strong>Mobile Number:</strong>{" "}
                      {submittedData.guardianMobileNumber}
                    </p>
                  </div>
                  <div className="formCorrect">
                  <p>
                    <strong>Caste:</strong> {submittedData.caste}
                  </p>
                  <p>
                    <strong>Category:</strong> {submittedData.category}
                  </p>
                  </div>
                  <div className="formCorrect">
                  <p>
                    <strong>Religion:</strong> {submittedData.religion}
                  </p>
                  <p>
                    <strong>Mother Tongue:</strong> {submittedData.motherTongue}
                  </p>
                  </div>
                  <p>
                    <strong>Scholarship Details:</strong>{" "}
                    {submittedData.scholarshipDetails}
                  </p>
                  <p>
                    <strong>Last School Name:</strong>{" "}
                    {submittedData.lastSchoolName}
                  </p>
                  <div className="formCorrect">
                  <p>
                    <strong>Previous Class Percentage:</strong>{" "}
                    {submittedData.previousClassPercentage}
                  </p>
                  <p>
                    <strong>Previous School Record Sheet Number:</strong>{" "}
                    {submittedData.previousSchoolRecordSheetNumber}
                  </p>
                  </div>
                  <p>
                    <strong>Address:</strong> {submittedData.residentialAddress}
                    ,{submittedData.city},{submittedData.state}-
                    {submittedData.pincode}
                  </p>
                  <p>
                    <strong>Identification Marks:</strong>{" "}
                    {submittedData.identificationMarks}
                  </p>
                  <p>
                    <strong>Email:</strong> {submittedData.email}
                  </p>
                  <h4>Enclosures:</h4>
                  <ul>
                  <div className="formCorrect"> 
                    <li>
                      TC/RC/Study Certificate:{" "}
                      {submittedData.enclosures.tcRcStudyCertificate
                        ? "Yes"
                        : "No"}
                    </li>
                    <li>
                      Aadhar: {submittedData.enclosures.aadhar ? "Yes" : "No"}
                    </li>
                    </div>
                    <div className="formCorrect">
                    <li>
                      Mother's Bank Passbook:{" "}
                      {submittedData.enclosures.mothersBankPassbook
                        ? "Yes"
                        : "No"}
                    </li>
                    <li>
                      Ration Card:{" "}
                      {submittedData.enclosures.rationCard ? "Yes" : "No"}
                    </li></div>
                    <div className="formCorrect">
                    <li>
                      Birth Certificate:{" "}
                      {submittedData.enclosures.birthCertificate ? "Yes" : "No"}
                    </li>
                    <li>
                      Caste Certificate:{" "}
                      {submittedData.enclosures.casteCertificate ? "Yes" : "No"}
                    </li>
                    </div>
                    <li>
                      Progress Report:{" "}
                      {submittedData.enclosures.progressReport ? "Yes" : "No"}
                    </li>
                  </ul>
                  </div>
                  <div className="sign">
                    <li>SIGNATURE OF THE PARENT</li>
                    <li>SIGNATURE OF THE STUDENT</li>
                    <li>SIGNATURE OF THE H.M.</li>
                  </div>
                </div>
              </div>
              <div className="print-buttons">
                <button onClick={handlePrint} className="print-btn">
                  Print
                </button>
                <button
                  onClick={handleDownload(
                    submittedData.selectedClass,
                    submittedData.academicYear
                  )}
                  className="download-btn"
                >
                  Download as PDF
                </button>
                <button onClick={handleCancel}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdmissionForm;
