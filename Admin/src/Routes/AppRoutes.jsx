import React from 'react'
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';
import Memberships from '../Pages/Memberships/Memberships';
import Logout from '../Pages/Logout/Logout';
import Members from '../Pages/Members/Members';
import Memberprofile from '../Components/Memberprofile/Memberprofile';
import UpdateMember from '../Components/UpdateMember/UpdateMember';
import Employee from '../Pages/Employee/Employee';
import AddEmployee from '../Components/AddEmployee/AddEmployee';
import Employeeprofile from '../Components/Employeeprofile/Empolyeeprofile';
import UpadateEmployee from '../Components/UpdateEmployee/UpdateEmployee';
import VerifyEmail from '../Components/VerifyEmail/VerifyEmail';
import RenewMemberPlan from '../Components/RenewMemberPlan/RenewMemberPlan';
import PaySalary from '../Components/PaySalary/PaySalary';
const AppRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/memberships' element={<Memberships />}/>
        <Route path='/employee' element={<Employee />}/>
        <Route path='/addEmployee' element={<AddEmployee />}/>
        <Route path='/members' element={<Members />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/memberDetails/:id' element={<Memberprofile />}/>
        <Route path='/memberupdate/:id' element={<UpdateMember />}/>
        <Route path='/employeeupdate/:id' element={<UpadateEmployee />}/>
        <Route path='/employeeDetails/:id' element={<Employeeprofile />}/>
        <Route path='/verifyEmail' element={<VerifyEmail />}/>
        <Route path='/renewPlan/:id' element={<RenewMemberPlan />}/>
        <Route path='/paySalary/:id' element={<PaySalary />}/>
        
    </Routes>
)
}

export default AppRoutes