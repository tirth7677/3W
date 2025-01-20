import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import UserSubmission from "./pages/UserSubmission";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/dashboard" element={<div>Admin Dashboard Placeholder</div>} />
      <Route path="/user-submission" element={<UserSubmission />} />;
    </Routes>
  );
};

export default App;