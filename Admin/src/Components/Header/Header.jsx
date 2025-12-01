import React from 'react'
import './Header.css'
import { CiSearch } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5"

const Header = () => {
  return (
    <div className='header'>
        <div className="header-container">
           <div className="left">
             <h1>Overview</h1>
           </div>
           <div className="right">
            <div className="search">
                <form>
                    <input type="text" placeholder='search' />
                    <CiSearch/>
                </form>
            </div>
            <NavLink to={'/notification'}>
                <IoNotificationsOutline/>
            </NavLink>

            <NavLink to={'/profile'}>
                <div className="profile-div">
                    <img src="" alt="" />
                    <span>hi mahesh</span>
                </div>
            </NavLink>
           </div>

        </div>
    </div>
  )
}

export default Header