import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './CompanyDashboard.css';
import MenuBar from '../../../components/MenuBar';
import Sidebar from '../../../components/SideBar';

Chart.register(...registerables);

const CompanyDashboard = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [nameFilter, setNameFilter] = useState(''); // State for name filter input
  const [descriptionFilter, setDescriptionFilter] = useState(''); // State for description filter input

  const tableData = [
    { id: 1, name: 'Item 1', description: 'Descrição do item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do item 3' },
  ];

  const generateNormalData = () => {
    return Array.from({ length: 200 }, (_, index) => ({
      x: index,
      y: Math.random() * 100,
    }));
  };

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

  const chartOptions = {
    scales: {
      x: { grid: { display: false } },
      y: { grid: { borderDash: [5, 5] } },
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  const handleRowClick = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  // Filter tableData based on name and description filters
  const filteredData = tableData.filter((row) => {
    return row.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
           row.description.toLowerCase().includes(descriptionFilter.toLowerCase());
  });


  const [inputValue, setInputValue] = useState(0);

  /**
   * Handles changes to the numeric input field, ensuring only non-negative numbers are accepted.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.
   */
  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    // Update the state only if the value is non-negative
    if (!isNaN(newValue) && newValue >= 0) {
      setInputValue(newValue);
    }
  };

  /**
   * Handles the 'EXECUTE' button click event.
   * Implement the desired functionality for when the button is clicked.
   */
  const handleExecuteClick = () => {
    console.log('Execute with value:', inputValue);
    // Place the logic you want to execute with the inputValue here
  };


  

  return (
    <>
      <MenuBar />
      <Sidebar/>
      <h2>Dashboard Title</h2>
      <p>This is an example text placed above the table.</p>
      <div>
        {/* Inputs for filtering */}
        <input 
          type="text" 
          placeholder="Filter by name..." 
          value={nameFilter} 
          onChange={(e) => setNameFilter(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Filter by description..." 
          value={descriptionFilter} 
          onChange={(e) => setDescriptionFilter(e.target.value)} 
        />
      </div>
      <div className="dashboardContainer">
        <table className="dashboardTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
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
                                    <h3>Details</h3>
                                    <p><strong>TOTAL GRANTED OPTION:</strong> VALUE</p>
                                    <p><strong>VESTED:</strong> 234</p>
                                    <p><strong>EXERCISED:</strong> 1763</p>
                                    <p><strong>EXPIRATION DATE:</strong> 10/08/2024</p>
                                    {/* Duplicate expiration date line removed for clarity */}
                                    <div className="actionContainer">
                                        <input
                                            className="numericInput"
                                            type="number"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            min="0" // Ensures the HTML input element itself restricts to non-negative values
                                        />
                                        <button className="executeButton" onClick={handleExecuteClick}>EXECUTE</button>
                                    </div>

                                    </div>
                            </div>
                        </td>
                    </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p>This is an example text placed below the table.</p>
    </>
  );
};

export default CompanyDashboard;
