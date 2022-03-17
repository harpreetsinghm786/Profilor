import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Profile from './components/Profile/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import Login from './components/Login/Login';
import ProfileViewer from "./components/Profileviewer/ProfileViewer"



const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>

      
      <Route path="/" element={<App />} />
      <Route path="profile" element={<Profile />} />
      <Route path='login' element={<Login/>}/>
      <Route path='profileviewer' element={<ProfileViewer/>}/>

    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
