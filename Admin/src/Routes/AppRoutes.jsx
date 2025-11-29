import React from 'react'
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';
import Memberships from '../Pages/Memberships/Memberships';
import Logout from '../Pages/Logout/Logout';
const AppRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/memberships' element={<Memberships />}/>
        <Route path='/logout' element={<Logout />}/>
    </Routes>
)
}

export default AppRoutes