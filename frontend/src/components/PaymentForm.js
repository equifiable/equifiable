import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateField from './DateField';

export default function PaymentForm() {

    const change_stock_address = (event) => {
        console.log('WORKING!')
        const newaddress = event.target.value;
        window.esop_info.stock_address = newaddress;
        console.log(window.esop_info.address);
    };

    const change_expiration_date = (event) => {
        console.log('WORKING!')
        const value = event.target.value;
        window.esop_info.expiration_date = value;
        console.log(window.esop_info.expiration_date);
    };

    const change_cliff = (event) => {
        console.log('WORKING!')
        const value = event.target.value;
        window.esop_info.cliff = value;
        console.log(window.esop_info.cliff);
    };

    const change_number_shares = (event) => {
        console.log('WORKING!')
        const value = event.target.value;
        window.esop_info.number_shares = value;
        console.log(window.esop_info.number_shares);
    };
    
    const change_strike_price = (event) => {
        console.log('WORKING!')
        const value = event.target.value;
        window.esop_info.strike_price = value;
        console.log(window.esop_info.strike_price);
    };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Stock option package
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
      <TextField
            required
            id="stock_address"
            name="city"
            label="Stock address"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={change_stock_address}
          />
       </Grid>
      <Grid item xs={12}>
        <TextField
        required
        id="expiration-date"
        type="date"
        name="expiration-date"
        label="Expiration Date"
        fullWidth
        autoComplete="shipping address-line2"
        onInput={change_expiration_date}
        InputLabelProps={{
            shrink: true,
        }}
        InputProps={{
            inputProps: {
            min: new Date().toISOString().split('T')[0], // Set min date to today
            },
        }}
        />
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
            onInput={change_strike_price}
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
            onInput={change_cliff}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="number"
            id="number_shares"
            name="address1"
            label="number_shares"
            fullWidth
            autoComplete="shipping address-line1"
            onInput={change_number_shares}
          />
        </Grid>    
      </Grid>
    </React.Fragment>
  );
}