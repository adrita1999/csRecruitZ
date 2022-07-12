import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route,BrowserRouter,Routes} from "react-router-dom";
import Personal from "./my_components/Personal";
import Professional from "./my_components/Professional";
import Joblist from "./my_components/jobpostlist";
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Personal />} />
        <Route path="/professional" element={< Professional/>} />
        <Route path="/joblist" element={< Joblist/>} />
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
