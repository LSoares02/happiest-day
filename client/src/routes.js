import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useParams,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import GlobalStateProvider from "./hooks/globalState";

export default function Router() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Routes>
          <Route path={"/"} element={<Navigate replace to={"/home"} />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
