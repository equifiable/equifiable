import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Import custom CSS styles for Dashboard
import './Dashboard.css';
import MenuBar from '../../../components/MenuBar';

// Register the chart.js components to use
Chart.register(...registerables);

/**
 * Dashboard component that displays a table of items and detailed information,
 * including a chart and additional data, for the selected row.
 */
const Dashboard = () => {
  // State to keep track of the selected row index
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  // Dummy data for demonstration purposes
  const tableData = [
    { id: 1, name: 'Item 1', description: 'Descrição do item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do item 3' },
  ];

  /**
   * Generates random data for the chart.
   * Each object in the array represents a point in the chart with unique x and random y values.
   * 
   * @returns {Object[]} Array of objects with x and y properties.
   */
  const generateNormalData = () => {
    return Array.from({ length: 200 }, (_, index) => ({
      x: index,
      y: Math.random() * 100,
    }));
  };

  // Chart data configuration
  const chartData = {
    datasets: [
      {
        label: 'Dados Aleatórios',
        data: generateNormalData(),
        borderColor: '#007aff',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#007aff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
    ],
  };

  // Chart options for a more refined appearance
  const chartOptions = {
    scales: {
      x: { grid: { display: false } },
      y: { grid: { borderDash: [5, 5] } },
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  /**
   * Handles clicking on a table row. Toggles the selected row index.
   * 
   * @param {number} index - The index of the clicked row.
   */
  const handleRowClick = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  // Render the Dashboard component
  return (
    <React.Fragment>
    <MenuBar/>
    <h2>Dashboard Title</h2><p>This is an example text placed above the table.</p><div className="dashboardContainer">
          <table className="dashboardTable">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Descrição</th>
                  </tr>
              </thead>
              <tbody>
                  {tableData.map((row, index) => (
                      <React.Fragment key={row.id}>
                          <tr onClick={() => handleRowClick(index)} className="tableRow">
                              <td>{row.id}</td>
                              <td>{row.name}</td>
                              <td>{row.description}</td>
                          </tr>
                          {selectedRowIndex === index && (
                              <tr>
                                  <td colSpan="3" className="detailRow">
                                      <div className="rowContainer">
                                          <div className="chartContainer">
                                              <Line data={chartData} options={chartOptions} />
                                          </div>
                                          <div className="additionalInfo">
                                              <h3>Detalhes</h3>
                                              <p><strong>TOTAL GRANTED OPTION:</strong> VALUE</p>
                                              <p><strong>VALUE 2:</strong> 234</p>
                                              <p><strong>VALUE 3:</strong> 1763</p>
                                          </div>
                                      </div>
                                  </td>
                              </tr>
                          )}
                      </React.Fragment>
                  ))}
              </tbody>
          </table>
      </div><p>This is an example text placed below the table.</p>
      </React.Fragment>
  );
};

export default Dashboard;
