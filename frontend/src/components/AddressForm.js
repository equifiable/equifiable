import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateField from './DateField';




export default function AddressForm() {

  
      const handleTextFieldChange = (event) => {
        console.log('WORKING!')
        const newaddress = event.target.value;
        window.esop_info.address = newaddress;
        console.log(window.esop_info.address);
      };
    
    
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Employee Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          /> */}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="employee_address"
            name="address1"
            label="Employee address"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12}>
            <DateField/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="strike_price"
            name="city"
            label="Strike price"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        {/* 
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            type="number"
            id="cliff"
            name="address1"
            label="cliff"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}