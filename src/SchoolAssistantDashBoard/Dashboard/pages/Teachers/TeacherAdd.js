import React, { useState } from "react";
import api from "../../../../api"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";

const AddTeacherAndEducationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
    dob: "",
    university: "",
    skills: "",
    aboutTeacher: "",
    subjects: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9.]/g, "_");
  };

  const sanitizePath = (path) => {
    return path.replace(/[^a-zA-Z0-9-]/g, "_");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let photoURL = "";
      if (formData.photo) {
        const sanitizedPhotoName = sanitizeFileName(formData.photo.name);
        const photoRef = ref(storage, `teachers/${sanitizedPhotoName}`);

        // Check if the photo already exists in the database
        const response = await api.get(
          `Teachers/${sanitizePath(
            sanitizedPhotoName
          )}.json`
        );
        if (response.data) {
          alert(
            "Photo name already exists in the database, please change the file name"
          );
          setUploading(false);
          return;
        }

        // Upload photo to Firebase Storage
        await uploadBytes(photoRef, formData.photo);

        // Retrieve download URL after successful upload
        photoURL = await getDownloadURL(photoRef);
      }

      const newTeacher = {
        ...formData,
        photo: photoURL,
      };

      const sanitizedFullName = sanitizePath(newTeacher.fullName);

      console.log("Data being sent to Firebase:", newTeacher);

      await api.put(
        `Teachers/${sanitizedFullName}.json`,
        newTeacher
      );

      alert("Teacher submitted successfully");

      // Clear the form fields
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        photo: null,
        dob: "",
        university: "",
        skills: "",
        aboutTeacher: "",
        subjects: "",
      });

      // Reset the file input
      document.getElementById("photo").value = null;
    } catch (error) {
      console.error(
        "Error uploading data:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error uploading data: " +
          JSON.stringify(error.response ? error.response.data : error.message)
      );
    }

    setUploading(false);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <style>
        {`
          .section-title {
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
            overflow: hidden;
            color: rgb(28, 28, 75);
            position: relative;
          }

          .section-title::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #3498db;
            transform-origin: bottom right;
            transform: scale(0, 1);
            transition: transform 0.3s ease-out;
          }

          .section-title:hover::before {
            transform-origin: bottom left;
            transform: scale(1, 1);
          }

          .forms-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            width: 100%;
            padding: 2% 3% 0 10%;
            background-color: #e4e4ff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .add-teacher-form,
          .education-form {
            margin-bottom: 20px;
            margin:30px 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
            width: 90%;
          }

          label {
            display: block;
            margin-bottom: 10px;
          }

          input,
          textarea {
            width: 100%;
            padding: 8px;
            margin-top: 4px;
            margin-bottom: 10px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .submit-button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 0 30%;
          }

          .submit-button:hover {
            background-color: #45a049;
          }
        `}
      </style>
      <h3>
        Teachers/<span>Add Teachers</span>
      </h3>
      <div className="forms-container">
        <h1 className="section-title" title="Fill Form">
          Personal Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="add-teacher-form">
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
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
                placeholder="Enter email address"
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
                placeholder="Enter phone number"
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
                placeholder="Enter address"
                required
              />
            </label>

            <label>
              Photo:
              <input
                type="file"
                name="photo"
                id="photo"
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.files[0] })
                }
                accept="image/*"
                placeholder="Upload photo"
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                placeholder="Enter date of birth"
                required
              />
            </label>
          </div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h1
              className="section-title"
              title="Fill Form"
              style={{ width: "28%" }}
            >
              Education Details
            </h1>
          </div>
          <div className="education-form">
            <label>
              Education:
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                placeholder="Enter Education details"
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
                placeholder="Enter skills"
              />
            </label>

            <label>
              About Teacher:
              <textarea
                name="aboutTeacher"
                value={formData.aboutTeacher}
                onChange={handleInputChange}
                placeholder="Write about teacher"
              ></textarea>
            </label>

            <label>
              Subjects:
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                placeholder="Enter subjects taught"
              />
            </label>
          </div>
          <button type="submit" className="submit-button" disabled={uploading}>
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherAndEducationForm;