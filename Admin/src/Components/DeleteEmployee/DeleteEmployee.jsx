import React from 'react'
import './DeleteEmployee.css'
import { AppContextHook } from '../../context/AppState'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const DeleteEmployee = () => {
    const {id} = useParams();
    const {deleteEmployeeById} = AppContextHook();
    const navigate = useNavigate();

    const deleteEmployeeByIdHandler = async () => {
        const res = await deleteEmployeeById(id);
        if (res?.data?.success) {
          toast.success(res.data.message);
          navigate(-1);
        } else {
          toast.error(res.response?.data?.message);
        }
      };
  return (
    <div className='delete-member-container'>
  <div className="delete-m-pop-up">
      <h1>Are You Want to Delete Employee?</h1>
      <div className="btn-group">
        <button className="yes" onClick={deleteEmployeeByIdHandler}>Yes</button>
        <button className="no" onClick={() => navigate(-1)}>No</button>
      </div>
  </div>
</div>

  )
}

export default DeleteEmployee