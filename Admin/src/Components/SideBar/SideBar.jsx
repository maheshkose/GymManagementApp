import React from 'react'
import './SideBar.css'
import { NavLink } from 'react-router-dom'

import { RxDashboard } from "react-icons/rx";
import { FaIdBadge } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GrServicePlay } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="logo">
            <img src="/vite.svg" alt="" />
        </div>
        <nav>
        <NavLink to={'/'} active>
            <p>
                <RxDashboard/> 
                <span>Dashboard</span>
            </p>
        </NavLink>
         <NavLink to={'/Employee'}>
            <p>
                <FaIdBadge/> 
                <span>Employee</span>
            </p>
        </NavLink>
        <NavLink to={'/classes'}>
            <p>
                <MdOutlineClass/> 
                <span>classes</span>
            </p>
        </NavLink>
        <NavLink to={'/members'}>
            <p>
                <FaUsers/> 
                <span>Members</span>
            </p>
        </NavLink>
        
        <NavLink to={'/services'}>
            <p>
                <GrServicePlay/> 
                <span>Services</span>
            </p>
        </NavLink>
         <NavLink to={'/memberships'}>
            <p>
                <RxDashboard/> 
                <span>Memberships</span>
            </p>
        </NavLink>
         <NavLink to={'/logout'}>
            <p>
                <LuLogOut/> 
                <span>Logout</span>
            </p>
        </NavLink>
        
        </nav>
    </div>
  )
}

export default SideBar