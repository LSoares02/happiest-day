import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useParams,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import OtherPage from "./pages/OtherPage/index";
import GlobalStateProvider from "./hooks/globalState";

export default function Router() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Routes>
          <Route path={"/"} element={<Navigate replace to={"/en/home"} />} />
          <Route
            path={"/:language"}
            element={<Navigate replace to={"/pt/home"} />}
          />
          <Route path="/:language/home" element={<Dashboard />} />
          <Route path="/:language/more" element={<OtherPage />} />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
