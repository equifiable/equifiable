import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSnackContext } from '../snackstate';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snack = () => {
    const { snackState, hideSnack } = useSnackContext();
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      hideSnack();
    };
    return (
      <Snackbar
        open={snackState.show}
        onClose={handleClose}
        autoHideDuration={10000}
        anchorOrigin={{ vertical : 'bottom', horizontal : 'center' }}
        key={ 'bottomcenter' } >
          <Alert onClose={handleClose} severity={snackState.severity}>
            {snackState.msg}
          </Alert>
      </Snackbar>)
}

export default Snack