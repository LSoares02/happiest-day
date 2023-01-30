import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home/index";
import GlobalStateProvider from "./hooks/globalState";
import About from "./pages/About";

export default function Router() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Routes>
          <Route path={"/"} element={<Navigate replace to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
