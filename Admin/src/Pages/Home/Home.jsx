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
import { LuDumbbell } from "react-icons/lu";

const Home = () => {
  const { getAllLiveMembers, getAllEmployee, getmembersStats,totalExpenses,totalRevenew,isLoggedIn } =
    AppContextHook();
  const [liveMemberCount, setliveMemberCount] = useState(0);
  const [liveEmployeeCount, setliveEmployeeCount] = useState(0);
  const [totalRevenewCount, settotalRevenewCount] = useState(0);
  const [totalExpensesCount, settotalExpensesCount] = useState(0);
  const [memberStats, setmemberStats] = useState([]);
  const [classesData, setclassesData] = useState([
    {title:"Advanced swimming", time: "6:00 AM", name: "Yoga", trainer: "Alice" },
    {title:"Advanced swimming", time: "7:30 AM", name: "Cardio Blast", trainer: "Bob" },
    {title:"Advanced swimming", time: "9:00 AM", name: "Strength Training", trainer: "Charlie" },
    {title:"Advanced swimming", time: "5:00 PM", name: "Zumba", trainer: "Diana" },
    {title:"Advanced swimming", time: "6:30 PM", name: "Advanced swimming", trainer: "Ethan" },
  ])
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
  }, [isLoggedIn]);
 
  

  return (
    <div className="home-page">
      <div className="statics">
        <div className="number-static">
          <div className="finacial-statics" onClick={()=>{navigate('/finance')}}>
            <p >
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
        
      </div>
      <div className="classes">
          <div className="classes-container">
            <div className="cl-header">
              <h2>Upcoming Classes Today</h2>
             
              </div>
              
              <div className="cl-list">
                {classesData.map((cls, index) => (
                <div key={index} className="class-card">
                  <h4 className="class-name"><LuDumbbell />  {cls.name}</h4>
                  <p className="class-time">Time:{cls.time}</p>
                  <p className="class-trainer">Trainer: {cls.trainer}</p>
                  <p className="class-capacity">Capacity:{cls.name}</p>
                </div>
              ))}
              </div>
            
          </div>
        </div>
      <div className="event">
        
        <div className="attendece">
          //Employee in workplace now
        </div>
      </div>
    </div>
  );
};

export default Home;
