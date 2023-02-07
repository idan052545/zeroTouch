import React, { useEffect } from "react";
//import axios from "axios";
import Header from "./components/header/header";
import { Routes, Route } from "react-router-dom";
import QuestionsPage from "./pages/questions-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home-page";
import ProtectedRoute from "./pages/protected-route";
import ConfigPage from "./pages/config-page";
import UserPage from "./pages/user-page";

import ShowPage from "./pages/show-page";
//const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/show" element={<ShowPage />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
