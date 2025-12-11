import React from 'react'
import './DeleteMember.css'
import { AppContextHook } from '../../context/AppState'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const DeleteMember = () => {
    const {id} = useParams();
    const {deleteMemberById} = AppContextHook();
    const navigate = useNavigate();

    const deleteMemberByIdHandler = async () => {
        const res = await deleteMemberById(id);
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
      <h1>Are You Want to Delete Member?</h1>
      <div className="btn-group">
        <button className="yes" onClick={deleteMemberByIdHandler}>Yes</button>
        <button className="no" onClick={() => navigate(-1)}>No</button>
      </div>
  </div>
</div>

  )
}

export default DeleteMember