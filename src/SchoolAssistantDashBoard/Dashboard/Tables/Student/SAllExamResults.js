import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import api from "../../../../api";
import logo from "../../../../Header/logo.jpg";
import ReactApexChart from "react-apexcharts";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "../../pages/Student/AdmissionFormCSS.css";

const AllStudExamResults = () => {
  const printRef = useRef(null);

  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [testNames, setTestNames] = useState([]);
  const [selectedTestName, setSelectedTestName] = useState("");
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [studentResults, setStudentResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [chartData, setChartData] = useState({});
  const [imagePreview, setImagePreview] = useState(studentData?.photo || null);

  const [classOptions, setClassOptions] = useState([
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
  ]);

  const [newClassDropdown, setNewClassDropdown] = useState(false);
  const [selectedPreviousClass, setselectedPreviousClass] =
    useState("@10th Class");
  const [dataArray, setDataArray] = useState([]);
  const newBatchOptions = [
    "@10th Class",
    "@9th Class",
    "@8th Class",
    "@7th Class",
    "@6th Class",
    "@5th Class",
    "@4th Class",
    "@3rd Class",
    "@2nd Class",
    "@1st Class",
    "@UKG",
    "@LKG",
    "@Pre-K",
  ];

  const orderedSubjects = useMemo(
    () => [
      "Telugu",
      "Hindi",
      "English",
      "Mathematics",
      "Science",
      "Social",
      "Computer",
      "General Knowledge",
      "Drawing",
    ],
    []
  );

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await api.get(
          "admissionForms/previousYearStudents.json"
        );
        const data = response.data;
        if (data) {
          const fetchedClassOptions = Object.keys(data);
          setClassOptions((prevOptions) => [
            ...new Set([...prevOptions, ...fetchedClassOptions]),
          ]);
          setDataArray(fetchedClassOptions);
        }
      } catch (error) {
        console.error("Error fetching class options:", error);
      }
    };

    fetchClassOptions();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const endpoint = dataArray.includes(selectedClass)
          ? `/admissionForms/previousYearStudents/${selectedClass}.json`
          : `/admissionForms/${selectedClass}.json`;

        const response = await api.get(endpoint);

        const data = response.data;
        if (data) {
          const sections = Object.keys(data);
          setSections(sections);
          setSelectedSection(sections[0] || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSections();
  }, [selectedClass, dataArray]);

  useEffect(() => {
    const fetchTestNames = async () => {
      try {
        const endpoint = dataArray.includes(selectedClass)
          ? `/ExamMarks/previousYearStudents/${selectedClass}/${selectedPreviousClass}/${selectedSection}.json`
          : `/ExamMarks/${selectedClass}/${selectedSection}.json`;

        const response = await api.get(endpoint);
        const data = response.data || {};
        const testNames = Object.keys(data);
        setTestNames(testNames);
        setSelectedTestName(testNames[0] || "");
      } catch (error) {
        console.error("Error fetching test names:", error);
      }
    };
    if (selectedSection) {
      fetchTestNames();
    }
  }, [selectedClass, selectedSection, dataArray, selectedPreviousClass]);

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "D";
  };

  const handleView = useCallback(
    (data) => {
      setSubmittedData(data);

      const fetchStudentData = async () => {
        try {
          const endpoint = dataArray.includes(selectedClass)
            ? `/admissionForms/previousYearStudents/${selectedClass}/${selectedSection}/${data.Name}.json`
            : `/admissionForms/${selectedClass}/${selectedSection}/${data.Name}.json`;

          const response = await api.get(endpoint);
          const studentData = response.data;
          if (studentData) {
            setStudentData(studentData);
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };
      fetchStudentData();

      // Prepare chart data
      const subjects = orderedSubjects.filter((subject) =>
        Object.keys(data.progressCard.subjects).includes(subject)
      );
      const marks = subjects.map(
        (subject) => data.progressCard.subjects[subject] || 0
      );
      setChartData({
        series: [{ data: marks }],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              borderRadiusApplication: "end",
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: subjects,
          },
        },
      });

      setIsModalOpen(true);
    },[selectedClass, selectedSection, orderedSubjects,dataArray]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = dataArray.includes(selectedClass)
          ? `/ExamMarks/previousYearStudents/${selectedClass}/${selectedPreviousClass}/${selectedSection}/${selectedTestName}.json`
          : `/ExamMarks/${selectedClass}/${selectedSection}/${selectedTestName}.json`;

        const response = await api.get(endpoint);

        const conductedOnData = response.data?.conductedOn || {};
        setFirstDate(conductedOnData.firstDate);
        setLastDate(conductedOnData.lastDate);

        const marksData = response.data?.studentResults || {};
        const subjects = Object.keys(
          marksData?.[Object.keys(marksData)[0]]?.subjects || {}
        );

        const orderedSubjectsData = orderedSubjects.filter((subject) =>
          subjects.includes(subject)
        );

        const studentResultsArray = Object.entries(marksData).map(
          ([name, result], index) => {
            const subjectsData = orderedSubjectsData.reduce((acc, subject) => {
              acc[subject] = result.subjects[subject] || "";
              return acc;
            }, {});

            const percentage = result.percentage;
            const grade = getGrade(percentage);

            return {
              SINo: index + 1,
              Name: name,
              Gender: result.gender,
              "Pass/Fail": result.passFail,
              Grade: grade,
              Percentage: percentage,
              ...subjectsData,
              ObtainMarks: result.obtainMarks,
              TotalMarks: result.totalMarks,
              progressCard: result,
            };
          }
        );

        const dynamicColumns = [
          { accessorKey: "SINo", header: "SI No.", size: 60 },
          { accessorKey: "Name", header: "Name", size: 200 },
          { accessorKey: "Gender", header: "Gender", size: 100 },
          { accessorKey: "Pass/Fail", header: "Pass/Fail", size: 100 },
          { accessorKey: "Grade", header: "Grade", size: 120 },
          { accessorKey: "Percentage", header: "Percentage", size: 100 },
          ...orderedSubjectsData.map((subject) => ({
            accessorKey: subject,
            header: subject,
            size: 80,
          })),
          { accessorKey: "ObtainMarks", header: "Obtain Marks", size: 120 },
          { accessorKey: "TotalMarks", header: "Total Marks", size: 120 },
          {
            accessorKey: "progressCard",
            header: "Progress Card",
            size: 150,
            Cell: ({ cell }) => (
              <button onClick={() => handleView(cell.row.original)}>
                View
              </button>
            ),
          },
        ];
        setColumns(dynamicColumns);
        setStudentResults(studentResultsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedTestName) {
      fetchData();
    }
  }, [
    selectedClass,
    selectedSection,
    selectedTestName,
    handleView,
    orderedSubjects,
    dataArray,
    selectedPreviousClass,
  ]);

  useEffect(() => {
    if (studentData?.photo) {
      setImagePreview(studentData.photo);
    }
  }, [studentData]);

  const handleTestChange = (event) => {
    setSelectedTestName(event.target.value);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSubmittedData(null);
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);

    const isFetchedOption = dataArray.includes(selectedClass);

    if (isFetchedOption) {
      setNewClassDropdown("show");
    } else {
      setNewClassDropdown("");
    }
  };

  const handlePreviousClassChange = (e) => {
    const selectedPreviousClass = e.target.value;
    setselectedPreviousClass(selectedPreviousClass);
  };

  const table = useMaterialReactTable({
    columns,
    data: studentResults,
  });

  return (
    <div
      className="container"
      style={{ paddingLeft: "30px", paddingTop: "20px" }}
    >
      <div className="detailStud">
        <div className="noStud">All Exam Results</div>
        <div className="dropdown1">
          <div className="Class">
            <span className="Onename">Class : </span>
            <select value={selectedClass} onChange={handleClassChange}>
              {classOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {newClassDropdown && (
            <div className="newDropdown">
              <span className="Onename">Previous Class : </span>
              <select
                value={selectedPreviousClass}
                onChange={handlePreviousClassChange}
              >
                {newBatchOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="Section">
            <span className="Onename">Section : </span>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="detailExam">
        <div className="leftOne">
          <span className="Onename">Test Name : </span>
          {testNames.length > 0 ? (
            <select value={selectedTestName} onChange={handleTestChange}>
              {testNames.map((test, index) => (
                <option key={index} value={test}>
                  {test}
                </option>
              ))}
            </select>
          ) : (
            <span>No exams available</span>
          )}
        </div>
        <div className="RightOne">
          <span className="Onename">Conducted on :</span>{" "}
          {firstDate && lastDate ? `${firstDate} to ${lastDate}` : "-"}
        </div>
      </div>
      <div className="table-container w-100">
        <MaterialReactTable table={table} />
      </div>

      {/* Modal Popup */}
      {submittedData && (
        <div
          className={`modals ${isModalOpen ? "show" : ""}`}
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div
            className="modal-contents"
            style={{ overflow: "auto", cursor: "grab" }}
          >
            <div
              className="print-section"
              ref={printRef}
              style={{ paddingTop: "20px" }}
            >
              <div
                className="printTop"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <img
                      src={logo}
                      alt="School Logo"
                      style={{ width: "100px", height: "140px" }}
                    />
                  </div>
                  <div
                    className="school-info2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingLeft: "20px",
                    }}
                  >
                    <p className="p1">St. JOHN'S ENGLISH MEDIUM HIGH SCHOOL</p>
                    <p className="p2">
                      Recognised by the Govt. of Andhra Pradesh
                    </p>
                    <p className="p3">
                      Badvel Road, Mydukur - 516172, YSR Dist. A.P. INDIA
                    </p>
                    <p className="">
                      {selectedTestName} PROGRESS CARD (
                      {studentData.academicYear})
                    </p>
                  </div>
                </div>
                <div className="studentPhoto">
                  <div className="photo1">
                    <img
                      src={imagePreview}
                      alt={`${studentData.name}`}
                      style={{ height: "120px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="printBottom">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="leftP">
                    <p>
                      STUDENT NAME : {studentData.surname} {studentData.name}
                    </p>
                    <p>
                      FATHER NAME : {studentData.surname}{" "}
                      {studentData.fathersName}
                    </p>
                    <p>CLASS : {selectedClass}</p>
                    <p>SECTION : {selectedSection}</p>
                    <p>MOBILE NO : {studentData.fathersMobileNumber}</p>
                  </div>
                  <div className="rightP">
                    <ReactApexChart
                      options={chartData.options}
                      series={chartData.series}
                      type="bar"
                      height={150}
                      width={350}
                    />
                  </div>
                </div>
                <div className="downP">
                  <p>{selectedTestName} REPORT</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Obtain Marks</th>
                        <th>Max Marks</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderedSubjects
                        .filter((subject) =>
                          Object.keys(
                            submittedData.progressCard.subjects
                          ).includes(subject)
                        )
                        .map((subject, index) => {
                          const marks =
                            submittedData.progressCard.subjects[subject] ||
                            "N/A";
                          const totalMarksPerSubject =
                            submittedData.TotalMarks /
                            Object.keys(submittedData.progressCard.subjects)
                              .length;
                          const grade = getGrade(
                            (marks / totalMarksPerSubject) * 100
                          );
                          return (
                            <tr key={index}>
                              <td>{subject}</td>
                              <td>{marks}</td>
                              <td>{totalMarksPerSubject}</td>
                              <td>{grade}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="overviewResults">
                    <table>
                      <thead>
                        <tr>
                          <th>Max Marks</th>
                          <th>Total Marks</th>
                          <th>Percentage (%)</th>
                          <th>Overall Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{submittedData.TotalMarks}</td>
                          <td>{submittedData.ObtainMarks}</td>
                          <td>{submittedData.Percentage}</td>
                          <td>{submittedData.Grade}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="sign" style={{ marginTop: "35%" }}>
                    <li>SIGNATURE OF THE PARENT</li>
                    <li>SIGNATURE OF THE STUDENT</li>
                    <li>SIGNATURE OF THE H.M.</li>
                  </div>
                </div>
              </div>
            </div>
            <div className="print-buttons">
              <button onClick={handlePrint} className="print-btn">
                Print
              </button>
              {/* <button onClick={handleDownload(selectedClass, studentData.academicYear)} className="download-btn">
                    Download as PDF
                  </button> */}
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .leftP {
          font-family: Arial, sans-serif;
          color: #333;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
        }
        .leftP p {
          font-size: 14px;
        }
        .leftP p:first-of-type {
          font-weight: bold;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default AllStudExamResults;
