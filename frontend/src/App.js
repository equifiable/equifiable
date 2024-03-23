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


/* FIXME: Step 6.1 */

function App() {
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
            <BidButton />
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
