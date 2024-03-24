import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './CompanyDashboard.css';
import MenuBar from '../../../components/MenuBar';
import React, { useState, useEffect, useRef } from 'react';

Chart.register(...registerables);

const CompanyDashboard = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [recipientFilter, setRecipientFilter] = useState(''); // State for name filter input
  const [shareFilter, setShareFilter] = useState(''); // State for description filter input

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

  let client_data = [{'record_balances': {'granted': 1000,'future': 500,'available': 800,'exercised': 200},

  'agreement': {'agreement_id':'ishdhdjkhei','share_address': '0xShareAddr1','recipient': '0xRecipientAddr1','company_address': '0xCompanyAddr1',
  'expiration_date': '2023-12-31T23:59:59','strike_price': 3.14,'vesting': [['2020-01-01T15:00:20', 100], ['2021-01-01T15:00:20', 200]],
  'executions':[['2020-03-01T15:00:20', 40], ['2021-02-01T15:00:20', 90]],'post_termination_exercise_window': 90, 'terminated': 'Inactive'}},


  {'record_balances': {'granted': 2000,
'future': 1000,
'available': 1600,
'exercised': 400},
'agreement': {
'agreement_id':'iodudydio',
'share_address': '0xShareAddr2',
'recipient': '0xRecipientAddr2',
'company_address': '0xCompanyAddr2',
'expiration_date': '2023-12-31T23:59:59',
'strike_price': 6.28,
'vesting': [['2020-01-01T15:00:20', 200], ['2021-01-01T15:00:20', 400]],
'executions':[['2020-01-01T15:00:20', 100], ['2021-01-01T15:00:20', 200]],
'post_termination_exercise_window': 180, 'terminated': 'Active'}},
{'record_balances': {'granted': 3000,
'future': 1500,
'available': 2400,
'exercised': 600},
'agreement': {
'agreement_id':'uizgtspd',
'share_address': '0xShareAddr3',
'recipient': '0xRecipientAddr3',
'company_address': '0xCompanyAddr3',
'expiration_date': '2023-12-31T23:59:59',
'executions':[['2020-01-01T15:00:20', 100], ['2021-01-01T15:00:20', 200]],
'strike_price': 9.42,
'vesting': [['2020-01-01T15:00:20', 300], ['2021-01-01T15:00:20', 600]],
'post_termination_exercise_window': 270, 'terminated': 'Active'}}]


let totalContractSum  = 0
let totalAvailableShares = 0 
let totalExecutedShares = 0
let localsIDs = []
let localGranted = []
let background = ["#0BEAB9","#F8AE49","#075283","#652E5B"]
let colors = []

client_data.forEach(
  function(agreement_data,index) {
    totalContractSum+=agreement_data.record_balances.granted
    totalAvailableShares+=agreement_data.record_balances.available
    totalExecutedShares+=agreement_data.record_balances.exercised
    localGranted.push(agreement_data.record_balances.granted)
    localsIDs.push(agreement_data.agreement.recipient)
    colors.push(background[index%4])
});



let tableData = []
client_data.forEach(
  function(agreement_data) {
    tableData.push({
      ContractID: agreement_data.agreement.agreement_id,
      Recipient: agreement_data.agreement.recipient,
      Share: agreement_data.agreement.share_address,
      VestingStartDate: agreement_data.agreement.vesting[0],
      VestingEndDate: agreement_data.agreement.vesting[agreement_data.agreement.vesting.length - 1],
      ExpirationDate: agreement_data.agreement.expiration_date,
      PricePerShare: agreement_data.agreement.strike_price,
      Granted: agreement_data.record_balances.granted,
      Vested: agreement_data.record_balances.available + agreement_data.record_balances.exercised,
      Exercised: agreement_data.record_balances.exercised,
      Ownership: agreement_data.record_balances.granted/totalContractSum,
      Status: agreement_data.agreement.terminated
    })
});

    var ownershipData = {
      labels: localsIDs,
      datasets: [
          {
          data: localGranted,
          backgroundColor: colors,
          hoverBackgroundColor: colors
          }
      ]
      };

      
    

      var data = {
        labels: [
          "Granted Shares",
          "Available Shares",
          "Executed Shares"
        ],
        datasets: [
          {
            data: [totalContractSum, totalAvailableShares, totalExecutedShares],
            backgroundColor: [
              "#0BEAB9",
              "#F8AE49",
              "#075283"
            ],
            hoverBackgroundColor: [
              "#0BEAB9",
              "#F8AE49",
              "#075283"
            ]
          }
        ]
      };

  const handleRowClick = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  // Filter tableData based on name and description filters
  const filteredData = tableData.filter((row) => {
    return row.Recipient.toLowerCase().includes(recipientFilter.toLowerCase()) &&
           row.Share.toLowerCase().includes(shareFilter.toLowerCase());


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



  // Find the index of the maximum value in the data list
const maxIndex = ownershipData.datasets[0].data.indexOf(Math.max(...ownershipData.datasets[0].data));

// Get the highest number and its associated label
const highestNumber = ownershipData.datasets[0].data[maxIndex];
const highestLabel = ownershipData.labels[maxIndex];

  const OwnershipSharesChart = () => {
    const chartRef = useRef(null);
  
    useEffect(() => {

      const ctx = chartRef.current.getContext('2d');
  
      const chart = new Chart(ctx, {
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
      console.log("outter")
      // Register a custom plugin if needed for displaying text inside the doughnut
      Chart.register({
        id: 'customText',
        beforeDraw: (chart) => {
          let sum = 0;
          let text = '';
          let vestedText = '';
          console.log("out")
          if (chart.options.plugins.customText && (chart.canvas.id === 'authorizedshareschart' || chart.canvas.id === 'ownershipsharechart')) {
              console.log("in")
              const ctx = chart.ctx,
              width = chart.width,
              height = chart.height;
              console.log("Height", height)
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
    
              ctx.restore();
              var fontSize = Math.round(height / 114).toFixed(2);
              ctx.font = `bold ${fontSize}em sans-serif`;
              ctx.textBaseline = "middle";
              let textX = Math.round((width - ctx.measureText(text).width) / 2);
              let textY = height / 1.7;
              ctx.fillText(text, textX, textY - 15);
    
              var fontSize = 0.9;
              ctx.font = `${fontSize}em sans-serif`;
              textX = Math.round((width - ctx.measureText(vestedText).width) / 2);
              textY = height / 1.7;
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

  // Component to display dataset size
function DatasetSizeBox({ data }) {
  useEffect(() => {
    // Calculate the size of the dataset based on the number of labels
    const datasetSize = data.labels.length;

    // Update the visual representation of the dataset size
    const updateDatasetSizeVisual = () => {
      // Ensure the visual container for the dataset size is present
      let sizeBox = document.getElementById('datasetSizeBox');
      if (!sizeBox) {
        sizeBox = document.createElement('div');
        sizeBox.id = 'datasetSizeBox';
        document.body.appendChild(sizeBox);
      }

      // Create a new div for the dataset size value
      let sizeBoxDiv = document.createElement('div');
      sizeBoxDiv.innerText = `${datasetSize}`;
      // Style for the dataset size value to be larger
      sizeBoxDiv.style.textAlign = 'center';
      sizeBoxDiv.style.width = '100%';
      sizeBoxDiv.style.fontSize = '50px'; // Larger font size
      sizeBoxDiv.style.fontWeight = 'bold';

      // Create another div for the label "Total Shareholders"
      let sizeBoxDivLabel = document.createElement('div');
      sizeBoxDivLabel.innerText = 'Total Shareholders';
      // Style for the label to be smaller
      sizeBoxDivLabel.style.textAlign = 'center';
      sizeBoxDivLabel.style.width = '100%';
      sizeBoxDivLabel.style.fontSize = '16px'; // Smaller font size

      // Append both divs to sizeBox
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
      sizeBox.style.fontFamily = 'Arial'; // Default font family for Chart.js
      sizeBox.style.fontWeight = 'bold';
      sizeBox.style.borderRadius = '4px';
      sizeBox.style.marginTop = '20px';
    };

    updateDatasetSizeVisual();

    // Clean up function
    return () => {
      const sizeBox = document.getElementById('datasetSizeBox');
      if (sizeBox) {
        sizeBox.remove(); // Remove the sizeBox element when the component unmounts
      }
    };
  }, [data]);

  return null; // The component doesn't render any visible content
}

// Component to display available shares
function AvailableSharesBox({ data }) {
  useEffect(() => {
    // Update the visual representation of available shares
    const updateAvailableSharesVisual = () => {
      // Find the index of "Available Shares" in the labels array
      const availableSharesIndex = data.labels.indexOf('Available Shares');
      // Retrieve the value of "Available Shares" using the found index
      const availableSharesValue = data.datasets[0].data[availableSharesIndex];

      let sharesBox = document.getElementById('availableSharesBox');
      if (!sharesBox) {
        sharesBox = document.createElement('div');
        sharesBox.id = 'availableSharesBox';
        document.body.appendChild(sharesBox);
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
      sharesBox.style.fontFamily = 'Arial'; // Default font family for Chart.js
      sharesBox.style.fontWeight = 'bold';
      sharesBox.style.borderRadius = '4px';
      sharesBox.style.marginTop = '20px';
    };

    updateAvailableSharesVisual();

    // Clean up function
    return () => {
      const sharesBox = document.getElementById('availableSharesBox');
      if (sharesBox) {
        sharesBox.remove(); // Remove the sharesBox element when the component unmounts
      }
    };
  }, [data]);

  return null; // The component doesn't render any visible content
}



const Graphs = () => {
  // Define styles for the containers
  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const halfWidthStyle = {
    width: '50%', // Each chart takes up half the width of its container
  };

  const fullWidthStyle = {
    width: '100%', // Chart takes up the full width of its container
  };

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
      <div style={rowStyle}>
        <DatasetSizeBox data={data} style={halfWidthStyle}/>
        <AvailableSharesBox data={data} style={halfWidthStyle}/>
      </div>
    </div>
  );
};

// Adjusted Component to display dataset size
function DatasetSizeBox({ data }) {
  // Calculate the size of the dataset based on the number of labels
  const datasetSize = data.labels.length;

  return (
    <div id="datasetSizeBox" style={{ width: '210px', height: 'auto', backgroundColor: '#66A98E', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold', borderRadius: '4px', marginTop: '20px' }}>
      <div style={{ textAlign: 'center', width: '100%', fontSize: '50px', fontWeight: 'bold' }}>
        {datasetSize}
      </div>
      <div style={{ textAlign: 'center', width: '100%', fontSize: '16px' }}>
        Total Shareholders
      </div>
    </div>
  );
}
  

// Adjusted Component to display available shares
function AvailableSharesBox({ data }) {
  // Find the index of "Available Shares" in the labels array
  const availableSharesIndex = data.labels.indexOf('Available Shares');
  // Retrieve the value of "Available Shares" using the found index
  const availableSharesValue = data.datasets[0].data[availableSharesIndex];

  return (
    <div id="availableSharesBox" style={{ width: '210px', height: 'auto', backgroundColor: '#66A98E', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold', borderRadius: '4px', marginTop: '20px' }}>
      <div style={{ textAlign: 'center', width: '100%', fontSize: '50px', fontWeight: 'bold' }}>
        {availableSharesValue}
      </div>
      <div style={{ textAlign: 'center', width: '100%', fontSize: '16px' }}>
        Available Shares
      </div>
    </div>
  );
}

  

  return (
    <>
      <MenuBar />

      <div className="dashboardContainer">
        <table className="dashboardTable">
          <thead>
          <tr>
            <th colSpan="9">
              <div className="center-title" style={{textAlign: 'center'}}>
                <h1>Welcome to your Company's ESOP Dashboard!</h1>
                <h2>©2024 Equifiable</h2>
              </div>
            </th>
          </tr>


          <tr>
          <th colSpan="9"> 
            <div className="graphs_all">
              {Graphs()}
            </div>
          </th>
        </tr>

        <tr>
          <th colSpan="9">
            <div className="filters">
            <input 
          type="text" 
          placeholder="Filter by recipient..." 
          value={recipientFilter} 
          onChange={(e) => setRecipientFilter(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Filter by Shares..." 
          value={shareFilter} 
          onChange={(e) => setShareFilter(e.target.value)} 
        />
            </div>
          </th>
        </tr>
            <tr>
              <th>Contract ID</th>
              <th>Recipient Address</th>
              <th>Share Address</th>
              <th>Vesting Start Date</th>
              <th>Vesting End Date</th>
              <th>Expiration Date</th>
              <th>Price per Share</th>
              <th>Ownership</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr onClick={() => handleRowClick(index)} className="tableRow">
                  <td>{row.ContractID}</td>
                  <td>{row.Recipient}</td>
                  <td>{row.Share}</td>
                  <td>{row.VestingStartDate}</td>
                  <td>{row.VestingEndDate}</td>
                  <td>{row.ExpirationDate}</td>
                  <td>{row.PricePerShare}</td>
                  <td>{row.Ownership.toFixed(2)}</td>
                  <td>{row.Status}</td>
                </tr>
                {selectedRowIndex === index && (
                    <tr>
                        <td colSpan="9" className="detailRow">
                            <div className="rowContainer">
                                
                                <div className="additionalInfo">
                                <p><strong>TOTAL GRANTED:</strong> {row.Granted}</p>
                                <p><strong>VESTED:</strong> {row.Vested}</p>
                                <p><strong>EXERCISED:</strong> {row.Exercised}</p>
                                    

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
    </>
  );
};

export default CompanyDashboard;