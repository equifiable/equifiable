import React from 'react';
import { useReady, useWallet, useConnect } from '../dappstate';
import { useSettingsContext } from '../settings.js';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
//import { useTheme } from '@mui/material/styles';

const WalletButton = (props) => {
  //const theme = useTheme();
  const ready = useReady();
  const wallet = useWallet();
  const connect= useConnect();
  const { settings } = useSettingsContext();
  const handleConnect = React.useCallback(async () => {
    try {
      await connect(settings.network);
    } catch (err) {
      alert(err.message);
    };
  }, [connect, settings.network]);
  return ((ready) ? (
        <div></div>
      ) :(wallet ? (
          <Button variant="outlined"
            onClick={handleConnect}>
            connect to wallet
          </Button>
        ):(
          <Link href="https://templewallet.com/" rel="noopener" underline="none">
            <Button variant="contained" disableElevation
              style={{
                backgroundColor: '#ed8936',
                color: 'white',
                fontWeight: 'bold',
                }}>
              install Temple
            </Button>
          </Link>
      )));
}

export default WalletButton;
