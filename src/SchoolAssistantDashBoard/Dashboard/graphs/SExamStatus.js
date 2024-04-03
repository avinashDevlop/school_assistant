import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const DonutChart = () => {
  const [chartData, setChartData] = useState([20, 8, 30, 10]);

  const options = {
    labels: ['Grade-A', 'Grade-B', 'Grade-C', 'Grade-D'],
    chart: {
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (value) {
          return `<div style="display:flex;justify-content:center;align-items:center">${value}</div>`;
        },
      },
    },
  };

  const chartStyle = {
    background: '#fff',
    height: '250px',
    overflowY: 'hidden',
    paddingRight: '20%',
  };

  return (
    <div style={chartStyle}>
      <Chart options={options} series={chartData} type="donut" height="100%" />
    </div>
  );
};

export default DonutChart;
