import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import "./AllStudentDetails.css";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import api from '../../../api';

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
        const response = await api.get(
          "admissionForms/previousYearStudents.json"
        );
        const data = response.data;

        const dataArray = Object.entries(data).map(([value, label]) => ({
          value,
          label,
        }));
        setDataArray(dataArray);

        if (data) {
          const fetchedOptions = Object.keys(data).map((className) => ({
            value: className,
            label: className,
          }));
          const options = [
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
            ...fetchedOptions,
          ];
          setClassOptions(options);
        }
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
      let data; // Declare data variable here

      try {
        setLoading(true);

        if (dataArray.some((item) => item.value === selectedClass)) {
          const response = await api.get(
            `admissionForms/previousYearStudents/${selectedClass}.json`
          );
          data = response.data; // Assign data here
        } else {
          const response = await api.get(
            `admissionForms/${selectedClass}.json`
          );
          data = response.data; // Assign data here
        }
        if (data) {
          const sections = Object.keys(data);
          setSections(sections);
          setSelectedSection(sections[0]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedClass, dataArray]); // Add dataArray to the dependency array

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        let url = "";

        if (dataArray.some((item) => item.value === selectedClass)) {
          url = `previousYearStudents/${selectedClass}/${selectedSection}.json`;
        } else {
          url = `${selectedClass}/${selectedSection}.json`;
        }

        const response = await api.get(url);
        setStudentData(response.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [selectedClass, selectedSection, dataArray]);

  // Define columns for the table
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

  // Format student data for the table
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
