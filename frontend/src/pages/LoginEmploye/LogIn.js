import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Hyperlink from '../../components/HyperLink';
import MenuBar from '../../components/MenuBar';
import { useTezos, useAccountPkh } from '../../dappstate';
import { useSnackContext } from '../../snackstate';
import { SettingsProvider, useSettingsContext } from '../../settings.js';
import WalletButton from '../../components/WalletButton';
import { SnackProvider } from '../../snackstate.js';
import { SettingsPanel } from '../../components/Settings.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import Snack from '../../components/Snack';
import { DAppProvider } from '../../dappstate';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
  const tezos = useTezos();
  const account = useAccountPkh(); // Public key
  const { settings } = useSettingsContext();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (account) {
      navigate("/employee/dashboard");
    }
  }, [account]);
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <SettingsProvider>
      <MenuBar/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          <Grid item xs={12}>
             <WalletButton />
           </Grid>
        </Box>
      </Container>
      </SettingsProvider>
    </ThemeProvider>
  );
}