import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './LandingPage.css'
import RedirectButton from '../../components/RedirectButon';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { createTheme, Grid, ThemeProvider } from '@material-ui/core';
import MenuBar from '../../components/MenuBar';
import './LandingPage.css';
import BlackBar from '../../components/BlackBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const defaultTheme = createTheme();

export default function LPage() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={defaultTheme}>
      <BlackBar/>
      <Grid container alignItems='center' justifyContent='center'>
    <div className="container">
      <img className="top-image" src={require('../../assets/logo_no_text.png').default} alt="Logo" />
      <img className="top-image" src={require('../../assets/name.png').default} alt="Logo" />
      <h1 className="header">Building trust to reward those who build​</h1>
      <div className="role-selector">
      </div>
    </div>
    </Grid>
    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center', height:'600px' }}>
      <h1>How does it work?</h1>
      <p style={{width:'100%', padding:'10px', fontSize:'25px', fontFamily:'monospace'}}> EquiFiable provides a Tezos blockchain-based platform for easy management of tokenized ESOPs, improving employee retention and simplifying equity distribution.​</p>
      <img className="top-image" src={require('../../assets/tezos.png').default} alt="Tezos" style={{align:'left'}} />
    </div>
    <div style={{ backgroundColor: '#156082', color: 'white', padding: '10px', textAlign: 'center', height:'600px' }}>
      <h1>The EquiFiable Team: Our Greatest Asset</h1>
      <p style={{width:'100%', fontSize:'25px', fontFamily:'monospace'}}>A team with multidisciplinary skills, ranging from Business to Full Stack development and Blockchain.​</p>
      <img className="top-image-group" src={require('../../assets/group.png').default} alt="Tezos" style={{align:'left'}} />
    </div>
    </ThemeProvider>
  );
}
