import { useState } from 'react';
import constate from "constate";

export function useSnackState() {

  const [snackState,setState] = useState({
    show : false,
    severity : "info",
    msg: ""
  });

  const setInfoSnack = (msg) => { setState({
      show: true, severity: "info", msg: msg
    });
  }

  const setErrorSnack = (txt) => { setState({
       show: true, severity: "error", msg: txt
    });
  }

  const hideSnack = () => { setState(v => {
      return { ...v, show : false };
    });
  }

  return { snackState, setInfoSnack, setErrorSnack, hideSnack };
}

export const [SnackProvider, useSnackContext] = constate(useSnackState);