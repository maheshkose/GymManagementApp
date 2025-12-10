import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";
import { AppContextHook } from "../../context/AppState";
import { toast } from "react-toastify";
import './Memberprofile.css'

const Memberprofile = () => {
  const [showAttendenceReport, setshowAttendenceReport] = useState(false);
  const {id} = useParams();
  const {getMemberById} = AppContextHook();
  const [member, setmember] = useState({});
  const [revArray, setrevArray] = useState([]);

  const getMemberByIdHandler = async () => {
    console.log('getMemberById');
    
    const res = await getMemberById(id);
        if (res?.data?.success) {
          toast.success(res.data.message);
          setmember(res.data.member)
        } else {
          toast.error(res.response?.data?.message);
        }
  }
  useEffect(() => {
   getMemberByIdHandler();
  }, [])
  useEffect(() => {
 if (member?.plansArray && Array.isArray(member.plansArray)) {
    setrevArray([...member.plansArray].reverse());
  }
  }, [member])
  
  console.log("current Member",member);
  
  
  return (
    <div className="member-profile">
      <div className="profile-name-img">
        <div className="profile-img">
          <img
            src={
              member.profileImage?.secure_url
                ? `${member.profileImage?.secure_url}`
                : "/default-pi.jpg"
            }
            alt=""
          />
        </div>
        <div className="name-email">
          <h3>{member.name}</h3>
          <p>{member.address}</p>
          <p>{member.email}</p>
          <p>{member.phone}</p>
        </div>
      </div>
      <div className="other-details">
        <p> Member ID : {member._id} </p>
        <p>
          Admission Date :{" "}
          {new Date(member.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p>Gender : {member.gender}</p>
      </div>
      <div className="attendence-report">
        <p>Attendence Report</p>
        <p
          onClick={() => {
            setshowAttendenceReport(!showAttendenceReport);
          }}
        >
          <IoIosArrowDown />
        </p>
        {showAttendenceReport
          ? member.attendence && member.attendence.length !== 0
            ? member.attendence.map((att, i) => (
                <div key={i} className="attendence-container">
                  <ul>
                    <li>
                      <p>Date</p>
                      <p>{new Date(att.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}</p>
                    </li>
                    <li>
                        <p>Time</p>
                        <p> {new Date(att.date).toLocaleTimeString("en-US", {
                        hour:'2-digit',
                        minute:'2-digit',
                        hour12:true,
                        
                      })}</p>

                        </li>
                      <li><p>Status</p> <p>{att.status}</p></li>
                  </ul>
                </div>
              ))
            : ""
          : ""}
</div>
          <div className="gym-plans">
            <h1>Gym Plans History</h1>
            <div className="plans-list">
            {
            revArray?.map((plan,i)=>(
                <div key={i} className="plan-card">
                    <p><strong>{plan.plan.name}</strong></p>
                    <hr />
                    <ul>
                        <li>Start Date <span>{new Date(plan.planStartingDate).toLocaleDateString("en-GB", {
                            month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}</span></li>
                       <li>End Date <span>{new Date(plan.planEndingDate).toLocaleDateString("en-GB", {
                            month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}</span></li>
                      <li>Plan Amount <span>{plan.plan.price}</span></li>
                      <li>Discount <span>{plan.plan.discount/100*plan.plan.price}</span></li>
                      <li>Final Amount <span>{plan.plan.finalPrice}</span></li>
                      <li>Tax/Enrollent <span>{plan.enrollmentAmount }</span></li>
                      <li>Paid Amount <span>{plan.paidAmount}</span></li>
                       <li>Due Amount <span>{plan.dueAmount}</span></li>

                    </ul>
                </div>
            ))}
            </div>
      </div>
          
    </div>
    
  );
};

export default Memberprofile;
