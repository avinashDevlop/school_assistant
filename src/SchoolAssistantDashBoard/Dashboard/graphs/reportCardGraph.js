import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './reporCardGraphCSS.css';

const ApexChart = () => {
  const [state] = useState({
    series: [{
      name: "Progress",
      data: [0, 94, 85, 90, 95, 80, 90, 80, 90, 85, 80]
    }],
    options: {
      chart: { 
        type: 'area',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Average Report',
        align: 'left'
      },
      subtitle: {
        text: 'Monthly Progress Movements',
        align: 'left'
      },
      labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
      xaxis: {
        type: 'category',
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          formatter: function (value) {
            return value + "%";
          }
        }
      },
      legend: {
        horizontalAlign: 'left'
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} className='graph' />
      </div>
    </div>
  );
};

export default ApexChart;
