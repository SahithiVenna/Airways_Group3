import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
//import { Button } from 'react-bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css';



// const mystyle =
// {
//   backgroundImage: 'url(w.jpg)',
//   backgroundSize: "Cover",
//   height: "100vh",
//   color: "black",
//   padding: "40px"
// };




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();