import React from "react";
//import axios from "axios";
import Header from "./components/header/header";
import { Routes, Route } from "react-router-dom";
import QuestionsPage from "./pages/questions-page";
import FieldCollection from "./components/field-collection/field-collection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home-page";
import ProtectedRoute from "./pages/protected-route";

//const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <FieldCollection />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
