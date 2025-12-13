import React from 'react'
import { AppContextHook } from '../../context/AppState'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Logout.css';

const Logout = () => {
    const {logout} = AppContextHook();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const res = await logout();
                if (res?.data?.success) {
                    toast.success(res.data.message);
                    navigate('/');
                }else{
                    toast.error(res.response?.data?.message)
                }
    }
  return (
   <div className='logout-container'>
  <div className="logout-card">
      <h1>Are you want to logout</h1>
      <button onClick={logoutHandler}>Yes</button>
      <button onClick={()=>{navigate(-1)}}>No</button>
  </div>
</div>

  )
}

export default Logout