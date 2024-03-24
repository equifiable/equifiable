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
                  'agreement': {'agreement_id':'ishdhdjkhei','share_address': '0xShareAddr1','recipient': '0xRecipientAddr1','company_address': '0xCompanyAddr1',
                  'expiration_date': '2023-12-31T23:59:59','strike_price': 3.14,'vesting': [['2020-01-01T15:00:20', 100], ['2021-01-01T15:00:20', 200]],
                  'executions':[['2020-03-01T15:00:20', 40], ['2021-02-01T15:00:20', 90]],'post_termination_exercise_window': 90}},
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
                'executions':[['2020-01-01T15:00:20', 100], ['2021-01-01T15:00:20', 200]],
                'strike_price': 9.42,
                'vesting': [['2020-01-01T15:00:20', 300], ['2021-01-01T15:00:20', 600]],
                'post_termination_exercise_window': 270}}]

    let totalExecutedArray = []
    let totalVestedArray = []

    
    
    
    client_data.forEach(
      function(agreement_data,index) {

        let totalExecuted = 0
        let totalVested = 0

        totalExecutedArray.push([])
        totalVestedArray.push([])

        for(var i=0;i<client_data[index].agreement.vesting.length;++i){
          totalVested+=client_data[index].agreement.vesting[i][1]
          totalVestedArray[totalVestedArray.length-1].push(totalVested)
        }
    
        for(var i=0;i<client_data[index].agreement.executions.length;++i){
          totalExecuted+=client_data[index].agreement.executions[i][1]
          totalExecutedArray[totalExecutedArray.length-1].push(totalExecuted)
        }

        


    });

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
      client_data[0].agreement.vesting.forEach(
        function(data) {
          // Directly store the parsed date (in milliseconds) in the array
          tempTimestamps.push(Date.parse(data[0]));
      });

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
      //let optionsVestedData = client_data[0].agreement.vesting[0]

      let optionsVestedData = []
      let sum = 0 
      client_data[0].agreement.vesting.forEach(
        function(data) {
          sum+=data[1]
          optionsVestedData.push(sum)
      });



      let optionsExecutedData = []
      sum=0
      client_data[0].agreement.executions.forEach(
        function(data) {
          sum+=data[1]
          optionsExecutedData.push(sum)
      });


      
      const optionsGrantedData = Array(client_data[0].agreement.vesting.length).fill(client_data[0].record_balances.granted);
      
      // Convertendo timestamps para rótulos legíveis
      const labels = timestamps.map(timestamp => {
        const date = new Date(timestamp);
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
    <div style={{ maxWidth: '75%', height:'500px',margin: 'auto' }}>
    <canvas ref={chartRef}></canvas>
    </div>
    );
  };

  const DoughnutChart = () => {
    const chartRefa = useRef(null);
    const timestamps = useGenerateTimestamps();
  
    useEffect(() => {
      // Assuming the calculation for vested and executed shares is handled outside and data is static for demonstration
      //const optionsVestedData = [350, 650]; // Example vested data [currentVestedShares, remainder]
      let optionsVestedData = []
      client_data[0].agreement.vesting.forEach(
        function(data) {
          optionsVestedData.push(data[1])
      });

      const totalGrantedShares = client_data[0].record_balances.granted; // Total shares for example
  
      // Calculate vesting percentage
      const vestingPercentage = (optionsVestedData[optionsVestedData.length-1] / totalGrantedShares) * 100;
  
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
              customTextInsideDoughnut:{
                text:'50%'
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
            if (chart.config.type === 'doughnut' && chart.canvas.id === 'doughnutChartVesting') {
              const ctx = chart.ctx,
                    width = chart.width,
                    height = chart.height;
              ctx.restore();
              let fontSize = (height / 114).toFixed(2);
              ctx.font = `bold ${fontSize}em sans-serif`;
              ctx.textBaseline = "middle";
              const text = Math.floor(vestingPercentage+0.5)+"%",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 1.7;
              ctx.fillText(text, textX, textY-15);
              fontSize = (height / 480).toFixed(2);
              ctx.font = `${fontSize}em sans-serif`;
              ctx.textBaseline = "middle";
              const vestedtext = "Total Vested Shares";
              ctx.fillText(vestedtext, textX, textY+25);
              ctx.save();
            }
          }
        });
  
        // Cleanup on component unmount
        return () => doughnutChart.destroy();
      }
    }, [timestamps]); // Depend on any external dynamic data if necessary
  
    return (
      <div style={{ maxWidth: '75%', height: '400px', margin: 'auto' }}>
        <canvas id="doughnutChartVesting" ref={chartRefa}></canvas>
      </div>
    );
  };




// DoughnutChartComponent
const DoughnutChartComponent = () => {
  const chartRefaa = useRef(null);
  const timestamps = useGenerateTimestamps();

  useEffect(() => {
    // Assuming the calculation for vested and executed shares is handled outside and data is static for demonstration
    //const optionsVestedData = [350, 650]; // Example vested data [currentVestedShares, remainder]
    let optionsExecutedData = []
    client_data[0].agreement.executions.forEach(
      function(data) {
        optionsExecutedData.push(data[1])
    });

    const totalGrantedShares = client_data[0].record_balances.granted; // Total shares for example

    // Calculate vesting percentage
    const executingPercentage = (optionsExecutedData[optionsExecutedData.length-1] / totalGrantedShares) * 100;

    const executedData = {
      labels: ['Executed Shares', 'Remaining'],
      datasets: [{
        data: [executingPercentage, 100 - executingPercentage],
        backgroundColor: ['#f8ae49', '#e9ecef'],
        hoverBackgroundColor: ['#eb8c09', '#dde2e6']
      }]
    };

    if (chartRefaa.current) {
      const ctx = chartRefaa.current.getContext('2d');
      
      // Initialize the doughnut chart
      const doughnutChartcomponent = new Chart(ctx, {
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
                  const percentage = context.raw.toFixed(2);
                  return `${label}: ${percentage}%`;
                }
              }
            },
            customTextInsideDoughnutcomponent:{
              text:'50%'
            }
            ,
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
        id: 'customTextInsideDoughnutcomponent',
        beforeDraw: function(chart) {
          if (chart.config.type === 'doughnut' && chart.canvas.id === 'doughnutChartExecuting') {
            const ctx = chart.ctx,
                  width = chart.width,
                  height = chart.height;
            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = `bold ${fontSize}em sans-serif`;
            ctx.textBaseline = "middle";
            var text = Math.floor(executingPercentage+0.5)+"%",
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 1.7;
            ctx.fillText(text, textX, textY-15);
            var fontSize = (height / 480).toFixed(2);
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textBaseline = "middle";
            const executedtext = "Total Executed Shares";
            var textX = Math.round((width - ctx.measureText(executedtext).width) / 2);
            ctx.fillText(executedtext, textX, textY+25);
            ctx.save();
          }
        }
      });

      // Cleanup on component unmount
      return () => doughnutChartcomponent.destroy();
    }
  }, [timestamps]); // Depend on variables that might change your chart data

  return (
    <div style={{ maxWidth: '75%', height: '400px', margin: 'auto' }}>
      <canvas id="doughnutChartExecuting" ref={chartRefaa}></canvas>
    </div>
  );
};


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
          {DoughnutChart()}
        </div>
        <div style={halfWidthStyle}>
          {DoughnutChartComponent()}
        </div>
      </div>

      {/* Row for the Mixed chart */}
      <div style={fullWidthStyle}>
        {MixedChart()}
      </div>
    </div>
  );
};

  

  return (
<>
  
  <head>
  </head> 
  <body>

</body>
  <div className="dashboardContainer">
    <table className="dashboardTable">
      <thead>
      <tr>
        <th colSpan="7">
            <div className="empty" style={{ height: '600px' }}>
            </div>
        </th>
    </tr>

          <tr>
            <th colSpan="7">
              <div className="center-title" style={{textAlign: 'center'}}>
                <h1>Welcome to your Personal ESOP Dashboard!</h1>
                <h2>©2024 Equifiable</h2>
              </div>
            </th>
          </tr>

          <tr>
            <th colSpan="7">
              <div className="title-charts" style={{textAlign: 'center'}}>
                <h3>State of Last Agreement</h3>
              </div>
            </th>
          </tr>

          

        
        <tr>
          <th colSpan="7"> 
            <div className="graphs_all">
              {Graphs()}
            </div>
          </th>
        </tr>
        
        <tr>
          <th colSpan="7">
          <div className="center-title">
            <h1>Your others ESOPs:</h1>
            </div> 
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
                                <p><strong>VESTED:</strong> {totalVestedArray[index][totalVestedArray[index].length-1]}</p>
                                <p><strong>EXERCISED:</strong> {totalExecutedArray[index][totalExecutedArray[index].length-1]}</p>
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
</>
  );
};

export default EmployeeDashboard;