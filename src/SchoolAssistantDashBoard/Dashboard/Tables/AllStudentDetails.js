import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import "./AllStudentDetails.css";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Example = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [dataArray, setDataArray] = useState([]); // New state for dataArray

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/previousYearStudents.json"
        );
        const data = response.data || {}; // Default to an empty object if data is undefined

        const dataArray = Object.entries(data).map(([value, label]) => ({
          value,
          label,
        }));
        setDataArray(dataArray);

        const fetchedOptions = Object.keys(data).map((className) => ({
          value: className,
          label: className,
        }));

        const defaultOptions = [
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

        const options = [
          ...defaultOptions.map((className) => ({
            value: className,
            label: className,
          })),
          ...fetchedOptions,
        ];

        setClassOptions(options);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching class options:", error);
      }
    };

    fetchClassOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const url = dataArray.some((item) => item.value === selectedClass)
          ? `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/previousYearStudents/${selectedClass}.json`
          : `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`;

        const response = await axios.get(url);
        const data = response.data || {}; // Default to an empty object if data is undefined

        const sections = Object.keys(data);
        setSections(sections);
        if (sections.length > 0) {
          setSelectedSection(sections[0]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedClass, dataArray]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const url = dataArray.some((item) => item.value === selectedClass)
          ? `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/previousYearStudents/${selectedClass}/${selectedSection}.json`
          : `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}/${selectedSection}.json`;

        const response = await axios.get(url);
        setStudentData(response.data || []); // Default to an empty array if data is undefined
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching student data:", error);
      }
    };

    if (selectedSection) {
      fetchStudentData();
    }
  }, [selectedClass, selectedSection, dataArray]);

  const columns = useMemo(
    () => [
      { accessorKey: "SI", header: "SI", size: 25 },
      { accessorKey: "Name", header: "Name", size: 200 },
      { accessorKey: "Gender", header: "Gender", size: 50 },
      { accessorKey: "DOB", header: "DOB", size: 100 },
      { accessorKey: "ContactNo", header: "Contact No", size: 100 },
      { accessorKey: "AadharNo", header: "Aadhar No", size: 180 },
      { accessorKey: "FatherName", header: "Father Name", size: 150 },
      { accessorKey: "MotherName", header: "Mother Name", size: 150 },
      { accessorKey: "FormNo", header: "Form No", size: 150 },
    ],
    []
  );

  const formattedStudentData = useMemo(() => {
    return Object.entries(studentData).map(([name, details], index) => ({
      SI: index + 1,
      Name: name,
      Gender: details.gender,
      DOB: details.dob,
      ContactNo: details.contactNumber,
      AadharNo: details.aadharCardNo,
      FatherName: details.fathersName,
      MotherName: details.mothersName,
      FormNo: details.formNo,
    }));
  }, [studentData]);

  return (
    <>
      <div className="detailStud">
        <div className="noStud">All Students Class Wise</div>
        <div className="dropdown">
          <div className="Class">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classOptions.map((option, index) => (
                <option key={index} value={option.value || option}>
                  {option.label || option}
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
      <div className="table-container">
        {loading ? (
          <Box sx={{ width: '100%', height: '500px'}}>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation={true} height={50} />
          </Box>
        ) : (
          <MaterialReactTable columns={columns} data={formattedStudentData} />
        )}
      </div>
    </>
  );
};

export default Example;