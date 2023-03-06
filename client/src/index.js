import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GlobalStateProvider from "./hooks/globalState";

import "./global.scss";

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_OAUTH}>
    <React.StrictMode>
      <GlobalStateProvider>
        <Routes />
      </GlobalStateProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
