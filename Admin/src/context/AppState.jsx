import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { useContext } from "react";
import axios from "axios";

export const AppContextHook = () => {
  return useContext(AppContext);
};

const AppState = ({ children }) => {
  //api base urll
  const apiUrl = "http://localhost:3000/api";

  const [spinner, setSpinner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    getAdminDetails();
  }, [])
  

  ///user api calls
  const register = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/user/registerAdmin`, data, {
        withCredentials: true,
      });
      console.log("regitser res", res);
      return res;
    } catch (error) {
      console.log("register err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const login = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/user/loginAdmin`, data, {
        withCredentials: true,
      });
      console.log("loginAdmin res", res);
      getAdminDetails();
      return res;
    } catch (error) {
      console.log("loginAdmin err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const logout = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/user/adminLogout`, {
        withCredentials: true,
      });
      console.log("logout res", res);
      getAdminDetails();
      return res;
    } catch (error) {
      console.log("logout err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const getAdminDetails = async () => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/user/getAdminDetails`, {
        withCredentials: true,
      });
      console.log("getAdminDetails res", res);
      setIsLoggedIn(true);
      return res;
    } catch (error) {
      console.log("getAdminDetails err", error);
      setIsLoggedIn(false);
      return error;
    } finally {
      setSpinner(false);
    }
  };


  return (
    <AppContext.Provider value={{ spinner,register,login,logout,isLoggedIn }}>{children}</AppContext.Provider>
  );
};

export default AppState;
