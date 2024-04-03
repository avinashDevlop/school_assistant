import React, { useState, useEffect } from "react";
import api from "../../../../api.js"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../../firebaseConfig.js";
import "./StudentPromotionFormCSS.css";

const StudentPromotionForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    contactNumber: "",
    emailAddress: "",
    currentClass: "",
    promotionClass: "",
    currentSection: "",
    promotionSection: "",
  });

  const [studentNames, setStudentNames] = useState([]);
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
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
  const [sectionOptions, setSectionOptions] = useState([]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "currentClass" && value !== "") {
      try {
        const response = await api.get(
          `admissionForms/${value}.json`
        );
        const sections = response.data ? Object.keys(response.data) : [];
        setSectionOptions(sections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    }

    if (name === "studentName" && value !== "") {
      try {
        const response = await api.get(
          `${formData.currentClass}/${formData.currentSection}/${value}.json`
        );
        const studentInfo = response.data;
        console.log("Student Info:", studentInfo);
        if (studentInfo) {
          setFormData((prevData) => ({
            ...prevData,
            dateOfBirth: studentInfo.dob || "",
          }));
        } else {
          console.log("Student information not found.");
        }
      } catch (error) {
        console.error("Error fetching student information:", error);
      }
    }
  };

  useEffect(() => {
    if (formData.currentClass && formData.currentSection) {
      api
        .get(
          `admissionForms/${formData.currentClass}/${formData.currentSection}.json`
        )
        .then((response) => {
          const names = response.data ? Object.keys(response.data) : [];
          setStudentNames(names);
        })
        .catch((error) => {
          console.error("Error fetching student names:", error);
        });
    }
  }, [formData.currentClass, formData.currentSection]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedStudent = studentNames.find(
      (name) => name === formData.studentName
    );
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }

    try {
      const response = await api.get(
        `admissionForms/${formData.currentClass}/${formData.currentSection}/${selectedStudent}.json`
      );
      const studentInfo = response.data;

      if (!studentInfo) {
        alert("Student information not found.");
        return;
      }

      const updatedStudentData = {
        ...studentInfo,
        currentClass: formData.promotionClass,
        currentSection: formData.promotionSection,
      };

      await api.put(
        `admissionForms/${formData.promotionClass}/${formData.promotionSection}/${formData.studentName}.json`,
        updatedStudentData
      );

      await api.delete(
        `admissionForms/${formData.currentClass}/${formData.currentSection}/${selectedStudent}.json`
      );

      alert("Student promotion successful.");
    } catch (error) {
      console.error("Error promoting student:", error);
      alert("student data is not present in some class. Please try again later.");
    }
  };

  const handlePromoteAll = async () => {
    setShowModal(true);
  };

  const handleLogin = async () => {
    if (!Email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, Email, password);
        const user = auth.currentUser;

        if (user) {
            console.log("Login successfully", user);
            alert("Login successful!");

            try {
                const currentYear = new Date().getFullYear();
                const classUpdate = [
                    "previousYearStudents",
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

                for (let i = 0; i < classUpdate.length - 1; i++) {
                    let studentSectionA = {};
                    let studentSectionB = {};
                    let studentSectionC = {};

                    try {
                        // Check if Section A exists for the class
                        const sectionAResponse = await api.get(
                            `admissionForms/${
                            classUpdate[i + 1]
                            }/Section%20A.json`
                        );

                        // If Section A exists, fetch its data
                        if (sectionAResponse.status === 200) {
                            const responseA = sectionAResponse.data;
                            console.log('Data for Section A:', responseA);
                            studentSectionA = responseA;
                        } else {
                            console.log(`Section A not found for ${classUpdate[i+1]}`);
                        }

                        // Check if Section B exists for the class
                        const sectionBResponse = await api.get(
                            `admissionForms/${
                            classUpdate[i + 1]
                            }/Section%20B.json`
                        );

                        // If Section B exists, fetch its data
                        if (sectionBResponse.status === 200) {
                            const responseB = sectionBResponse.data;
                            console.log('Data for Section B:', responseB);
                            studentSectionB = responseB;
                        } else {
                            console.log(`Section B not found for ${classUpdate[i+1]}`);
                        }

                        // Check if Section C exists for the class
                        const sectionCResponse = await api.get(
                            `admissionForms/${
                            classUpdate[i + 1]
                            }/Section%20C.json`
                        );

                        // If Section C exists, fetch its data
                        if (sectionCResponse.status === 200) {
                            const responseC = sectionCResponse.data;
                            console.log('Data for Section C:', responseC);
                            studentSectionC = responseC;
                        } else {
                            console.log(`Section C not found for ${classUpdate[i+1]}`);
                        }
                    } catch (error) {
                        console.error(`Error fetching data for ${classUpdate[i+1]}:`, error);
                    }
                   //delete
                    const sections = ["Section A", "Section B", "Section C"];
              
                      for (const section of sections) {
                          // Fetch all student names from the current section in the class
                          const response = await api.get(
                              `admissionForms/${classUpdate[i+1]}/${section}.json`
                          );
              
                          // Check if response.data is not undefined or null before using Object.keys()
                          if (response.data) {
                              const studentNames = Object.keys(response.data);
              
                              // Iterate over each student and delete them from the current section
                              for (const studentName of studentNames) {
                                  await api.delete(
                                      `admissionForms/${classUpdate[i+1]}/${section}/${studentName}.json`
                                  );
                              }
                          }
                      }

                    if (classUpdate[i] === "previousYearStudents") {
                        if (studentSectionA && typeof studentSectionA === 'object' && Object.keys(studentSectionA).length === 0) {
                            console.log(`No Section A in class ${classUpdate[i]}`);
                        } else {
                            await api
                                .put(
                                    `admissionForms/${classUpdate[i]}/@${currentYear}Batch/Section%20A.json`,
                                    studentSectionA
                                )
                                .catch((error) => {
                                    console.error(
                                        `Error updating Section A for ${classUpdate[i]}:`,
                                        error
                                    );
                                });
                        }
                        if (studentSectionB && typeof studentSectionB === 'object' && Object.keys(studentSectionB).length === 0) {
                            console.log(`No Section B in class ${classUpdate[i]}`);
                        } else {
                            await api
                                .put(
                                    `admissionForms/${classUpdate[i]}/@${currentYear}Batch/Section%20B.json`,
                                    studentSectionB
                                )
                                .catch((error) => {
                                    console.error(
                                        `Error updating Section B for ${classUpdate[i]}:`,
                                        error
                                    );
                                });
                        }
                        if (studentSectionC && typeof studentSectionC === 'object' && Object.keys(studentSectionC).length === 0) {
                            console.log(`No Section C in class ${classUpdate[i]}`);
                        } else {
                            await api
                                .put(
                                    `admissionForms/${classUpdate[i]}/@${currentYear}Batch/Section%20C.json`,
                                    studentSectionC
                                )
                                .catch((error) => {
                                    console.error(
                                        `Error updating Section C for ${classUpdate[i]}:`,
                                        error
                                    );
                                });
                        }
                    } else {
                        if (studentSectionA && typeof studentSectionA === 'object' && Object.keys(studentSectionA).length === 0) {
                            console.log(`No Section A in class ${classUpdate[i]}`);
                        } else {
                            await api
                                .put(
                                    `admissionForms/${classUpdate[i]}/Section%20A.json`,
                                    studentSectionA
                                )
                                .catch((error) => {
                                    console.log(
                                        `Error updating Section A for ${classUpdate[i]}:`
                                    );
                                });
                        }
                        if (studentSectionB && typeof studentSectionB === 'object' && Object.keys(studentSectionB).length === 0) {
                            console.log(`No Section B in class ${classUpdate[i]}`);
                        } else {
                            await api
                                .put(
                                    `admissionForms/${classUpdate[i]}/Section%20B.json`,
                                    studentSectionB
                                )
                                .catch((error) => {
                                    console.log(
                                        `Error updating Section B for ${classUpdate[i]}:`
                                    );
                                });
                        }
                        if (studentSectionC && typeof studentSectionC === 'object' && Object.keys(studentSectionC).length === 0) {
                            console.log(`No Section C in class ${classUpdate[i]}`);
                        } else {
                            await api
                                .put(
                                    `admissionForms/${classUpdate[i]}/Section%20C.json`,
                                    studentSectionC
                                )
                                .catch((error) => {
                                    console.log(
                                        `Error updating Section C for ${classUpdate[i]}:`
                                    );
                                });
                        }
                    }
                } 
                 
                setShowModal(false);

                alert("All students promoted successfully.");
            } catch (error) {
                console.error("Error promoting all students:", error);
                alert("Error promoting all students. Please try again later.");
            }
        } else {
            console.log("User not authenticated");
            alert("User not authenticated");
        }
    } catch (error) {
        console.error("Login failed:", error.message);
        alert("Login failed. Please try again.");
    }
};

  return (
    <>
      <h3>
        Student/<span>Student Promotion</span>
      </h3>
      <div className="promotion-form">
        <h2>Student Promotion Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Current Class:</label>
          <select
            name="currentClass"
            value={formData.currentClass}
            onChange={handleChange}
            className="droplist"
            required
          >
            <option value="">Select Current Class...</option>
            {classOptions.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>

          <label>Current Section:</label>
          <select
            name="currentSection"
            value={formData.currentSection}
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

          <label>Student Name:</label>
          <select
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="droplist"
            required
          >
            <option value="">Select Student Name...</option>
            {studentNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />

          <label>Promotion Class:</label>
          <select
            name="promotionClass"
            value={formData.promotionClass}
            onChange={handleChange}
            className="droplist"
            required
          >
            <option value="">Select Promotion Class...</option>
            {classOptions.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>

          <label>Promotion Section:</label>
          <select
            name="promotionSection"
            value={formData.promotionSection}
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
          <button type="submit">Submit</button>
        </form>
        <span className="or">or</span>
        <input
          type="submit"
          value="PROMOTE ALL CLASSES"
          className="promoteAll"
          onClick={handlePromoteAll}
        />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="mail">
              <h4 className="iframe">Enter Email and Password</h4>
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentPromotionForm;
