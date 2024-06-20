import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import ROUTES from "./constants/routes";
import Home from "./pages/Home";
import ManageBeneficiaries from "./pages/ManageBeneficiaries";

const {
  HOME, MANAGE_BENEFICIARIES
} = ROUTES

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={MANAGE_BENEFICIARIES} element={<ManageBeneficiaries />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
