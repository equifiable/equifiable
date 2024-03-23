import constate from "constate";
import { useState } from 'react';

export function useSettings() {

  const [settings,setState] = useState({
    network  : 'ghostnet',
    endpoint : 'https://rpc.ghostnet.teztnets.com',
    contract : 'KT1QkgJnq8ifhn97f85u6Sc4XDubLFHCau5m', // Factory contract   
    show     : false,
  });

  const setNetwork = (nw) => { setState((s) => {
      return { ...s, network: nw };
    });
  }

  const setEndpoint = (ep) => { setState((s) => {
      return { ...s, endpoint: ep };
    });
  }

  const setContract = (c) => { setState((s) => {
      return { ...s, contract: c };
    });
  }

  const hideSettings = () => { setState((s) => {
      return { ...s, show: false };
    })
  }

  const showSettings = () => { setState((s) => {
      return { ...s, show: true };
    })
  }

  const getBcdUrl = () => {
    return 'https://better-call.dev/' + settings.network + '/' + settings.contract;

  }

  return { settings, setNetwork, setEndpoint, setContract, hideSettings, showSettings, getBcdUrl };
}

export const [SettingsProvider, useSettingsContext] = constate(useSettings);

export const appName = "My First Completium DApp"

// fonts
export const courier = "Courier Prime, monospace";
export const alegreya = "Alegreya Sans SC, sans-serif";
