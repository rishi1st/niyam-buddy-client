import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressChart = ({ weeklyHours }) => {
  // ✅ Week starts from Sunday
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 🛠️ Map day=1 to Sunday, ..., day=7 to Saturday
  const dataPoints = days.map((_, index) => {
    const matchingData = weeklyHours.find((d) => d.day === index + 1);
    return matchingData ? matchingData.hours : 0;
  });

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Study Hours',
        data: dataPoints,
        backgroundColor: [
          '#ffadadcc', '#ffd6a5cc', '#fdffb6cc', '#caffbccc',
          '#9bf6ffcc', '#a0c4ffcc', '#bdb2ffcc'
        ],
        borderColor: [
          '#ffadad', '#ffd6a5', '#fdffb6', '#caffbc',
          '#9bf6ff', '#a0c4ff', '#bdb2ff'
        ],
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#ffffff' }
      },
      title: {
        display: true,
        text: 'Weekly Study Progress',
        color: '#ffffff',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#ffffff' },
        title: {
          display: true,
          text: 'Hours',
          color: '#ffffff'
        },
        grid: { color: '#444' }
      },
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#444' }
      }
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
