import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/saidbar";
import Appliances from "./pages/classes";

const App = () => {
  return (
    <Router>
      <div className="">
        <Sidebar />
      </div>
    </Router>
  );
};

export default App;
