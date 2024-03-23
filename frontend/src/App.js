import './App.css';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import { DAppProvider } from './dappstate';
import { SnackProvider } from './snackstate';
import { appName, alegreya, courier } from './settings';
import Snack from './components/Snack';
import WalletButton from './components/WalletButton';
import { SettingsPanel } from './components/Settings';

import { TezosToolkit } from '@taquito/taquito';
import { SettingsProvider, useSettingsContext } from './settings.js';
import { useState } from 'react';

import Button from '@mui/material/Button';
import { useTezos, useAccountPkh } from './dappstate';
import { useSnackContext } from './snackstate';
import { UnitValue } from '@taquito/taquito';

import { Connection } from './components/Connection';
/* FIXME: Step 3.1 */

const BidButton = () => {
  const tezos = useTezos();
  const account = useAccountPkh(); // public key
  const { settings } = useSettingsContext();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const bid = async () => {
    try {
      const contract  = await tezos.wallet.at(settings.contract);
      var res = await contract.contractViews.getVested().executeView({
        source: account,
        viewCaller: account
      });
      console.log('Vested: ', res.toNumber())
      // const operation = await contract.methods.bid(UnitValue).send({ amount: 10 });
      // const shorthash = operation.opHash.substring(0, 10) + "...";
      // setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      // await operation.receipt();
      // hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
    }
  }
  return (
    <Button onClick={ bid } variant="outlined" disabled={ account === null }>
      post bid
    </Button>);
}


const CreateContractButton = () => {
  const tezos = useTezos();
  const account = useAccountPkh(); // public key
  const { settings } = useSettingsContext();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();

  const getFirstDaysOfYearBetweenDurations = (selectedDateStr, cliffDurationYears, vestingDurationYears) => {
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
  
  const selectedDate = '2024-01-15'; 
  const cliffDurationYears = 1; 
  const vestingDurationYears = 5; 
  
  const firstDays = getFirstDaysOfYearBetweenDurations(selectedDate, cliffDurationYears, vestingDurationYears);
  // console.log(firstDays);

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
  console.log(data);

  const bid = async () => {
    try {
      const contract  = await tezos.wallet.at(settings.contract);
      var res = await contract.methodsObject.create(data).send({
        amount: 1,
        storageLimit: 1,
        mutez: false
    });
      console.log('Result: ', res)

    } catch (error) {
      setErrorSnack(error.message);
      console.log(error.message);
    }
  }
  return (
    <Button onClick={ bid } variant="outlined" disabled={ account === null }>
      Create Contract
    </Button>);
}


const ExecuteContractAsClient = () => {
  const tezos = useTezos();
  const account = useAccountPkh(); // public key
  agreement_hash = "KT18h8ABd4LsA8szJ6aSa6zhpFfnv65pk9kB"
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();

  data = {
    amount: 10 // Number of shares
  }

  const bid = async () => {
    try {
      const contract  = await tezos.wallet.at(agreement_hash);

      var res = await contract.methodsObject.execute(data).send({
        amount: 1,
        storageLimit: 1,
        mutez: false
    });
      console.log('Result: ', res)

    } catch (error) {
      setErrorSnack(error.message);
      console.log(error.message);
    }
  }
  return (
    <Button onClick={ bid } variant="outlined" disabled={ account === null }>
      Execute Contract
    </Button>);
}



/* FIXME: Step 6.1 */

function App() {
  const tezos = useTezos();
  const account = useAccountPkh(); // Public key
  const { settings } = useSettingsContext();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });
  return (
    <DAppProvider appName={ appName }>
    <SettingsProvider>
    <ThemeProvider theme={ theme }>
    <SnackProvider>
      <CssBaseline />
      <div className="App">
        <Container style={{ marginTop: 50 }}>
          <Grid container spacing={3}>
            { /* FIXME: Step 3.2 Start */ }
            <Grid item xs={12}>
              <Typography variant="h2" style={{ fontFamily : alegreya }}>
                Completium
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Edit <code>src/App.js</code> and save to reload.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link
                href="https://completium.com/dapps"
                target="_blank" rel="noopener noreferrer"
                style={{ color: theme.palette.primary.light }}
              >
                <Typography variant="h6">
                  Learn everything about DApps
                </Typography>
              </Link>
            </Grid>
            { /* FIXME: Step 3.2 End */ }

            { /* FIXME: Step 4.2 */ }

            { /* FIXME: Step 6.2 */ }

            <Grid item xs={12}>
            {/* <BidButton /> */}
            <CreateContractButton />
            <ExecuteContractAsClient />
            <Connection
              tezos={tezos}
              account={account}
              settings={settings}
              setInfoSnack={setInfoSnack}
              setErrorSnack={setErrorSnack}
              hideSnack={hideSnack}
            />
          </Grid>
            <Grid item xs={12}>
            <WalletButton />
          </Grid>
          </Grid>
        </Container>
      </div>
      <SettingsPanel/>
      <Snack />
    </SnackProvider>
    </ThemeProvider>
    </SettingsProvider>
    </DAppProvider>
  );
}

export default App;
