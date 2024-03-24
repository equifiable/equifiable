import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './CompanyDashboard.css';
import MenuBar from '../../../components/MenuBar';

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

  const AuthorizedSharesChart = () => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const data = {
        labels: ["Issued Shares", "Available Shares", "Executed Shares"],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: ["#0BEAB9", "#F8AE49", "#075283"],
          hoverBackgroundColor: ["#0BEAB9", "#F8AE49", "#075283"]
        }]
      };
  
      const chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true
            },
            title: {
              display: true,
              text: 'Authorized Shares Usage'
            }
          }
        }
      });
  
      // Cleanup function to destroy chart instance on component unmount
      return () => chart.destroy();
    }, []);
  
    return (
      <div style={{ maxWidth: '75%', height: '500px', margin: 'auto' }}>
        <canvas id="authorizedshareschart" ref={chartRef}></canvas>
      </div>
    );
  };

  const OwnershipSharesChart = () => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      var ownershipData = {
        labels: ["Founders", "Directors", "Managers", "Engineers"],
        datasets: [{
          data: [200, 100, 95, 80],
          backgroundColor: ["#0BEAB9", "#F8AE49", "#075283", "#652E5B"],
          hoverBackgroundColor: ["#0BEAB9", "#F8AE49", "#075283", "#652E5B"]
        }]
      };
  
      const chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: ownershipData,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Ownership Shares Distribution'
            },
            legend: {
              display: true
            },
            customText:{
              text:'50%'
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });

      // Register a custom plugin if needed for displaying text inside the doughnut
      Chart.register({
        id: 'customText',
        beforeDraw: (chart) => {
          let sum = 0;
          let text = '';
          let vestedText = '';
    
          if (chart.options.plugins.ownershipText && (chart.canvas.id === 'authorizedshareschart' || chart.canvas.id === 'ownershipsharechart')) {
              const data = chart.data.datasets[0].data;
              sum = data.reduce((a, b) => a + b, 0);
    
              if (chart.canvas.id === 'authorizedshareschart') {
                  vestedText = "Total Authorized Shares";
                  text = sum;
              } else {
                  // Assuming highestNumber and highestLabel are defined elsewhere
                  text = highestNumber; // Make sure this variable is defined and accessible
                  vestedText = highestLabel + "' Shares"; // Make sure highestLabel is defined
              }
    
              const ctx = chart.ctx;
              ctx.restore();
              var fontSize = Math.round(chart.height / 114).toFixed(2);
              ctx.font = `bold ${fontSize}em sans-serif`;
              ctx.textBaseline = "middle";
              textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
              textY = chart.height / 1.7;
              ctx.fillText(text, textX, textY - 15);
    
              var fontSize = Math.round(chart.height / 500).toFixed(2);
              ctx.font = `${fontSize}em sans-serif`;
              textX = Math.round((chart.width - ctx.measureText(vestedText).width) / 2);
              textY = chart.height / 1.7;
              ctx.fillText(vestedText, textX, textY + 25);
              ctx.save();
          }
      }
      });
  
      // Cleanup function to destroy chart instance on component unmount
      return () => chart.destroy();
    }, []);
  
    return (
      <div style={{ maxWidth: '75%', height: '500px', margin: 'auto' }}>
        <canvas id ="ownershipsharechart" ref={chartRef}></canvas>
      </div>
    );
  };

  // This function updates the visual representation of the dataset size
function updateDatasetSizeVisual(data) {
  // Calculate the size of the dataset based on the number of labels
  const datasetSize = data.labels.length;

  // Ensure the visual container for the dataset size is present
  let sizeBox = document.getElementById('datasetSizeBox');
  if (!sizeBox) {
      sizeBox = document.createElement('div');
      sizeBox.id = 'datasetSizeBox';
      document.body.appendChild(sizeBox); // Assuming you want to append to the body
  }

    // Create a new div for the availableSharesValue
  let sizeBoxDiv = document.createElement('div');
  sizeBoxDiv.innerText = `${datasetSize}`;
  // Style for the availableSharesValue to be larger
  sizeBoxDiv.style.textAlign = 'center';
  sizeBoxDiv.style.width = '100%';
  sizeBoxDiv.style.fontSize = '50px'; // Larger font size
  sizeBoxDiv.style.fontWeight = 'bold';

  // Create another div for the label "Available Shares"
  let sizeBoxDivLabel = document.createElement('div');
  sizeBoxDivLabel.innerText = 'Total Shareholders';
  // Style for the label to be smaller
  sizeBoxDivLabel.style.textAlign = 'center';
  sizeBoxDivLabel.style.width = '100%';
  sizeBoxDivLabel.style.fontSize = '16px'; // Smaller font size

  // Append both divs to sharesBox
  sizeBox.appendChild(sizeBoxDiv);
  sizeBox.appendChild(sizeBoxDivLabel);

  // Style for the dataset size box, to make it visually distinct
  sizeBox.style.width = '210px';
  sizeBox.style.height = '50px'; // Adjusted for a smaller size
  sizeBox.style.backgroundColor = '#66A98E';
  sizeBox.style.color = 'white';
  sizeBox.style.display = 'flex';
  sizeBox.style.justifyContent = 'center';
  sizeBox.style.alignItems = 'center';
  sizeBox.style.fontSize = '20px';
  sizeBox.style.fontFamily = "Arial"; // Default font family for Chart.js
  sizeBox.style.fontWeight = "bold";
  sizeBox.style.borderRadius = '4px';
  sizeBox.style.marginTop = '20px';

  // Update the content of the visual container with the number of elements
  //sizeBox.innerText = `${datasetSize} Total Shareholders`;
}


function updateAvailableSharesVisual(data) {
  // Find the index of "Available Shares" in the labels array
  const availableSharesIndex = data.labels.indexOf("Available Shares");
  // Retrieve the value of "Available Shares" using the found index
  const availableSharesValue = data.datasets[0].data[availableSharesIndex];

  let sharesBox = document.getElementById('availableSharesBox');
  if (!sharesBox) {
      sharesBox = document.createElement('div');
      sharesBox.id = 'availableSharesBox';
      document.body.appendChild(sharesBox); // Assuming you want to append to the body
  }

// Create a new div for the availableSharesValue
let sharesValueDiv = document.createElement('div');
sharesValueDiv.innerText = `${availableSharesValue}`;
// Style for the availableSharesValue to be larger
sharesValueDiv.style.textAlign = 'center';
sharesValueDiv.style.width = '100%';
sharesValueDiv.style.fontSize = '50px'; // Larger font size
sharesValueDiv.style.fontWeight = 'bold';

// Create another div for the label "Available Shares"
let sharesLabelDiv = document.createElement('div');
sharesLabelDiv.innerText = 'Available Shares';
// Style for the label to be smaller
sharesLabelDiv.style.textAlign = 'center';
sharesLabelDiv.style.width = '100%';
sharesLabelDiv.style.fontSize = '16px'; // Smaller font size

// Append both divs to sharesBox
sharesBox.appendChild(sharesValueDiv);
sharesBox.appendChild(sharesLabelDiv);

  // Style for the dataset size box, to make it visually distinct
  sharesBox.style.width = '210px';
  sharesBox.style.height = '50px'; // Adjusted for a smaller size
  sharesBox.style.backgroundColor = '#66A98E';
  sharesBox.style.color = 'white';
  sharesBox.style.display = 'flex';
  sharesBox.style.justifyContent = 'center';
  sharesBox.style.alignItems = 'center';
  sharesBox.style.fontSize = '20px';
  sharesBox.style.fontFamily = "Arial"; // Default font family for Chart.js
  sharesBox.style.fontWeight = "bold";
  sharesBox.style.borderRadius = '4px';
  sharesBox.style.marginTop = '20px';
}

  return (
    <div>
      {/* Row for the two Doughnut charts */}
      <div style={rowStyle}>
        <div style={halfWidthStyle}>
          {AuthorizedSharesChart()}
        </div>
        <div style={halfWidthStyle}>
          {OwnershipSharesChart()}
        </div>
      </div>
      <div>
        <div>
        updateDatasetSizeVisual(data);
        </div>
        <div>
        updateAvailableSharesVisual(data)
        </div>
      </div>

    </div>
  );



  

  return (
    <>
      <MenuBar />
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
