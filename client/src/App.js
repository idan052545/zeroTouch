import React, { useState, useEffect } from "react";
import axios from "axios";
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "./components/form-input/form-input";
import { Link } from "react-router-dom";
import Header from "./components/header/header";
import { Routes, Route, Navigate } from "react-router-dom";
import QuestionsPage from "./pages/questions-page";

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <div>
      <Header />
      <QuestionsPage />
    </div>
  );
};

export default App;
