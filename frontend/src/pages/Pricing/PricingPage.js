import React from 'react';
import './pricing.css';
import MenuBar from '../../components/MenuBar';
import Sidebar from '../../components/SideBar';
import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

function PricingPage() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuBar />
      <Sidebar />
      <Grid container alignItems='center' justifyConcent='center'>
      <main className={classes.layout}>
          <h1 className="text-center mt-5">Choose Your Plan</h1>
            <div className="col-md-6">
            <Paper className={classes.paper}>
                <div className="card-body">
                  <h5 className="card-title">Monthly Subscription</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla justo eget aliquet.</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Access to all features</li>
                    <li className="list-group-item">24/7 customer support</li>
                    <li className="list-group-item">Cancel anytime</li>
                  </ul>
                  <button className="btn btn-primary mt-3">Choose Monthly Plan</button>
                </div>
                </Paper>
              </div>
            
            <div className="col-md-6">
                <Paper className={classes.paper}>
                <div className="card-body">
                  <Grid container alignItems='center' justifyConcent='center'>
                  <h5 className="card-title">Yearly Subscription</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla justo eget aliquet.</p>
                  </Grid>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Access to all features</li>
                    <li className="list-group-item">24/7 customer support</li>
                    <li className="list-group-item">Save 20% with yearly billing</li>
                  </ul>
                  <button className="btn btn-primary mt-3">Choose Yearly Plan</button>
                </div>
              </Paper>
            </div>
        </main>
      </Grid>
    </React.Fragment>
  );
}

export default PricingPage;
