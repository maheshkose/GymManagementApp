import React from "react";
import { AppContextHook } from "../../context/AppState";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import "./Attendence.css";


const Attendance = () => {
  const {
    getAllAttendenceTrendOfmembers,
    getAttendenceOfTodaymembers,
    getCurrentlyInGymmembers,
    getAttendenceTrendPerHourOfmembers,
    topattendingmembers,
  } = AppContextHook();
  const [todaySCheckins, settodaySCheckins] = useState(0);
  const [currentlyActive, setcurrentlyActive] = useState(0);
  const [peakHourToday, setpeakHourToday] = useState({ hour: "", count: 0 });
  const [weeklyAvg, setweeklyAvg] = useState(0);
  const [todayCheckinsArray, settodayCheckinsArray] = useState([]);
  const [todayAllCheckinsArray, settodayAllCheckinsArray] = useState([]);
  const [topAttendingMembersList, settopAttendingMembersList] = useState([]);
  const [weeklyAttendenceTrend, setweeklyAttendenceTrend] = useState([]);

  const getAllAttendenceTrendOfmembersHandler = async () => {
    const res = await getAllAttendenceTrendOfmembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setweeklyAvg(res.data.weeklyAvgAttendence);
      setweeklyAttendenceTrend(res.data.weeklyattendenceTrend);
    } else {
      toast.error(res.response?.data?.message);
    }
  };

  const getAttendenceOfTodaymembersHandler = async () => {
    const res = await getAttendenceOfTodaymembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      settodaySCheckins(res.data.attendences.length);
      settodayCheckinsArray(res.data.attendences);
      settodayAllCheckinsArray(res.data.attendences);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getCurrentlyInGymmembersHandler = async () => {
    const res = await getCurrentlyInGymmembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setcurrentlyActive(res.data.attendences.length);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getAttendenceTrendPerHourOfmembersHandler = async () => {
    const res = await getAttendenceTrendPerHourOfmembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setpeakHourToday(res.data.peakHour);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const topattendingmembersHandler = async () => {
    const res = await topattendingmembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      settopAttendingMembersList(res.data.attendences);
    } else {
      toast.error(res.response?.data?.message);
    }
  };

  useEffect(() => {
    getAttendenceOfTodaymembersHandler();
    getCurrentlyInGymmembersHandler();
    getAllAttendenceTrendOfmembersHandler();
    getAttendenceTrendPerHourOfmembersHandler();
    topattendingmembersHandler();
  }, []);

  const formatAxisTick = (value) => {
    return `*${value}*`;
  };

  const renderCustomBarLabel = ({ x, y, width, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      >{`${value}`}</text>
    );
  };
  console.log("weeklyAttendenceTrend", weeklyAttendenceTrend);

  const attendanceSearchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      settodayCheckinsArray(todayAllCheckinsArray);
      return;
    }
    const filteredCheckins = todayAllCheckinsArray.filter((checkin) =>
      checkin.member.name.toLowerCase().includes(searchTerm)
    );
    settodayCheckinsArray(filteredCheckins);
  }
  return (
    <div className="attendance-page">
      <div className="att-track">
        <h2>Attendance Tracking</h2>
        <p>This is where attendance details will be displayed and managed.</p>
      </div>
      <div className="att-stats">
        <div className="today-checkins">
          <h3>Today's Check-ins</h3>
          <p> {todaySCheckins}</p>
          <p>+8% from yesterday</p>
        </div>
        <div className="curr-active">
          <h3>Currently Active</h3>
          <p>{currentlyActive}</p>
          <p>Members In facility</p>
        </div>
        <div className="peakHour-today">
          <h3>Peak Hour Today</h3>
          <p>
            {peakHourToday?.hour} - {peakHourToday?.hour + 1}
          </p>
          <p>{peakHourToday?.count} Members</p>
        </div>
        <div className="weekly-avg">
          <h3>Weekly Average</h3>
          <p>{weeklyAvg}</p>
          <p> check-ins per day</p>
        </div>
      </div>
      <div className="checkins-and-top-performers">

      <div className="today-chekins-list-container">
        <div className="t-c-lc-header">
          <h3>Today's Check-ins</h3>
          <form>
            <input type="text" placeholder="Search by name" className="mem-atte-search" onChange={attendanceSearchHandler} />
          </form>
        </div>
        <div className="t-c-lc-body">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Check-in Time</th>
                <th>Check-out Time</th>

                <th>Status</th>
              </tr>
            </thead>
            <tbody className="checkin-t-body">
              {
                /* Map through today's check-ins data */
                todayCheckinsArray && todayCheckinsArray.length > 0 ? (
                  todayCheckinsArray?.map((checkin, i) => (
                    <tr key={i}>
                      <td>{checkin.member?.name}</td>
                      <td>
                        {new Date(checkin.checkInTime).toLocaleTimeString()}
                      </td>
                      <td>
                        {checkin.checkOutTime
                          ? new Date(checkin.checkOutTime).toLocaleTimeString()
                          : "--"}
                      </td>
                      <td>
                        <span className="status active">{checkin.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No check-ins today.</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
       <div className="topperformers">
          <h3>Top Performers This Week</h3>
          <p>most consistent members this week</p>
          <div className="top-prf-con">
            {topAttendingMembersList && topAttendingMembersList.length > 0 ? (
              topAttendingMembersList?.map((memberAtt, i) => (
                <div key={i} className="att-card">
                  <p className={`rank ${i+1 === 1? "gold": i+1 > 1 && i+1 <4?" silver":"bronze"}`}>#{i + 1}</p>
                  <div className="name-days">
                    <p className="name">{memberAtt.member.name}</p>
                  <p className="att-count">
                    {memberAtt.attendenceCount} check-ins
                  </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>
        </div>
        <div className="attendence-trend">
          <h3>Attendence Trend (Weekly)</h3>
          <div className="at-Tr-graph">
            {/* Graph or chart component can be placed here */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
              data={weeklyAttendenceTrend}
                width={500}
                height={300}
                margin={{
                  top: 10,
                  left: 0,
                  right: 10,
                  bottom: 10,
                }}
                
              >
                <XAxis
                  dataKey="weekDay"
                  // tickFormatter={formatAxisTick}
                  label={{
                    position: "insideBottomRight",
                    value: "XAxis title",
                    offset: -10,
                  }}
                />
                <YAxis
                title={"Attendence Count"}
                  label={{
                    position: "insideTopLeft",
                    value: "YAxis title",
                    angle: -90,
                    dy: 60,
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#8884d8"
                  label={renderCustomBarLabel}
                  radius={[8, 8, 0, 0]}
                />
               
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  );
};

export default Attendance;
