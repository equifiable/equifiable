import React from 'react';



class Connection {
    constructor(tezos, account, settings, setInfoSnack, setErrorSnack, hideSnack) {
      this.tezos = tezos;
      this.account = account;
      this.settings = settings;
      this.setInfoSnack = setInfoSnack;
      this.setErrorSnack = setErrorSnack;
      this.hideSnack = hideSnack;
    }
  
    getFirstDaysOfYearBetweenDurations = (selectedDateStr, cliffDurationYears, vestingDurationYears) => {
        const selectedDate = new Date(selectedDateStr);
        const startDate = new Date(selectedDate);
        startDate.setFullYear(selectedDate.getFullYear() + cliffDurationYears);
    
        const endDate = new Date(selectedDate);
        endDate.setFullYear(selectedDate.getFullYear() + vestingDurationYears);
    
        const firstDays = [];
    
        let currentDate = new Date(startDate.getFullYear(), 0, 1); // January 1st of start year
        while (currentDate <= endDate) {
          firstDays.push(new Date(currentDate));
          currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
    
        return firstDays;
      }

    async createContract() {
      
    const selectedDate = '2024-01-15';  // INPUT
    const cliffDurationYears = 1;       // INPUT
    const vestingDurationYears = 5;     // INPUT
    
    const firstDays = this.getFirstDaysOfYearBetweenDurations(selectedDate, cliffDurationYears, vestingDurationYears);
    
    const data = {
        share_address : 'KT1Gm5fVn3NwjJ8nP8F935cZcMAVZRGGZ6pH', 
        recipient : "tz1b6JeXpTagyy6K3J7hQNS2SbA2zwWezMBY", // recipient: Hash do funcionário (Lara)
        company_address : account, // company_address: hash de quem ta logado
        expiration_date : "2032-01-01T12:00:00Z", // Date(2034, 0, 1), // "2032-01-01T12:00:00Z", 
        strike_price : 10, // tez
        vesting : [
            ["2025-01-01T12:00:00Z", 10],  // Example: January 1, 2024 with 100 shares
            ["2026-01-01T12:00:00Z", 10], // Example: April 15, 2024 with 150 shares
            // Add more tuples as needed
        ],
        post_termination_exercise_window : 90 //nat Numero de dias que o funcionário pode comprar após ser demitido
        }
        
      try {
        const contract = await this.tezos.wallet.at(this.settings.contract);
        var res = await contract.methodsObject.create(data).send({
          amount: 1,
          storageLimit: 1,
          mutez: false
        });
        console.log('Result: ', res);
        // Handle success (e.g., update UI, notify user)
      } catch (error) {
        this.setErrorSnack(error.message);
        console.error(error.message);
        // Handle error (e.g., update UI, notify user)
      }
    }
  
    async executeContractAsClient() {
    const data = {
        amount: 10 // Number of shares
        };
      // Logic to execute a contract
      try {
        const contract = await this.tezos.wallet.at(/* agreement_hash */);
        var res = await contract.methodsObject.execute(data).send({
          amount: 1,
          storageLimit: 1,
          mutez: false
        });
        console.log('Result: ', res);
        // Handle success
      } catch (error) {
        this.setErrorSnack(error.message);
        console.error(error.message);
        // Handle error
      }
    }
  }