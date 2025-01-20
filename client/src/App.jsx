import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import UserSubmission from "./pages/UserSubmission";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-submission" element={<UserSubmission />} />;
    </Routes>
  );
};

export default App;