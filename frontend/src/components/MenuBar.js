import React from 'react';
import {AppBar, Toolbar } from '@material-ui/core';
import logo from '../assets/logo_no_text.png'; // Import your logo image
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
            <img className="top-image" src={logo} alt="Uber Logo" style={{ width: '70px', height: 'auto' }}/>
        </Toolbar>
    </AppBar>
  );
}

export default MenuBar;