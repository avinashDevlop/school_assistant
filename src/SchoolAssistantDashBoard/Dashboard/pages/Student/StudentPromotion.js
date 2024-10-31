import React, { useState, useEffect } from "react";
import api from "../../../../api.js";
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
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const response = await api.get(`admissionForms/${value}.json`);
        const sections = response.data ? Object.keys(response.data) : [];
        setSectionOptions(sections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching sections
      }
    }

    if (name === "studentName" && value !== "") {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false); // Set loading to false after fetching student names
      }
    }
  };

  useEffect(() => {
    if (formData.currentClass && formData.currentSection) {
      setLoading(true);
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
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching student names
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
      setLoading(true);
      const response = await api.get(
        `admissionForms/${formData.currentClass}/${formData.currentSection}/${selectedStudent}.json`
      );
      const studentInfo = response.data;

      if (!studentInfo) {
        setLoading(false);
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
      alert(
        "student data is not present in some class. Please try again later."
      );
    } finally {
      setLoading(false); // Set loading to false after fetching sections
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
      setLoading(true);
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, Email, password);
      const user = auth.currentUser;

      setShowModal(false);

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

          const sections = ["Section A", "Section B", "Section C"];

          // Helper function to fetch data for all sections of a class
          const fetchClassSections = async (className) => {
            const fetchSection = (section) =>
              api
                .get(`admissionForms/${className}/${section}.json`)
                .then((res) => res.data || {})
                .catch(() => ({}));

            const [sectionA, sectionB, sectionC] = await Promise.all(
              sections.map(fetchSection)
            );

            return { sectionA, sectionB, sectionC };
          };

          // Helper function to update class sections
          const updateSections = async (
            className,
            sectionData,
            batch = false
          ) => {
            const batchPrefix = batch ? `@${currentYear}Batch/` : "";

            const promises = sections.map((section, i) => {
              const data = sectionData[i];
              if (Object.keys(data).length === 0) {
                console.log(`No ${section} in class ${className}`);
                return Promise.resolve();
              }
              return api
                .put(
                  `admissionForms/${className}/${batchPrefix}${section}.json`,
                  data
                )
                .catch((error) => {
                  console.error(
                    `Error updating ${section} for ${className}:`,
                    error
                  );
                });
            });

            await Promise.all(promises);
          };

          // Loop through classes and process sections
          for (let i = 0; i < classUpdate.length - 1; i++) {
            const currentClass = classUpdate[i + 1];
            const previousClass = classUpdate[i];

            // Fetch all section data
            const { sectionA, sectionB, sectionC } = await fetchClassSections(
              currentClass
            );

            // Delete old data from the current class
            for (const section of sections) {
              const students = await api.get(
                `admissionForms/${currentClass}/${section}.json`
              );
              if (students.data) {
                const deletePromises = Object.keys(students.data).map(
                  (student) =>
                    api.delete(
                      `admissionForms/${currentClass}/${section}/${student}.json`
                    )
                );
                await Promise.all(deletePromises);
              }
            }

            // Promote students to the next class or batch
            if (previousClass === "previousYearStudents") {
              await updateSections(
                previousClass,
                [sectionA, sectionB, sectionC],
                true
              );
            } else {
              await updateSections(previousClass, [
                sectionA,
                sectionB,
                sectionC,
              ]);
            }
          }

          //promoting the student attendence.....
          async function promoteStudents() {
            try {
              const classes = [
                "Pre-K",
                "LKG",
                "UKG",
                "1st Class",
                "2nd Class",
                "3rd Class",
                "4th Class",
                "5th Class",
                "6th Class",
                "7th Class",
                "8th Class",
                "9th Class",
                "10th Class",
              ];

              const sections = ["Section A", "Section B", "Section C"];

              // Loop through each class to promote students
              for (let i = 0; i < classes.length - 1; i++) {
                let currentClass = classes[i];
                let nextClass = classes[i + 1];

                // Fetch current class data
                let currentClassResponse = await api.get(
                  `/Attendance/StudAttendance/${currentClass}.json`
                );
                let currentClassData = currentClassResponse.data;

                // Ensure currentClassData is defined before proceeding
                if (currentClassData) {
                  // Filter only sections A, B, and C
                  let filteredData = Object.fromEntries(
                    Object.entries(currentClassData).filter(([section]) =>
                      sections.includes(section)
                    )
                  );

                  // Promote students to the next class if there's data to promote
                  if (Object.keys(filteredData).length > 0) {
                    await api.put(
                      `/Attendance/StudAttendance/${nextClass}/@${currentClass}.json`,
                      filteredData
                    );
                  }

                  // Promote students from previous classes
                  for (let j = 0; j < i; j++) {
                    let incrementClass = classes[j];
                    let previousClassResponse = await api.get(
                      `/Attendance/StudAttendance/${currentClass}/@${incrementClass}.json`
                    );
                    let previousClassData = previousClassResponse.data;

                    if (previousClassData) {
                      await api.put(
                        `/Attendance/StudAttendance/${nextClass}/@${incrementClass}.json`,
                        previousClassData
                      );
                    }
                  }

                  // Delete the filtered sections from the current class
                  for (const section of sections) {
                    if (currentClassData[section]) {
                      await api.delete(
                        `/Attendance/StudAttendance/${currentClass}/${section}.json`
                      );
                    }
                  }
                }
              }

              // Special case for 10th Class promotion
              let tenthClassResponse = await api.get(
                `/Attendance/StudAttendance/10th Class.json`
              );
              let tenthClassData = tenthClassResponse.data;

              if (tenthClassData) {
                // Filter only sections A, B, and C
                let tenthfilteredData = Object.fromEntries(
                  Object.entries(tenthClassData).filter(([section]) =>
                    sections.includes(section)
                  )
                );

                if (tenthfilteredData) {
                  let currentYear = new Date().getFullYear();

                  // Archive 10th class data under previousYearStudents
                  await api.put(
                    `/Attendance/previousYearStudents/@${currentYear}Batch/@10th Class.json`,
                    tenthfilteredData
                  );

                  for (const section of sections) {
                    if (tenthfilteredData[section]) {
                      await api.delete(
                        `/Attendance/StudAttendance/10th Class/${section}.json`
                      );
                    }
                  }
                }
              }

              //for all the @classes in 10th class
              for (let k = 0; k < 12; k++) {
                let incrementclass = classes[k];
                let previousClassResponse = await api.get(
                  `/Attendance/StudAttendance/10th Class/@${incrementclass}.json`
                );
                let previousClassData = previousClassResponse.data;

                if (previousClassData) {
                  await api.put(
                    `/Attendance/previousYearStudents/@${currentYear}Batch/@${incrementclass}.json`,
                    previousClassData
                  );
                }
              }

              console.log("Student promotion completed.");
            } catch (error) {
              console.error("Error during promotion:", error);
            }
          }
          // Call the function to promote students
          promoteStudents();

          //promoting the exam schedule..
          async function storeExamSchedules() {
            try {
              const classes = [
                "Pre-K",
                "LKG",
                "UKG",
                "1st Class",
                "2nd Class",
                "3rd Class",
                "4th Class",
                "5th Class",
                "6th Class",
                "7th Class",
                "8th Class",
                "9th Class",
                "10th Class",
              ];

              const testNames = [
                "Class Test",
                "FORMATIVE ASSESSMENT - I",
                "FORMATIVE ASSESSMENT - II",
                "SUMMATIVE ASSESSMENT - I",
                "FORMATIVE ASSESSMENT - III",
                "FORMATIVE ASSESSMENT - IV",
                "SUMMATIVE ASSESSMENT - II",
                "SUMMATIVE ASSESSMENT - III",
              ];

              // Loop through each class to promote students
              for (let i = 0; i < classes.length - 1; i++) {
                let currentClass = classes[i];
                let nextClass = classes[i + 1];

                // Fetch current class data
                let currentClassResponse = await api.get(
                  `/ExamSchedule/${currentClass}.json`
                );
                let currentClassData = currentClassResponse.data;

                let filteredData = {};
                if (currentClassData) {
                  testNames.forEach((test) => {
                    if (currentClassData[test]) {
                      filteredData[test] = currentClassData[test];
                    }
                  });
                }

                if (filteredData) {
                  await api.put(
                    `/ExamSchedule/${nextClass}/@${currentClass}.json`,
                    filteredData
                  );
                }

                // Promote students from previous classes
                for (let j = 0; j < i; j++) {
                  let incrementClass = classes[j];
                  let previousClassResponse = await api.get(
                    `/ExamSchedule/${currentClass}/@${incrementClass}.json`
                  );
                  let previousClassData = previousClassResponse.data;

                  if (previousClassData) {
                    await api.put(
                      `/ExamSchedule/${nextClass}/@${incrementClass}.json`,
                      previousClassData
                    );
                  }
                }
                // Delete the filtered sections from the current class

                for (const testName of testNames) {
                  if (currentClassData[testName]) {
                    try {
                      await api.delete(`/ExamSchedule/${currentClass}/${testName}.json`);
                      console.log(`Deleted: ${testName}`);
                    } catch (error) {
                      console.error(`Error deleting ${testName}:`, error);
                    }
                  }
                }
                
              }

              // Special case for 10th Class promotion
              let tenthClassResponse = await api.get(
                `/ExamSchedule/10th Class.json`
              );
              let tenthClassData = tenthClassResponse.data;
              // Filter only tests present in 10th class for pervious year students
              let tenthfilteredData = {};
              testNames.forEach((test) => {
                if (tenthClassData[test]) {
                  tenthfilteredData[test] = tenthClassData[test];
                }
              });

              if (tenthfilteredData) {
                let currentYear = new Date().getFullYear();

                // Archive 10th class data under previousYearStudents
                await api.put(
                  `/ExamSchedule/previousYearStudents/@${currentYear}Batch/@10th Class.json`,
                  tenthfilteredData
                );

                for (const testName of testNames) {
                  if (tenthfilteredData[testName]) {
                    await api.delete(
                      `/ExamSchedule/10th Class/${testName}.json`
                    );
                  }
                }
              }

              //for all the @classes in 10th class
              for (let k = 0; k < 12; k++) {
                let incrementclass = classes[k];
                let previousClassResponse = await api.get(
                  `/ExamSchedule/10th Class/@${incrementclass}.json`
                );
                let previousClassData = previousClassResponse.data;

                if (previousClassData) {
                  await api.put(
                    `/ExamSchedule/previousYearStudents/@${currentYear}Batch/@${incrementclass}.json`,
                    previousClassData
                  );
                }
              }
              console.log("Student exam schedules are stored .");
            } catch (error) {
              console.error("Error during store the examSchedule:", error);
            }
          }
          storeExamSchedules();

          //store the exam marks for feature view
          async function storeExamMarks() {
            try {
              const classes = [
                "Pre-K",
                "LKG",
                "UKG",
                "1st Class",
                "2nd Class",
                "3rd Class",
                "4th Class",
                "5th Class",
                "6th Class",
                "7th Class",
                "8th Class",
                "9th Class",
                "10th Class",
              ];

              const sections = ["Section A", "Section B", "Section C"];

              // Loop through each class to promote students
              for (let i = 0; i < classes.length - 1; i++) {
                let currentClass = classes[i];
                let nextClass = classes[i + 1];
                // Fetch current class data
                let currentClassResponse = await api.get(
                  `/ExamMarks/${currentClass}.json` 
                );
                let currentClassData = currentClassResponse.data;

                // Ensure currentClassData is defined before proceeding
                if (currentClassData) {
                  // Filter only sections A, B, and C
                  let filteredData = Object.fromEntries(
                    Object.entries(currentClassData).filter(([section]) =>
                      sections.includes(section)
                    )
                  );

                  // Promote students to the next class if there's data to promote
                  if (Object.keys(filteredData).length > 0) {
                    await api.put(
                      `/ExamMarks/${nextClass}/@${currentClass}.json`,
                      filteredData
                    );
                  }

                  // Promote students from previous classes
                  for (let j = 0; j < i; j++) {
                    let incrementClass = classes[j];
                    let previousClassResponse = await api.get(
                      `/ExamMarks/${currentClass}/@${incrementClass}.json`
                    );
                    let previousClassData = previousClassResponse.data;

                    if (previousClassData) {
                      await api.put(
                        `/ExamMarks/${nextClass}/@${incrementClass}.json`,
                        previousClassData
                      );
                    }
                  }

                  // Delete the filtered sections from the current class
                  for (const section of sections) {
                    if (currentClassData[section]) {
                      await api.delete(
                        `/ExamMarks/${currentClass}/${section}.json`
                      );
                    }
                  }
                }
              }

              // Special case for 10th Class promotion
              let tenthClassResponse = await api.get(
                `/ExamMarks/10th Class.json`
              );
              let tenthClassData = tenthClassResponse.data;

              if (tenthClassData) {
                // Filter only sections A, B, and C
                let tenthfilteredData = Object.fromEntries(
                  Object.entries(tenthClassData).filter(([section]) =>
                    sections.includes(section)
                  )
                );

                if (tenthfilteredData) {
                  let currentYear = new Date().getFullYear();

                  // Archive 10th class data under previousYearStudents
                  await api.put(
                    `/ExamMarks/previousYearStudents/@${currentYear}Batch/@10th Class.json`,
                    tenthfilteredData
                  );

                  for (const section of sections) {
                    if (tenthfilteredData[section]) {
                      await api.delete(
                        `/ExamMarks/10th Class/${section}.json`
                      );
                    }
                  }
                }
              }

              //for all the @classes in 10th class
              for (let k = 0; k < 12; k++) {
                let incrementclass = classes[k];
                let previousClassResponse = await api.get(
                  `/ExamMarks/10th Class/@${incrementclass}.json`
                );
                let previousClassData = previousClassResponse.data;

                if (previousClassData) {
                  await api.put(
                    `/ExamMarks/previousYearStudents/@${currentYear}Batch/@${incrementclass}.json`,
                    previousClassData
                  );
                }
              }

              console.log("Student promotion completed.");
            } catch (error) {
              console.error("Error during promotion:", error);
            }
          }
          storeExamMarks()

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>
        Student/<span>Student Promotion</span>
      </h3>
      <div className="promotion-form">
        <h2>Student Promotion Form</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
          <button type="submit">{loading ? "Submitting..." : "Submit"}</button>
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
