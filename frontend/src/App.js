import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
import DecisionPage from './pages/Login/Decision.js';
import LogIn from './pages/Login/LogIn'

/* FIXME: Step 3.1 */

/* FIXME: step 4.1 */

/* FIXME: Step 6.1 */

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });
  return (
    // <DAppProvider appName={ appName }>
    // <SettingsProvider>
    // <ThemeProvider theme={ theme }>
    // <SnackProvider>
    //   <CssBaseline />
    //   <div className="App">
    //     <Container style={{ marginTop: 50 }}>
    //       <Grid container spacing={3}>
    //         { /* FIXME: Step 3.2 Start */ }
    //         <Grid item xs={12}>
    //           <Typography variant="h2" style={{ fontFamily : alegreya }}>
    //             Completium
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Typography variant="h6">
    //             Edit <code>src/App.js</code> and save to reload. Testing if it works!!!!
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Link
    //             href="https://completium.com/dapps"
    //             target="_blank" rel="noopener noreferrer"
    //             style={{ color: theme.palette.primary.light }}
    //           >
    //             <Typography variant="h6">
    //               Learn everything about DApps
    //             </Typography>
    //           </Link>
    //         </Grid>
    //         { /* FIXME: Step 3.2 End */ }

    //         { /* FIXME: Step 4.2 */ }

    //         { /* FIXME: Step 6.2 */ }

    //         { /* FIXME: Step 4.3 */ }
    //       </Grid>
    //     </Container>
    //   </div>
    //   <SettingsPanel/>
    //   <Snack />
    // </SnackProvider>
    // </ThemeProvider>
    // </SettingsProvider>
    // </DAppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/decision" element={<DecisionPage />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
