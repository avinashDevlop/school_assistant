import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  const data = [
    { id: 0, value: 30, label: 'A-Grade', color: '#94FF30' },
    { id: 1, value: 30, label: 'B-Grade', color: '#FFA500' },
    { id: 2, value: 20, label: 'C-Grade', color: '#2B80FF' },
    { id: 3, value: 20, label: 'D-Grade', color: '#FF2B2B' },
  ];

  let containerStyle = {
    backgroundColor: 'white',
    width:'100%',   
    
  };
   
  return (
    <div style={containerStyle}> {/* Apply the inline style */}
       <center>
      <PieChart
        series={[
          {
            data: data,
          },
        ]}
        height={300}
      />
        </center>   
    </div>
  );
}
