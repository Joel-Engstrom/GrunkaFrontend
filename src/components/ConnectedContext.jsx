import { createContext } from "react";

const ConnectedContext = createContext({
  connected: false,
  setConnected: (auth) => {}
});

export default ConnectedContext;