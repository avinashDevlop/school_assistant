import React, { useState, useEffect } from "react";
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
import { database } from "../../../firebaseConfig"; // Adjust your Firebase config path
import { ref, onValue } from "firebase/database";
import { BsThreeDotsVertical } from "react-icons/bs";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { fullName, Present, Absent } = payload[0].payload; // Access full class name
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`${fullName}`}</p>
        <p style={{ color: "#6FBE2E" }}>{`Present: ${Present}`}</p>
        <p style={{ color: "#DA1212" }}>{`Absent: ${Absent}`}</p>
      </div>
    );
  }
  return null;
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.toLocaleString("default", {
      month: "long",
    }).toLowerCase(); // Example: "december"
    const formattedDate = `${currentMonth}_${today.getDate()}`; // Example: "december_10"

    // Reference to Attendance in Firebase
    const attendanceRef = ref(database, "Attendance/StudAttendance");

    // Default classes with display labels
    const defaultClasses = [
      { name: "10th Class", label: "10th" },
      { name: "9th Class", label: "9th" },
      { name: "8th Class", label: "8th" },
      { name: "7th Class", label: "7th" },
      { name: "6th Class", label: "6th" },
      { name: "5th Class", label: "5th" },
      { name: "4th Class", label: "4th" },
      { name: "3rd Class", label: "3rd" },
      { name: "2nd Class", label: "2nd" },
      { name: "1st Class", label: "1st" },
      { name: "UKG", label: "UKG" },
      { name: "LKG", label: "LKG" },
      { name: "Pre-K", label: "Pre-K" },
    ];

    const defaultData = defaultClasses.map(({ name, label }) => ({
      name: label, // Short name for X-axis
      fullName: name, // Full class name for Tooltip
      Present: 0,
      Absent: 0,
    }));

    onValue(attendanceRef, (snapshot) => {
      const attendanceData = snapshot.val();
      const formattedData = [...defaultData]; // Start with default data

      if (attendanceData) {
        // Iterate through Classes
        Object.entries(attendanceData).forEach(([className, sections]) => {
          // Match className to the default data
          const classObj = defaultClasses.find((cls) => cls.name === className);
          if (classObj) {
            // Iterate through Sections
            Object.entries(sections).forEach(([section, months]) => {
              const monthData = months[currentMonth]; // Access the current month
              if (monthData) {
                const todayAttendance = monthData[formattedDate]; // Access today's attendance
                if (todayAttendance) {
                  // Calculate present and absent counts
                  const presentCount = todayAttendance.present
                    ? Object.keys(todayAttendance.present).length
                    : 0;
                  const absentCount = todayAttendance.absent
                    ? Object.keys(todayAttendance.absent).length
                    : 0;

                  // Find the index of the class in the default data and update
                  const classIndex = formattedData.findIndex(
                    (item) => item.name === classObj.label
                  );
                  if (classIndex !== -1) {
                    formattedData[classIndex].Present += presentCount;
                    formattedData[classIndex].Absent += absentCount;
                  }
                }
              }
            });
          }
        });
      }

      setData(formattedData); // Update state
    });
  }, []);

  return (
    <div>
      <div className="detailStud">
            <div className="noStud">Class-wise Attendance: Today</div>
            <div className="threeDots">
              <BsThreeDotsVertical />
            </div>
      </div>
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        style={{ background: "white" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          style={{ fontSize: "1.2em" }}
          tick={{ fontSize: 14 }}
        />
        <YAxis
          style={{ fontSize: "1.2em" }}
          type="number"
          domain={[0, "dataMax"]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: "1.2em" }} />
        <Bar dataKey="Present" fill="#6FBE2E" />
        <Bar dataKey="Absent" fill="#DA1212" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default App;
