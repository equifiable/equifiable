import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './EmployeeDashboard.css';
import MenuBar from '../../../components/MenuBar';
import React, { useState, useEffect, useRef } from 'react';



Chart.register(...registerables);

const EmployeeDashboard = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [CompanyFilter, setCompanyFilter] = useState(''); // State for name filter input
  const [ShareFilter, setShareFilter] = useState(''); // State for description filter input



  let client_data = [{'record_balances': {'granted': 1000,'future': 500,'available': 800,'exercised': 200},
                  'agreement': {'agreement_id':'ishdhdjkhei','share_address': '0xShareAddr1','recipient': '0xRecipientAddr1','company_address': '0xCompanyAddr1','expiration_date': '2023-12-31T23:59:59','strike_price': 3.14,'vesting': [['2020-01-01T15:00:20', 100], ['2021-01-01T15:00:20', 200]],'post_termination_exercise_window': 90}},
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
                'post_termination_exercise_window': 180}},
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
                'strike_price': 9.42,
                'vesting': [['2020-01-01T15:00:20', 300], ['2021-01-01T15:00:20', 600]],
                'post_termination_exercise_window': 270}}]


  let tableData = []
  client_data.forEach(
    function(agreement_data) {
      tableData.push({
        ContractID: agreement_data.agreement.agreement_id,
        Company: agreement_data.agreement.company_address,
        Share: agreement_data.agreement.share_address,
        VestingStartDate: agreement_data.agreement.vesting[0],
        VestingEndDate: agreement_data.agreement.vesting[agreement_data.agreement.vesting.length - 1],
        ExpirationDate: agreement_data.agreement.expiration_date,
        PricePerShare: agreement_data.agreement.strike_price,
        Granted: agreement_data.record_balances.granted,
        Vested: agreement_data.record_balances.available + agreement_data.record_balances.exercised,
        Exercised: agreement_data.record_balances.exercised,
      })
  });


  

  const handleRowClick = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  // Filter tableData based on name and description filters
  const filteredData = tableData.filter((row) => {
    return row.Company.toLowerCase().includes(CompanyFilter.toLowerCase()) &&
           row.Share.toLowerCase().includes(ShareFilter.toLowerCase());
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



  // Custom hook to generate timestamps
const useGenerateTimestamps = () => {
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const generateTimestamps = () => {
      let tempTimestamps = [];
      let startDate = new Date('2022-09-01'); // Start from September 2022
      let endDate = new Date('2026-09-01'); // End at September 2026

      for (let date = startDate; date <= endDate; date.setMonth(date.getMonth() + 1)) {
        tempTimestamps.push(date.getTime() / 1000); // Convert to Unix timestamp in seconds
      }

      setTimestamps(tempTimestamps);
    };

    generateTimestamps();
  }, []);

  return timestamps;
};




// MixedChart component
const MixedChart = () => {
  const chartRef = useRef(null);
  const timestamps = useGenerateTimestamps();

  useEffect(() => {


    //if (timestamps.length > 0 && chartRef.current) {
      //const ctx = chartRef.current.getContext('2d');
      
      // Dados fictícios para os datasets, substitua conforme necessário
      const optionsVestedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900];
      const optionsExecutedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850];
      const optionsGrantedData = Array(38).fill(1900);
      
      // Convertendo timestamps para rótulos legíveis
      const labels = timestamps.map(timestamp => {
        const date = new Date(timestamp * 1000);
        return `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
      });

      // Use aggregated data for the chart
      
      const ctx = chartRef.current.getContext('2d');
    
      // Inicialização do gráfico com a configuração específica
      const mixedChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            { 
              data: optionsExecutedData,
              type: "line",
              label: "Executed Shares",
              backgroundColor: "#fdc27c",
              borderColor: "#f8ae49",
              fill: true,
              pointRadius: 1,
              pointHoverRadius: 1
            }, 
            { 
              data: optionsVestedData,
              type: "line",
              label: "Vested Shares",
              backgroundColor: "#4285f4",
              borderColor: "#075283",
              fill: true,
              pointRadius: 1,
              pointHoverRadius: 1
            }, 
            { 
              data: optionsGrantedData,
              type: "line",
              label: "Granted Shares",
              backgroundColor: "transparent",
              borderColor: "#0BEAB9",
              fill: false,
              pointRadius: 0,
              pointHoverRadius: 1
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Vesting Schedule'
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: { 
              display: true,
              title: {
                display: true,
                text: 'Number of Shares'
              },
              grid: {
                display: false
              }
            },
            x: { 
              display: true,
              title: {
                display: true,
                text: 'Time of Employment'
              },
              grid: {
                display: false
              },
              barPercentage: 1.0,
              categoryPercentage: 1.0
          }
        }
      }
    });

    return () => {
      mixedChart.destroy();
  }
}, [timestamps]); // Re-run effect if timestamps change

  return (
    <div style={{ maxWidth: '35%', height:'400px',margin: 'auto' }}>
    <canvas ref={chartRef}></canvas>
    </div>
    );
  };

  const DoughnutChart = () => {
    const chartRefa = useRef(null);
    const timestamps = useGenerateTimestamps();
  
    useEffect(() => {
      // Assuming the calculation for vested and executed shares is handled outside and data is static for demonstration
      const optionsVestedData = [350, 650]; // Example vested data [currentVestedShares, remainder]
      const totalGrantedShares = 1000; // Total shares for example
  
      // Calculate vesting percentage
      const vestingPercentage = (optionsVestedData[0] / totalGrantedShares) * 100;
  
      const vestedData = {
        labels: ['Vested Shares', 'Remaining'],
        datasets: [{
          data: [vestingPercentage, 100 - vestingPercentage],
          backgroundColor: ['#4285f4', '#e9ecef'],
          hoverBackgroundColor: ['#3578e5', '#dde2e6']
        }]
      };
  
      if (chartRefa.current) {
        const ctx = chartRefa.current.getContext('2d');
        
        // Initialize the doughnut chart
        const doughnutChart = new Chart(ctx, {
          type: 'doughnut',
          data: vestedData,
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Current Vesting Percentage'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label;
                    const percentage = context.raw.toFixed(2);
                    return `${label}: ${percentage}%`;
                  }
                }
              },
              legend: {
                display: true // Adjust based on your requirement
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });
  
        // Register a custom plugin if needed for displaying text inside the doughnut
        Chart.register({
          id: 'customTextInsideDoughnut',
          beforeDraw: function(chart) {
            if (chart.config.type === 'doughnut') {
              const ctx = chart.ctx,
                    width = chart.width,
                    height = chart.height;
              ctx.restore();
              let fontSize = (height / 114).toFixed(2);
              ctx.font = `${fontSize}em sans-serif`;
              ctx.textBaseline = "middle";
              const text = `${vestingPercentage.toFixed(2)}%`,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
        });
  
        // Cleanup on component unmount
        return () => doughnutChart.destroy();
      }
    }, [timestamps]); // Depend on any external dynamic data if necessary
  
    return (
      <div style={{ maxWidth: '50%', height: '400px', margin: 'auto' }}>
        <canvas ref={chartRefa}></canvas>
      </div>
    );
  };




// DoughnutChartComponent
const DoughnutChartComponent = () => {
  const chartRef = useRef(null);
  const timestamps = useGenerateTimestamps();

  useEffect(() => {
    // Assuming you have functions and data setup as needed
    const optionsExecutedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    function getCurrentMonthDataIndex(data, targetMonth, targetYear) {
      const timestamps = data.map(timestamp => new Date(timestamp * 1000)); // Convert timestamps to dates (assuming timestamps are in seconds)
      
      for (let i = 0; i < timestamps.length; i++) {
        if (timestamps[i].getMonth() === targetMonth && timestamps[i].getFullYear() === targetYear) {
          return i;
        }
      }
      
      // Handle case where target month/year not found in data
      console.error("Target month and year not found in data!");
      return -1; // Or return any appropriate value to indicate not found
    }
    
    // You would define getCurrentMonthDataIndex, timestamps, optionsExecutedData, and optionsVestedData here or import them
    const currentMonthIndex = getCurrentMonthDataIndex(timestamps, currentMonth, currentYear);
    const currentExecutedShares = optionsExecutedData[currentMonthIndex];
    const totalGrantedShares = optionsExecutedData[optionsExecutedData.length - 1];
    const executingPercentage = (currentExecutedShares / totalGrantedShares) * 100;

    const executedData = {
      labels: [`Executed Shares`],
      datasets: [{
        data: [executingPercentage, 100 - executingPercentage],
        backgroundColor: ['#f8ae49', 'white'],
        hoverBackgroundColor: ['#f8ae49', 'white'],
      }]
    };

    const doughnutChart = chartRef.current ? new Chart(chartRef.current.getContext('2d'), {
      type: 'doughnut',
      data: executedData,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Current Executing Percentage'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label;
                const total = context.dataset.data.reduce((prev, curr) => prev + curr, 0);
                const currentValue = context.raw;
                const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                return `${label}: ${percentage}%`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        rotation: 0.5 * Math.PI
      }
    }) : null;

    // Cleanup function to destroy chart instance on component unmount
    return () => {
      if (doughnutChart) {
        doughnutChart.destroy();
      }
    };
  }, [timestamps]); // Depend on variables that might change your chart data

  return (
    <div style={{ maxWidth: '50%', height: '400px', margin: 'auto' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

  

  return (
<>
  <MenuBar />
  <head>
  <title>ESOP Dashboard Explanation</title>
  </head> 
  <body>

  <div class="explanation">
    <h1>Welcome to Your ESOP Dashboard!</h1>



    <h2>Take Control of Your Ownership Journey:</h2>
  </div>

</body>


  {DoughnutChart()}
  {MixedChart()}
  {DoughnutChartComponent()}

  <div className="dashboardContainer">
    <table className="dashboardTable">
      <thead>
        <tr>
          <th colSpan="7"> 
            <div className="filters">
              <input 
                type="text" 
                placeholder="Filter by Company..." 
                value={CompanyFilter} 
                onChange={(e) => setCompanyFilter(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <input 
                type="text" 
                placeholder="Filter by Share..." 
                value={ShareFilter} 
                onChange={(e) => setShareFilter(e.target.value)} 
              />
            </div>
          </th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Company Address</th>
          <th>Share Address</th>
          <th>Vesting Start Date</th>
          <th>Vesting End Date</th>
          <th>Expiration Date</th>
          <th>Price per Share</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr onClick={() => handleRowClick(index)} className="tableRow">
              <td>{row.ContractID}</td>
              <td>{row.Company}</td>
              <td>{row.Share}</td>
              <td>{row.VestingStartDate}</td>
              <td>{row.VestingEndDate}</td>
              <td>{row.ExpirationDate}</td>
              <td>{row.PricePerShare}</td>
            </tr>
            {selectedRowIndex === index && (
                <tr>
                    <td colSpan="7" className="detailRow">
                        <div className="rowContainer">
                                <p><strong>TOTAL GRANTED:</strong> {row.Granted}</p>
                                <p><strong>VESTED:</strong> {row.Vested}</p>
                                <p><strong>EXERCISED:</strong> {row.Exercised}</p>
                                <div className="actionContainer">
                                  <table>
                                    <tr>
                                      <p className="promptText">
                                        <strong>Shares to execute</strong>
                                      </p>
                                    </tr>
                                    <tr>
                                      <td>
                                        <input
                                          className="numericInput"
                                          type="number"
                                          value={inputValue}
                                          onChange={handleInputChange}
                                          placeholder="Shares to execute?"
                                          min="0"
                                        />
                                      </td>
                                      <td>
                                        <button className="executeButton" onClick={handleExecuteClick}>EXECUTE</button>
                                      </td>
                                    </tr>
                                  </table>
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

export default EmployeeDashboard;
