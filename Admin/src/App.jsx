import React from "react";
import { AppContextHook } from "./context/AppState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import Header from "./Components/Header/Header";
import Spinner from "./Components/Spinner/Spinner";
import Login from "./Components/Login/Login";
import { ToastContainer, toast,Bounce } from "react-toastify";

const App = () => {
  const { isLoggedIn } = AppContextHook();

  return (
    <div className="outer-container">
      <div className="app">
        <Router>
          <Spinner />
          {isLoggedIn ? <></> : <Login />}
          <div className="sidebar-el">
            <SideBar />
          </div>
          <div className="pages">
            <div className="header-element">
              <Header />
            </div>
            <div className="main-content">
              
              <AppRoutes />
            </div>
          </div>
          {/* <div className="footer">footer</div> */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </Router>
      </div>
    </div>
  );
};

export default App;
