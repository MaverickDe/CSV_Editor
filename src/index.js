import React   from "react";
import ReactDOM  from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import store from "./store"

import "./index.css";
// import './App.css';
import App from "./app"


  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div
    className="body"
    style={{
      // backgroundColor: " rgb(80, 2, 2)",
      width: "100vw",
      height: "100vh",
    }}
  >
    {/* <div className="con"> */}

    <Provider store={store}>
      <App />
    </Provider>
    {/* </div> */}

    <footer
      style={{
        zIndex: "200",
        position: "fixed",
        bottom: "0px",
        height: "50px",
        backgroundColor: "blue",
        width: "100%",
        textAlign:"center"
      }}
    >
      all right reserved
    </footer>
  </div>
);


