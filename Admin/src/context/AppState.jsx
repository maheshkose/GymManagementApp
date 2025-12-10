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

  const logout = async () => {
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
  const getOtp = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/user/getGamilVerificationOtp`, data, {
        withCredentials: true,
      });
      console.log("get otp res", res);
      return res;
    } catch (error) {
      console.log("get otp err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const verifyOtp = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/user/verifyGmailOtp`, data, {
        withCredentials: true,
      });
      console.log("get otp res", res);
      return res;
    } catch (error) {
      console.log("get otp err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };


  //membership plans routes
  const addPlan = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/plan/createPlan`, data, {
        withCredentials: true,
      });
      console.log("createPlan res", res);
      return res;
    } catch (error) {
      console.log("createPlan err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const updatePlan = async (data,planId) => {
    setSpinner(true);

    try {
      const res = await axios.put(`${apiUrl}/plan/updatePlan/${planId}`, data, {
        withCredentials: true,
      });
      console.log("updatePlan res", res);
      return res;
    } catch (error) {
      console.log("updatePlan err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const deletePlan = async (planId) => {
    setSpinner(true);

    try {
      const res = await axios.delete(`${apiUrl}/plan/deletePlan/${planId}`, {
        withCredentials: true,
      });
      console.log("deletePlan res", res);
      return res;
    } catch (error) {
      console.log("deletePlan err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

   const getAllPlans = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/plan/getAllPlans`, {
        withCredentials: true,
      });
      console.log("getAllPlans res", res);
      return res;
    } catch (error) {
      console.log("getAllPlans err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const getPlanById = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/plan/getPlanById/${planId}`, data, {
        withCredentials: true,
      });
      console.log("getAllPlans res", res);
      return res;
    } catch (error) {
      console.log("getAllPlans err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  //Employee routes
  const addEmployee = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/employee/add`, data, {
        withCredentials: true,
      });
      console.log("add employee res", res);
      return res;
    } catch (error) {
      console.log("add employee err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const getAllEmployee = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/employee/getAllEmployee`, {
        withCredentials: true,
      });
      console.log("get all employee res", res);
      return res;
    } catch (error) {
      console.log("get all employee err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const getEmployeeById = async (id) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/employee/getEmployeeById/${id}`, {
        withCredentials: true,
      });
      console.log("get employee res", res);
      return res;
    } catch (error) {
      console.log("get employee err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const updateEmployeeById = async (id,data) => {
    setSpinner(true);

    try {
      const res = await axios.put(`${apiUrl}/employee/updateEmployeeById/${id}`, data, {
        withCredentials: true,
      });
      console.log("update employee res", res);
      return res;
    } catch (error) {
      console.log("update employee err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const deleteEmployeeById = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.delete(`${apiUrl}/employee/deleteEmployeeById/${id}`, {
        withCredentials: true,
      });
      console.log("delete employee res", res);
      return res;
    } catch (error) {
      console.log("delete employee err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const addEmployeeAttendenceById = async (id) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/employee/addAttendenceOfEmployee/${id}`, {
        withCredentials: true,
      });
      console.log("addEmployeeAttendence res", res);
      return res;
    } catch (error) {
      console.log("addEmployeeAttendence err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const deleteEmployeeAttendenceById = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/employee/deleteAttendenceOfEmployee`,data, {
        withCredentials: true,
      });
      console.log("deleteAttendenceOfEmployee employee res", res);
      return res;
    } catch (error) {
      console.log("deleteAttendenceOfEmployee err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  //members routes
  const createMember = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/members/createMember`, data, {
        withCredentials: true,
      });
      console.log("createMember res", res);
      return res;
    } catch (error) {
      console.log("createMember err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const getAllMembers = async () => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/members/getAllMembers`, {
        withCredentials: true,
      });
      console.log("getAllMembers res", res);
      return res;
    } catch (error) {
      console.log("getAllMembers err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const getAllLiveMembers = async () => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/members/getAllLiveMembers`, {
        withCredentials: true,
      });
      console.log("getAllLiveMembers res", res);
      return res;
    } catch (error) {
      console.log("getAllLiveMembers err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const getAllExpiredMembers = async () => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/members/getAllExpiredMembers`, {
        withCredentials: true,
      });
      console.log("getAllExpiredMembers res", res);
      return res;
    } catch (error) {
      console.log("getAllExpiredMembers err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const getMemberById = async (id) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/members/getMemberById/${id}`, {
        withCredentials: true,
      });
      console.log("getAllMembers res", res);
      return res;
    } catch (error) {
      console.log("getAllMembers err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const updateMemberById = async (id,data) => {
    setSpinner(true);

    try {
      const res = await axios.patch(`${apiUrl}/members/updateMemberById/${id}`, data,{
        withCredentials: true, headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("updateMemberById res", res);
      return res;
    } catch (error) {
      console.log("updateMemberById err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };

  const deleteMemberById = async (id) => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/members/deleteMemberById/${id}`, {
        withCredentials: true,
      });
      console.log("deleteMemberById res", res);
      return res;
    } catch (error) {
      console.log("deleteMemberById err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  // membersStats
const getmembersStats = async () => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/members/getMembersStats`, {
        withCredentials: true,
      });
      console.log("getmembersStats res", res);
      return res;
    } catch (error) {
      console.log("getmembersStats err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const seedMembersStats = async () => {
    setSpinner(true);

    try {
      const res = await axios.get(`${apiUrl}/members/seedMembersStats`, {
        withCredentials: true,
      });
      console.log("/seedMembersStats res", res);
      return res;
    } catch (error) {
      console.log("/seedMembersStats err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const renewMemberPlan = async (id,data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/members/renewPlan/${id}`, data, {
        withCredentials: true,
      });
      console.log("renewMemberPlan res", res);
      return res;
    } catch (error) {
      console.log("renewMemberPlan err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };


//Attendence routes
   const addAttendence = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/members/addAttendence`, data, {
        withCredentials: true,
      });
      console.log("addAttendence res", res);
      return res;
    } catch (error) {
      console.log("addAttendence err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  const deleteAttendence = async (data) => {
    setSpinner(true);

    try {
      const res = await axios.post(`${apiUrl}/members/deleteAttendence`, data, {
        withCredentials: true,
      });
      console.log("deleteAttendence res", res);
      return res;
    } catch (error) {
      console.log("deleteAttendence err", error);
      return error;
    } finally {
      setSpinner(false);
    }
  };
  


  






  return (
    <AppContext.Provider value={{ spinner,register,login,logout,isLoggedIn,updatePlan,deletePlan,addPlan,getAllPlans,getPlanById,addEmployee,getAllEmployee,getEmployeeById,updateEmployeeById,deleteEmployeeById,addEmployeeAttendenceById,deleteEmployeeAttendenceById, createMember,getAllMembers,getAllExpiredMembers,getAllLiveMembers,getMemberById,updateMemberById,deleteMemberById,addAttendence,deleteAttendence,getmembersStats, getOtp, verifyOtp,renewMemberPlan }}>{children}</AppContext.Provider>
  );
};

export default AppState;
