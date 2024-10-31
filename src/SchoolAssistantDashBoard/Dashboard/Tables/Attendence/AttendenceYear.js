import React, { useMemo, useState, useEffect } from "react";
import api from "../../../../api";
import "./AttendenceYear.css";
import { TiTick } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { MaterialReactTable } from "material-react-table";
import CircularProgress from "@mui/material/CircularProgress";

const AllStudent = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedPreviousClass, setselectedPreviousClass] =
    useState("@10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [attendanceDataResponse, setAttendanceDataResponse] = useState({});
  const [newClassDropdown, setNewClassDropdown] = useState("");

  useEffect(() => {
    const fetchMonthWiseStuAttendance = async () => {
      if (!selectedClass || !selectedSection || !selectedMonth) return;
      try {
        setLoading(true);

        // Check if selectedClass matches the 'value' property of any object in dataArray
        const classExists = dataArray.some(
          (item) => item.value.trim() === selectedClass.trim()
        );
        let endpoint;
        if (classExists) {
          endpoint = `Attendance/previousYearStudents/${selectedClass}/${selectedPreviousClass}/${selectedSection}/${selectedMonth}.json`;
        } else {
          endpoint = `Attendance/StudAttendance/${selectedClass}/${selectedSection}/${selectedMonth}.json`;
        }

        const response = await api.get(endpoint);
        setAttendanceDataResponse(response.data || {});
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchMonthWiseStuAttendance();
  }, [selectedClass, selectedSection, selectedMonth, dataArray, selectedPreviousClass]);

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "admissionForms/previousYearStudents.json"
        );
        const data = response.data || {};

        const fetchedOptions = Object.keys(data).map((className) => ({
          value: className,
          label: className,
        }));
        setDataArray(fetchedOptions);

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
        ].map((className) => ({
          value: className,
          label: className,
        }));

        setClassOptions([...defaultOptions, ...fetchedOptions]);
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
      if (!selectedClass) return;
      try {
        setLoading(true);

        const url = dataArray.some((item) => item.value === selectedClass)
          ? `admissionForms/previousYearStudents/${selectedClass}.json`
          : `admissionForms/${selectedClass}.json`;

        const response = await api.get(url);
        const data = response.data || {};

        const sections = Object.keys(data);
        setSectionOptions(sections);
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
    const fetchMonthOptions = async () => {
      if (!selectedClass || !selectedSection) return;
      try {
        setLoading(true);

        // Check if selectedClass matches the 'value' property of any object in dataArray (with trimming for whitespace)
        const classExists = dataArray.some(
          (item) => item.value.trim() === selectedClass.trim()
        );

        const endpoint = classExists
          ? `Attendance/previousYearStudents/${selectedClass}/${selectedPreviousClass}/${selectedSection}.json`
          : `Attendance/StudAttendance/${selectedClass}/${selectedSection}.json`;


        const response = await api.get(endpoint);
        const data = response.data || {};

        const months = Object.keys(data);
        setMonthOptions(months);
        if (months.length > 0) {
          setSelectedMonth(months[0]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching month options:", error);
      }
    };

    fetchMonthOptions();
  }, [selectedClass, selectedSection, dataArray, selectedPreviousClass]);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!selectedClass || !selectedSection) return;
      try {
        setLoading(true);
        const url = dataArray.some((item) => item.value === selectedClass)
          ? `admissionForms/previousYearStudents/${selectedClass}/${selectedSection}.json`
          : `admissionForms/${selectedClass}/${selectedSection}.json`;

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

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const columns = useMemo(() => {
    const year = new Date().getFullYear();
    const monthIndex = new Date(
      Date.parse(`${selectedMonth} 1, ${year}`)
    ).getMonth();
    const daysInMonth = getDaysInMonth(year, monthIndex);

    const dayColumns = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return {
        accessorKey: `${day}`,
        header: day.toString(),
        size: 25,
        Cell: ({ row }) => {
          const attendanceStatus = row.original[`${day}`];
          return (
            <div>
              {attendanceStatus === true ? (
                <TiTick color="#008000" />
              ) : attendanceStatus === false ? (
                <IoCloseSharp color="#FF0000" />
              ) : (
                ""
              )}
            </div>
          );
        },
      };
    });

    return [
      { accessorKey: "SI", header: "SI", size: 25 },
      { accessorKey: "Name", header: "Name", size: 200 },
      ...dayColumns,
    ];
  }, [selectedMonth]);

  const formattedStudentData = useMemo(() => {
    const year = new Date().getFullYear();
    const monthIndex = new Date(
      Date.parse(`${selectedMonth} 1, ${year}`)
    ).getMonth();
    const daysInMonth = getDaysInMonth(year, monthIndex);

    return Object.entries(studentData).map(([name, _], index) => {
      const rowData = { SI: index + 1, Name: name };
      let presentStudents = [];
      let absentStudents = [];

      for (let i = 1; i <= daysInMonth; i++) {
        presentStudents[i] =
          attendanceDataResponse[`${selectedMonth}_${i}`]?.present || [];
        absentStudents[i] =
          attendanceDataResponse[`${selectedMonth}_${i}`]?.absent || [];
      }

      const attendanceRow = [name];
      for (let i = 1; i <= daysInMonth; i++) {
        attendanceRow.push(presentStudents[i].includes(name));
      }

      const tempObject = {};
      for (let i = 1; i < attendanceRow.length; i++) {
        tempObject[i] = attendanceRow[i];
      }

      return { ...rowData, ...tempObject };
    });
  }, [attendanceDataResponse, selectedMonth, studentData]);

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

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);

    // Check if the selectedClass exists in the fetched options (dataArray)
    const isFetchedOption = dataArray.some(
      (item) => item.value === selectedClass
    );

    if (isFetchedOption) {
      setNewClassDropdown("show"); // Show new dropdown if selected class is a fetched option
    } else {
      setNewClassDropdown(""); // Hide dropdown if selected class is not a fetched option
    }
  };

  const handlePreviousClassChange = (e) => {
    const selectedPreviousClass = e.target.value;
    setselectedPreviousClass(selectedPreviousClass);
  };
  return (
    <div className="tablecontainer year">
      <div className="studGraph">
        <div className="detailStud">
          <div className="noStud">Student Attendance</div>
        </div>
        <div className="detailStud alldropdowns">
          <div className="Class">
            <select value={selectedClass} onChange={handleClassChange}>
              {classOptions.map((className, index) => (
                <option key={index} value={className.value || className}>
                  {className.label || className}
                </option>
              ))}
            </select>
          </div>
          {newClassDropdown && (
            <div className="newDropdown">
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
            <select value={selectedSection} onChange={handleSectionChange}>
              {sectionOptions.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div className="Month">
            <select value={selectedMonth} onChange={handleMonthChange}>
              {monthOptions.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <MaterialReactTable columns={columns} data={formattedStudentData} />
        )}
      </div>
    </div>
  );
};

export default AllStudent;
