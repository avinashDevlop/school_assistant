import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "jan-1",
    Present: 40,
    Absent: 20,
    amt: 60
  },
  {
    name: "jan-2",
    Present: 45,
    Absent: 5,
    amt: 50
  },
  {
    name: "jan-3",
    Present: 32,
    Absent: 8,
    amt: 40
  },
  {
    name: "jan-4",
    Present: 27,
    Absent: 8,
    amt: 35
  },
  {
    name: "jan-5",
    Present: 18,
    Absent: 4,
    amt: 22
  },
  {
    name: "jan-6",
    Present: 23,
    Absent: 3,
    amt: 26
  },
  {
    name: "jan-7",
    Present: 34,
    Absent: 1,
    amt: 35
  },
  {
    name: "jan-8",
    Present: 18,
    Absent: 4,
    amt: 22
  },
  {
    name: "jan-9",
    Present: 23,
    Absent: 3,
    amt: 26
  },
  {
    name: "jan-10",
    Present: 18,
    Absent: 4,
    amt: 22
  },
];

const App = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        style={{ background: "white" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{ fontSize: "1.2em" }} />
        <YAxis style={{ fontSize: "1.2em" }} type="number" domain={[0, 80]}/>
        <Tooltip contentStyle={{ fontSize: "1.2em" }} />
        <Legend wrapperStyle={{ fontSize: "1.2em" }} />
        <Bar dataKey="Present" fill="#6FBE2E" />
        <Bar dataKey="Absent" fill="#DA1212" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default App;
