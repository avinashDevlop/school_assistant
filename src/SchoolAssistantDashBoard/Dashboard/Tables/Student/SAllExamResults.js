import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import axios from "axios";
 
const Example = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [testNames, setTestNames] = useState([]);
  const [selectedTestName, setSelectedTestName] = useState("");
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [studentResults, setStudentResults] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
        );
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

    fetchData();
  }, [selectedClass]);

  useEffect(() => {
    const fetchTestNames = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamMarks/${selectedClass}/${selectedSection}.json`
        );
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
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/ExamMarks/${selectedClass}/${selectedSection}/${selectedTestName}.json`
        );
        const conductedOnData = response.data?.conductedOn || {};
        // Update state with the first and last dates
        setFirstDate(conductedOnData.firstDate);
        setLastDate(conductedOnData.lastDate);

        const marksData = response.data?.studentResults || {};
        const studentResultsArray = Object.entries(marksData).map(([name, result],index) => {
          return {
            SINo: index + 1,
            Name: name,
            Gender: result.gender,
            "Pass/Fail": result.passFail,
            "grade": result.grade,
            "Percentage": result.percentage,
            Telugu: result.telugu,
            Hindi: result.hindi,
            English: result.english,
            Math: result.maths,
            Science: result.science,
            Social: result.social,
            "Obtain Marks": result.obtainMarks,
            "Total Marks": result.totalMarks,
          };
        });
        setStudentResults(studentResultsArray);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
}, [selectedClass, selectedSection, selectedTestName]);

  const handleTestChange = (event) => {
    setSelectedTestName(event.target.value);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "SINo",
        header: "SI No.",
        size: 60,
      },
      {
        accessorKey: "Name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "Gender",
        header: "Gender",
        size: 100,
      },
      {
        accessorKey: "Pass/Fail",
        header: "Pass/Fail",
        size: 100,
      },
      {
        accessorKey: "grade",
        header: "Grade",
        size: 120,
      },
      {
        accessorKey: "Percentage",
        header: "Percentage",
        size: 100,
      },
      {
        accessorKey: "Telugu",
        header: "Telugu",
        size: 80,
      },
      {
        accessorKey: "Hindi",
        header: "Hindi",
        size: 80,
      },
      {
        accessorKey: "English",
        header: "English",
        size: 80,
      },
      {
        accessorKey: "Math",
        header: "Math",
        size: 80,
      },
      {
        accessorKey: "Science",
        header: "Science",
        size: 80,
      },
      {
        accessorKey: "Social",
        header: "Social",
        size: 80,
      },
      {
        accessorKey: "Obtain Marks",
        header: "Obtain Marks",
        size: 120,
      },
      {
        accessorKey: "Total Marks",
        header: "Total Marks",
        size: 120,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: studentResults,
  });

  return (
    <div className="container">
      <div className="detailStud">
        <div className="noStud">All Exam Results</div>
        <div className="dropdown">
          <div className="Class">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="Section">
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
          <span className="Onename">Conducted on :</span> {" "}
            {firstDate && lastDate ? `${firstDate} to ${lastDate}` : "-"}
        </div>
      </div>
      <div className="table-container">
        <MaterialReactTable table={table} />
      </div>
      <div className="detailExam">
        <div className="leftOne">
          Students attended the test{" "}
          <span className="Onename">: 300</span>
        </div>
        <div className="RightOne">
          Students didn’t attend the test{" "}
          <span className="Onename">: 20</span>
        </div>
      </div>
    </div>
  );
};

export default Example;