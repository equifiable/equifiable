import React from 'react';
import TextField from '@material-ui/core/TextField';

const DateField = ({onChangeField}) => {
  return (
    <TextField
      required
      id="expiration-date"
      type="date"
      name="expiration-date"
      label="Expiration Date"
      fullWidth
      autoComplete="shipping address-line2"
      onInput={onChangeField}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          min: new Date().toISOString().split('T')[0], // Set min date to today
        },
      }}
    />
  );
};

export default DateField;