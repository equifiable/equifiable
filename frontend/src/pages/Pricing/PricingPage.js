import React from 'react';
import './pricing.css';
import MenuBar from '../../components/MenuBar';
import Sidebar from '../../components/SideBar';
import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useTezos, useAccountPkh } from '../../dappstate';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

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

const SUBSCRIPTION_CONTRACT = "KT1Ksw2QMVjaUjFciKruxCajHvbNR9m28gmC";

function PricingPage() {
  const classes = useStyles();
  const tezos = useTezos();
  const account = useAccountPkh(); // Public key
  const navigate = useNavigate();

  const subscribe = () => {
    tezos.wallet
    .at(SUBSCRIPTION_CONTRACT)
    .then((c) => {
      console.log(c.contractViews)
      return c.methodsObject.subscribe(1).send({amount: 1.5, mutez: false});
    })
    .then((hasSignature) => {
      navigate('/company/dashboard');
    })
    .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    if (!account) {
      navigate("/login_company");
    }
  }, [account]);

  return (
    <React.Fragment>
      <CssBaseline />
      <MenuBar />
      {/* <Sidebar /> */}
      <Grid container alignItems='center' justifyConcent='center'>
      <main className={classes.layout}>
          <h1 className="text-center mt-5">Choose Your Plan</h1>
            <div className="col-md-6">
            <Paper className={classes.paper}>
                <div className="card-body">
                  <h5 className="card-title">Monthly Subscription</h5>
                  <p className="card-text">199 TZ/Month + 10 TZ per agreement</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Access to all features</li>
                    <li className="list-group-item">24/7 customer support</li>
                    <li className="list-group-item">Cancel anytime</li>
                  </ul>
                  <Button className={classes.button} onClick={subscribe}>Choose Monthly Plan</Button>
                </div>
                </Paper>
              </div>
            
        </main>
      </Grid>
    </React.Fragment>
  );
}

export default PricingPage;
