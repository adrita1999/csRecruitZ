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
import Register from "./my_components/Register";
import Register_2 from "./my_components/Register_2";
import Register_3 from "./my_components/Register_3";
import Register_4 from "./my_components/Register_4";
import Appliedjoblist from "./my_components/appliedjoblist";


import Home from "./my_components/Home";
import Quiz from "./my_components/Quiz"
import Tag from "./my_components/Tag.js"
import "bootstrap/dist/css/bootstrap.min.css";
import Shortlistedjoblist from "./my_components/shortlistedjoblist";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Personal />} />
        <Route path="/professional" element={< Professional/>} />
        <Route path="/joblist" element={< Joblist/>} />
        <Route path="/register" element={< Register/>} />
        <Route path="/register2" element={< Register_2/>} />
      <Route path="/register3" element={< Register_3/>} />
      <Route path="/register4" element={< Register_4/>} />

        <Route path="/jobdetails" element={< Jobdetails/>} />
      <Route path="/applied" element={<Appliedjoblist/>} />
      <Route path="/shortlisted" element={<Shortlistedjoblist/>} />
        <Route path="/quiz" element={< Quiz/>} />
        <Route path="/tag" element={< Tag/>} />
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
