import React from 'react';
import {AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import logo from '../assets/logo_no_text.png'; // Import your logo image
import { makeStyles } from '@material-ui/core/styles';
import { useTezos, useAccountPkh } from '../dappstate';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BarButton from './BarButon';

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

function MenuBar() {
  const classes = useStyles();
  const account = useAccountPkh(); 
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("account");
    navigate("/");
  }

  return (
    <AppBar position="absolute" color="default" style={{ backgroundColor: 'black' }}>
      <Toolbar>
        <IconButton aria-label="delete" onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
        <Typography component="h1" variant="h4" align="center">
          Equifiable
        </Typography>
        <div style={{ marginLeft: 'auto' }}> {/* Pushes buttons to the right */}
          <BarButton to='/login_company'  variant="outlined" style={{ color: 'white', borderColor: 'white', borderRadius: '30px', marginRight: '10px' }}>
            For Companies
          </BarButton>
          <BarButton  to='/login' variant="outlined" style={{ color: 'white', borderColor: 'white', borderRadius: '30px' }}>
            For Employees
          </BarButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MenuBar;