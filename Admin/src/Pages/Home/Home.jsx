import React from "react";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { MdCurrencyRupee } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SiCloudflareworkers } from "react-icons/si";
import "./Home.css";
import { AppContextHook } from "../../context/AppState";
import { useState } from "react";
import { useEffect } from "react";
import MemberLineChart from "../../Components/MembersChart/MembersChart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { getAllLiveMembers, getAllEmployee, getmembersStats,totalExpenses,totalRevenew } =
    AppContextHook();
  const [liveMemberCount, setliveMemberCount] = useState(0);
  const [liveEmployeeCount, setliveEmployeeCount] = useState(0);
  const [totalRevenewCount, settotalRevenewCount] = useState(0);
  const [totalExpensesCount, settotalExpensesCount] = useState(0);
  const [memberStats, setmemberStats] = useState([]);
  const navigate = useNavigate();

  const getAllLiveMembersHandler = async () => {
    const res = await getAllLiveMembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setliveMemberCount(res.data.allLiveMembers.length);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getAllEmployeeHandler = async () => {
    const res = await getAllEmployee();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setliveEmployeeCount(res.data.allEmployees.length);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getmembersStatsHandler = async () => {
    const res = await getmembersStats();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setmemberStats(res.data.membersStats);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
   const totalRevenewHandler = async () => {
    const res = await totalRevenew();
    if (res?.data?.success) {
      toast.success(res.data.message);
      settotalRevenewCount(res.data.totalrevenewMoney);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  

  

  useEffect(() => {
    getAllLiveMembersHandler();
    getAllEmployeeHandler();
    getmembersStatsHandler();
    totalRevenewHandler();
  }, []);
 
  

  return (
    <div className="home-page">
      <div className="statics">
        <div className="number-static">
          <div className="finacial-statics">
            <p onClick={()=>{navigate('/finance')}}>
              <HiDocumentCurrencyRupee />
              <span>Finacial Statics</span>
            </p>
            <p>
              <MdCurrencyRupee /> {totalRevenewCount || 0}
            </p>
          </div>
          <div className="active-memebers" onClick={()=>{navigate('/members')}}>
            <p>
              <FaUsers />
              <span>Active Clients</span>
            </p>
            <p>{liveMemberCount}</p>
          </div>
          <div className="total-emp" onClick={()=>{navigate('/Employee')}}>
            <p>
              <SiCloudflareworkers />
              <span>Total Employees</span>
            </p>
            <p>{liveEmployeeCount}</p>
          </div>
        </div>
        <div className="members-chart">
          <h4>Member stats</h4>
          <div className="active-members-chart">
            {/* //month to member graph */}
            <MemberLineChart memberStats={memberStats}/>
          </div>
        </div>
        <div className="other"></div>
      </div>
      <div className="event">
        <div className="attendece"></div>
      </div>
    </div>
  );
};

export default Home;
