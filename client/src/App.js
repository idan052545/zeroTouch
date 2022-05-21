import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/header/header";
import { Routes, Route, Navigate } from "react-router-dom";
import QuestionsPage from "./pages/questions-page";
import FieldCollection from "./components/field-collection/field-collection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home-page";
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Container, Row, Col } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/user" element={<FieldCollection />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
