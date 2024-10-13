import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';  // Ensure client-side rendering
import { Chart, registerables } from 'chart.js';
import './CompanyDashboard.css';

Chart.register(...registerables);  // Register Chart.js components dynamically

// Dynamically load the Line component from react-chartjs-2 for client-side rendering only
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });

const CompanyDashboard = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [recipientFilter, setRecipientFilter] = useState(''); // State for recipient filter
  const [shareFilter, setShareFilter] = useState(''); // State for share filter
  const [filteredData, setFilteredData] = useState([]); // Filtered table data

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

  // Assuming you have a function that fetches data and sets the filtered data
  useEffect(() => {
    // Fetch and filter data based on recipientFilter and shareFilter
    const fetchData = async () => {
      const data = await req(); // Assuming req() fetches the data
      const tableData = data.map(agreement_data => ({
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
        Ownership: agreement_data.record_balances.granted / totalContractSum,
        Status: agreement_data.agreement.terminated
      }));

      const filtered = tableData.filter(row => 
        row.Recipient.toLowerCase().includes(recipientFilter.toLowerCase()) &&
        row.Share.toLowerCase().includes(shareFilter.toLowerCase())
      );
      setFilteredData(filtered);
    };

    fetchData();
  }, [recipientFilter, shareFilter]);

  return (
    <>
      <div className="dashboardContainer">
        <table className="dashboardTable">
          <thead>
            <tr>
              <th colSpan="9">
                <div className="center-title" style={{ textAlign: 'center' }}>
                  <h1>Welcome to your Company's ESOP Dashboard!</h1>
                  <h2>©2024 Equifiable</h2>
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
              <React.Fragment key={row.ContractID}>
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
      {/* Render the chart below the table */}
      <div className="chartContainer">
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default CompanyDashboard;
