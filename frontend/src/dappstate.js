import React from 'react';
import constate from 'constate';
import { TempleWallet } from '@temple-wallet/dapp';

export const [
  DAppProvider,
  useWallet,
  useTezos,
  useAccountPkh,
  useReady,
  useConnect,
] = constate(
  useDApp,
  (v) => v.wallet,
  (v) => v.tezos,
  (v) => v.accountPkh,
  (v) => v.ready,
  (v) => v.connect
);

function useDApp({ appName }) {
  const [{ wallet, tezos, accountPkh }, setState] = React.useState(() => ({
    wallet: null,
    tezos: null,
    accountPkh: null,
  }));

  const ready = Boolean(tezos);

  React.useEffect(() => {
    return TempleWallet.onAvailabilityChange((available) => {
      setState({
        wallet: available ? new TempleWallet(appName) : null,
        tezos: null,
        accountPkh: null,
      });
    });
  }, [setState, appName]);

  const connect = React.useCallback(
    async (network, opts) => {
      try {
        if (!wallet) {
          throw new Error('Temple Wallet not available');
        }
        await wallet.connect(network, opts);
        const tzs = wallet.toTezos();
        const pkh = await tzs.wallet.pkh();
        setState({
          wallet,
          tezos: tzs,
          accountPkh: pkh,
        });
      } catch (err) {
        alert(`Failed to connect to Temple Wallet: ${err.message}`);
      }
    },
    [setState, wallet]
  );

  return {
    wallet,
    tezos,
    accountPkh,
    ready,
    connect,
  };
}
