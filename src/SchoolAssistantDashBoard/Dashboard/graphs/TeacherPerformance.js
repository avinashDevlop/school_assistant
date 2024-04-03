import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'F/A-I', Telugu: 40, Hindi: 24, English: 35, Maths: 50, Science: 45, Social: 30 },
  { name: 'Quarterly', Telugu: 30, Hindi: 14, English: 25, Maths: 45, Science: 40, Social: 35 },
  { name: 'F/A-II', Telugu: 20, Hindi: 98, English: 55, Maths: 60, Science: 70, Social: 50 },
  { name: 'Half Yearly', Telugu: 27.8, Hindi: 39.08, English: 45, Maths: 55, Science: 65, Social: 40 },
  { name: 'F/A-III', Telugu: 18.9, Hindi: 48, English: 40, Maths: 60, Science: 50, Social: 55 },
  { name: 'Annual', Telugu: 23.9, Hindi: 38, English: 50, Maths: 70, Science: 60, Social: 45 },
];

const MyLineChart = () => (
  <div style={{ height: '435px', width: '100%' }}>
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Telugu" stroke="#8884d8" strokeWidth={3} />
        <Line type="monotone" dataKey="Hindi" stroke="#82ca9d" strokeWidth={3} />
        <Line type="monotone" dataKey="English" stroke="#ff7300" strokeWidth={3} />
        <Line type="monotone" dataKey="Maths" stroke="#413ea0" strokeWidth={3} />
        <Line type="monotone" dataKey="Science" stroke="#0088aa" strokeWidth={3} />
        <Line type="monotone" dataKey="Social" stroke="#82ca9d" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default MyLineChart;
