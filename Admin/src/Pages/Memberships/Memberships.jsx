import React, { useEffect, useState } from 'react'
import AddPlan from '../../Components/AddPlan/AddPlan';

const Memberships = () => {
    const [plans, setPlans] = useState([]);

    const getAllPlanHandler = async () => {
        //fetch all plans from backend
    }
    useEffect(() => {
      getAllPlanHandler();
    }, [])
    
  return (
    <div className='memberships-page'>
        <div className="add-plans">
            <AddPlan />
        </div>
        <div className="plans-container">
            {plans && plans.length !== 0 ?(
            plans.map((plan,index)=>{
                <div key={index} className='plan-card'>
                    
                </div>
            })
        ) :<p>
            No Plans found</p>}
        </div>
    </div>
  )
}

export default Memberships