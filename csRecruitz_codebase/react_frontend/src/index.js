import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route,BrowserRouter,Routes} from "react-router-dom";
import Personal from "./my_components/Personal";
import Professional from "./my_components/Professional";

import Joblist from "./my_components/jobpostlist";
import Jobdetails from "./my_components/jobdetails";

import Home from "./my_components/Home";
import Quiz from "./my_components/Quiz"
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Personal />} />
        <Route path="/professional" element={< Professional/>} />

        <Route path="/joblist" element={< Joblist/>} />
        <Route path="/jobdetails" element={< Jobdetails/>} />
        <Route path="/quiz" element={< Quiz/>} />
        <Route path="/home" element={< Home/>} />
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
