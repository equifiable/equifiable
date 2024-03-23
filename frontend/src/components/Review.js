import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={12}>
      <div><b>Employee address:</b> {window.esop_info.address}</div>
      <div><b>Stock address:</b> {window.esop_info.stock_address}</div>
      <div><b>Emission date:</b> {window.esop_info.emission_date}</div>
      <div><b>Expiration date:</b> {window.esop_info.expiration_date}</div>
      <div><b>Strike price:</b> {window.esop_info.strike_price}</div>
      <div><b>Cliff:</b> {window.esop_info.cliff}</div>
      <div><b>Vesting:</b> {window.esop_info.vesting}</div>
      <div><b>Number shares:</b> {window.esop_info.number_shares}</div>
      <div><b>Fired expiration:</b> {window.esop_info.fired_expiration}</div>
      <div><b>Number of shares:</b> {window.esop_info.number_shares}</div>

       </Grid>
      </Grid>
    </React.Fragment>
  );
}