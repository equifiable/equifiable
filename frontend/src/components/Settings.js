import { Button } from '@mui/material';
import React from 'react';
import { useSettingsContext } from '../settings';
import SettingsIcon from '@mui/icons-material/Settings';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';

function isInvalidAddress (v) {
  const lgt = v.length;
  const tz1 = v.startsWith('KT1');
  return (lgt !== 36) | !tz1;
}

export const SettingsPanel = (props) => {
  const { settings, setContract, setNetwork, setEndpoint, hideSettings } = useSettingsContext();
  const [ addr, setAddr ] = React.useState(settings.contract);
  const [ network, setNet ] = React.useState(settings.network);
  const [ endpoint, setEnd ] = React.useState(settings.endpoint);
  const isAddrError = () => {
    return addr.length > 0 & isInvalidAddress(addr);
  }
  const handleSave = () => {
    setContract(addr);
    setNetwork(network);
    setEndpoint(endpoint);
    props.reloadStorage();
    hideSettings();
  }
  return (
    <Dialog onClose={ hideSettings } aria-labelledby="simple-dialog-title" open={ settings.show }>
      <DialogTitle id="simple-dialog-title">Settings</DialogTitle>
      <DialogContent>
          <DialogContentText>
            Fill the form below to point the DApp interface to another Smart Contract, network or endpoint.
          </DialogContentText>
          <Grid container spacing={3} style={{ maringBottom: '12px' }}>
            <Grid item xs={12}>
              <TextField
                value={ addr }
                onChange={ e => setAddr(e.target.value) }
                id="contract"
                label="Smart Contract Address"
                color="secondary"
                fullWidth
                error={ isAddrError() }
                helperText={(isAddrError())?"Invalid address format":""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={ network }
                onChange={ e => setNet(e.target.value) }
                id="network"
                label="Network"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={ endpoint }
                onChange={ e => setEnd(e.target.value) }
                id="endpoint"
                label="Endpoint"
                color="secondary"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={ hideSettings } color="secondary">
            Cancel
          </Button>
          <Button onClick={ handleSave } color="secondary">
            Save
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export const SettingsButton = (props) => {
  const { showSettings } = useSettingsContext();
  return (<Button onClick={ showSettings }  style={{ color: 'white' }} component="span">
    <SettingsIcon />
  </Button>)
}