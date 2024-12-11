import React, { useState, useEffect } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { database } from "../../../firebaseConfig";
import { ref, onValue } from "firebase/database";

const App = () => {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [chunks, setChunks] = useState([]);
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [months, setMonths] = useState([]);

  // Class options
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

  // Generate all days for the selected month dynamically
  const generateAllDays = (month) => {
    const daysInMonth = new Date(2024, month + 1, 0).getDate();
    const monthName = new Date(2024, month)
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const allDays = Array.from({ length: daysInMonth }, (_, i) => ({
      name: `${monthName}_${i + 1}`,
      Present: 0,
      Absent: 0,
    }));
    return allDays;
  };

  // Split data into chunks for smooth scrolling
  const splitIntoChunks = (data) => {
    const totalDays = data.length;
    const chunkSize = Math.floor(totalDays / 3);
    const remainder = totalDays % 3;

    const chunkSizes = [chunkSize, chunkSize, chunkSize + remainder];
    const chunks = [];
    let startIndex = 0;
    chunkSizes.forEach((size) => {
      chunks.push(data.slice(startIndex, startIndex + size));
      startIndex += size;
    });

    return chunks;
  };

  // Fetch sections dynamically based on the selected class
  useEffect(() => {
    if (selectedClass) {
      const sectionsRef = ref(
        database,
        `Attendance/StudAttendance/${selectedClass}`
      );

      onValue(sectionsRef, (snapshot) => {
        const sectionsData = snapshot.val();
        if (sectionsData) {
          const fetchedSections = Object.keys(sectionsData);
          setSections(fetchedSections);
          setSelectedSection(fetchedSections[0]);
        } else {
          setSections([]);
          setSelectedSection("");
        }
      });
    }
  }, [selectedClass]);

  // Fetch available months dynamically for the selected section
  useEffect(() => {
    if (selectedClass && selectedSection) {
      const monthsRef = ref(
        database,
        `Attendance/StudAttendance/${selectedClass}/${selectedSection}`
      );

      onValue(monthsRef, (snapshot) => {
        const monthsData = snapshot.val();
        if (monthsData) {
          const fetchedMonths = Object.keys(monthsData);
          setMonths(fetchedMonths);
          setSelectedMonth(fetchedMonths[0]);
        } else {
          setMonths([]);
          setSelectedMonth("");
        }
      });
    }
  }, [selectedClass, selectedSection]);

  // Fetch all day data for the selected month dynamically
  useEffect(() => {
    if (selectedClass && selectedSection && selectedMonth) {
      const attendanceRef = ref(
        database,
        `Attendance/StudAttendance/${selectedClass}/${selectedSection}/${selectedMonth}`
      );

      onValue(attendanceRef, (snapshot) => {
        const monthData = snapshot.val();
        const currentMonthIndex = new Date(
          `${selectedMonth} 1, 2024`
        ).getMonth();
        const allDaysData = generateAllDays(currentMonthIndex);

        if (monthData) {
          allDaysData.forEach((day) => {
            const dayData = monthData[day.name];
            if (dayData) {
              day.Present = dayData.present
                ? Object.keys(dayData.present).length
                : 0;
              day.Absent = dayData.absent
                ? Object.keys(dayData.absent).length
                : 0;
            }
          });
        }
        setChunks(splitIntoChunks(allDaysData));
        setCurrentChunkIndex(0);
      });
    }
  }, [selectedClass, selectedSection, selectedMonth]);

  const handleScrollLeft = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(currentChunkIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (currentChunkIndex < chunks.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1);
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      {/* Dropdown Controls */}
      <div className="detailStud">
        <div className="noStud">Monthly Attendance Overview</div>
        <div className="Class">
          <select value={selectedClass} onChange={handleClassChange}>
            {classOptions.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
        <div className="Section">
          <select value={selectedSection} onChange={handleSectionChange}>
            {sections.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <div className="Month">
          <select value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div
          className="threeDots"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            onClick={handleScrollLeft}
            style={{
              cursor: "pointer",
              color: "#555",
            }}
          >
            <IoMdArrowDropleft size={32} />
          </span>
          <span
            onClick={handleScrollRight}
            style={{
              cursor: "pointer",
              color: "#555",
            }}
          >
            <IoMdArrowDropright size={32} />
          </span>
        </div>
      </div>

      {/* Attendance Bar Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chunks[currentChunkIndex] || []}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          style={{ background: "white" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            style={{ fontSize: "1.2em" }}
            tickFormatter={(value) => {
              const [month, day] = value.split("_");
              return `${month.slice(0, 3)}-${day}`;
            }}
          />
          <YAxis style={{ fontSize: "1.2em" }} type="number" domain={[0, "dataMax"]} />
          <Tooltip contentStyle={{ fontSize: "1.2em" }} />
          <Legend wrapperStyle={{ fontSize: "1.2em" }} />
          <Bar dataKey="Present" fill="#6FBE2E" />
          <Bar dataKey="Absent" fill="#DA1212" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
