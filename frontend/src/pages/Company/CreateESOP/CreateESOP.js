import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Review from '../../../components/Review';
import AddressForm from '../../../components/AddressForm';
import PaymentForm from '../../../components/PaymentForm';
import MenuBar from '../../../components/MenuBar';
import { useTezos, useAccountPkh } from '../../../dappstate';
import Sidebar from '../../../components/SideBar';
import Footer from '../../../components/Footer';
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

const steps = ['Employee', 'Data', 'Review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

function distributeNumbersAcrossDates(dates, totalNumber) {
  const numberOfDates = dates.length;
  const baseNumber = Math.floor(totalNumber / numberOfDates);
  const remainder = totalNumber % numberOfDates;
  const distribution = [];

  for (let i = 0; i < numberOfDates; i++) {
    let numberForDate = baseNumber;
    // Add the remainder to the last date
    if (i === numberOfDates - 1) {
      numberForDate += remainder;
    }
    distribution.push([dates[i], numberForDate]);
  }

  return distribution;
}

export default function CreateESOP() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const tezos = useTezos();
  const account = useAccountPkh(); 

  const getFirstDaysOfYearBetweenDurations = (selectedDateStr, cliffDurationYears, vestingDurationYears) => {
    const selectedDate = new Date(selectedDateStr);
    const startDate = new Date(selectedDate);
    startDate.setFullYear(selectedDate.getFullYear() + Number(cliffDurationYears));
  
    const endDate = new Date(selectedDate);
    endDate.setFullYear(selectedDate.getFullYear() + Number(vestingDurationYears));
  
    const firstDays = [];
  
    let currentDate = new Date(startDate.getFullYear(), 0, 1); // January 1st of start year
    while (currentDate <= endDate) {
      firstDays.push(new Date(currentDate));
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
  
    return firstDays;
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!account) {
      navigate("/login_company");
    }
  }, [account]);
  

  const firstDays = getFirstDaysOfYearBetweenDurations(
    window.esop_info.emission_date, 
    window.esop_info.cliff, 
    window.esop_info.vesting
  );
  const vesting = distributeNumbersAcrossDates(firstDays, window.esop_info.number_shares);
  console.log(firstDays);
  console.log(vesting);

  const handleNext = () => {
    
    setActiveStep(activeStep + 1);
    // Final step
    if (activeStep == steps.length-1) {
      const data = {
        share_address : window.esop_info.stock_address, 
        recipient : window.esop_info.address,
        company_address : account,
        expiration_date : new Date(window.esop_info.expiration_date), 
        strike_price : window.esop_info.strike_price, // tez
        vesting : vesting,
        post_termination_exercise_window : 90
      }
      console.log(data);
      
      tezos.wallet
      .at('KT1V53JYPRhBjyoCFXcr9kMCQVDtPoRrs9Bp')
      .then((c) => {
        return c.methodsObject.create(data).send({
          amount: 1,
        });
      })
      .then((op) => {
        console.log(`Waiting for ${op.opHash} to be confirmed...`);
        return op.confirmation(3).then(() => op.opHash);
      })
      .then((hash) => console.log(`Operation injected: ${hash}`))
      .catch((error) => console.log(`Error: ${error}`));
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <MenuBar/>
      <Sidebar/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create Stock Option Agreement
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                    ESOP created successfully!
                </Typography>
                <Typography variant="subtitle1">
                  
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Generate ESOP' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}