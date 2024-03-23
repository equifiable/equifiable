import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './EmployeeDashboard.css';
import MenuBar from '../../../components/MenuBar';


Chart.register(...registerables);

const EmployeeDashboard = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [CompanyFilter, setCompanyFilter] = useState(''); // State for name filter input
  const [OptionGrantFilter, setOptionGrantFilter] = useState(''); // State for description filter input



  tableData = [{'record_balances': {'granted': 1000,'future': 500,'available': 800,'exercised': 200},
                  'agreement': {'agreement_id':'ishdhdjkhei','share_address': '0xShareAddr1','recipient': '0xRecipientAddr1','company_address': '0xCompanyAddr1','expiration_date': '2023-12-31T23:59:59','strike_price': 3.14,'vesting': [('2020-01-01T15:00:20', 100), ('2021-01-01T15:00:20', 200)],'post_termination_exercise_window': 90}
              },
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
  'vesting': [('2020-01-01T15:00:20', 200), ('2021-01-01T15:00:20', 400)],
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
  'vesting': [('2020-01-01T15:00:20', 300), ('2021-01-01T15:00:20', 600)],
  'post_termination_exercise_window': 270}}]


  client_data = joazinho.request_data(client)
  client_data.forEach(
    function(agreement_data) {
      tableData.push({
        ContractID: agreement_data.agreement.agreement_id,
        Company: agreement_data.agreement.company_address,
        Share: agreement_data.agreement.share_address,
        VestingStartDate: agreement_data.agreement.vesting[0],
        VestingEndDate: agreement_data.agreement.vesting[-1],
        ExpirationDate: agreement_data.agreement.expiration_date,
        PricePerShare: agreement_data.agreement.strike_price,
        Granted: record_balances.granted,
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
           row.OptionGranted.toLowerCase().includes(OptionGrantFilter.toLowerCase());
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
      <h2>Dashboard Title</h2>
      <p>This is an example text placed above the table.</p>
      <div>
        {/* Inputs for filtering */}
        <input 
          type="text" 
          placeholder="Filter by Company..." 
          value={CompanyFilter} 
          onChange={(e) => setCompanyFilter(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Filter by Option Grant..." 
          value={OptionGrantFilter} 
          onChange={(e) => setOptionGrantFilter(e.target.value)} 
        />
      </div>
      <div className="dashboardContainer">
        <table className="dashboardTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Adress</th>
              <th>Share Adress</th>
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
                                    <p><strong>TOTAL GRANTED:</strong>row.Granted</p>
                                    <p><strong>VESTED:</strong> row.Vested</p>
                                    <p><strong>EXERCISED:</strong> row.Exercised</p>
                                    
                                    {/* Duplicate expiration date line removed for clarity */}
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
                                              min="0" // Ensures the HTML input element itself restricts to non-negative values
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
