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
import DeleteMember from '../Components/DeleteMember/DeleteMember';
import DeleteEmployee from '../Components/DeleteEmployee/DeleteEmployee';
import Finance from '../Pages/Finance/Finance';
import AddExpense from '../Pages/Finance/AddExpense/AddExpense';
import ExpenseList from '../Pages/Finance/ExpenseList/ExpenseList';
import RevenueList from '../Pages/Finance/RevenueList/RevenueList';
import PayDue from '../Components/PayDue/PayDue';
const AppRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/memberships' element={<Memberships />}/>
        <Route path='/employee' element={<Employee />}/>
        <Route path='/finance' element={<Finance />}/>
        <Route path='/addEmployee' element={<AddEmployee />}/>
        <Route path='/members' element={<Members />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/memberDetails/:id' element={<Memberprofile />}/>
        <Route path='/memberupdate/:id' element={<UpdateMember />}/>
        <Route path='/employeeupdate/:id' element={<UpadateEmployee />}/>
        <Route path='/employeeDetails/:id' element={<Employeeprofile />}/>
        <Route path='/verifyEmail' element={<VerifyEmail />}/>
        <Route path='/renewPlan/:id' element={<RenewMemberPlan />}/>
        <Route path='/payDue/:id' element={<PayDue />}/>
        <Route path='/paySalary/:id' element={<PaySalary />}/>
        <Route path='/deleteMember/:id' element={<DeleteMember />}/>
        <Route path='/deleteEmployee/:id' element={<DeleteEmployee />}/>
        <Route path='/add-expense' element={<AddExpense />}/>
        <Route path='/expense-list' element={<ExpenseList />}/>
        <Route path='/revenue-list' element={<RevenueList />}/>
        
        

        
    </Routes>
)
}

export default AppRoutes