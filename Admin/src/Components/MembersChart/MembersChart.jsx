import React, { useEffect, useState } from "react";
import './MembersChart.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", members: 30 },
  { name: "Feb", members: 50 },
  { name: "Mar", members: 45 },
  { name: "Apr", members: 70 },
];

const MemberLineChart = ({ memberStats }) => {
  const [dailyChart, setdailyChart] = useState([]);
  const [weeklyChart, setweeklyChart] = useState([]);
  const [monthlyChart, setmonthlyChart] = useState([]);
  const [quarterlyChart, setquarterlyChart] = useState([]);
  const [yearlyChart, setyearlyChart] = useState([]);
  const [membersChart, setMembersChart] = useState([]);

  let modifiedmembers = memberStats?.map((m) => {
    return {
      date: new Date(m.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      membersCount: m.membersCount,
    };
  });
  console.log("membersChart", membersChart);

 const modeChangeHandler = (e) => {
  const value = e.target.value;
  let modifiedMembers = [];

  if (value === "daily") {
    modifiedMembers = memberStats?.map(m => ({
      date: new Date(m.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      membersCount: m.membersCount,
    }));
  }

  else if (value === "monthly") {
    modifiedMembers = memberStats
      ?.filter(m => new Date(m.date).getDate() === 1)
      .map(m => ({
        date: new Date(m.date).toLocaleDateString("en-GB", {
          month: "short",
          year: "numeric",
        }),
        membersCount: m.membersCount,
      }));
  }

  else if (value === "quarterly") {
    modifiedMembers = memberStats
      ?.filter(m => {
        const d = new Date(m.date);
        return d.getDate() === 1 && [0, 3, 6, 9].includes(d.getMonth());
      })
      .map(m => ({
        date: new Date(m.date).toLocaleDateString("en-GB", {
          month: "short",
          year: "numeric",
        }),
        membersCount: m.membersCount,
      }));
  }

  else if (value === "yearly") {
    modifiedMembers = memberStats
      ?.filter(m => {
        const d = new Date(m.date);
        return d.getDate() === 1 && d.getMonth() === 0;
      })
      .map(m => ({
        date: new Date(m.date).getFullYear(),
        membersCount: m.membersCount,
      }));
  }

  setMembersChart(modifiedMembers);
};

  useEffect(() => {
    setMembersChart(modifiedmembers);
  }, [memberStats]);

  return (
    <div className="res-div">
      <form className="chooseMode">
        <select name="mode" onChange={modeChangeHandler}>
          <option value="daily">Daily</option>

          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </form>
    <ResponsiveContainer width="100%" height={300} >
      
      <LineChart data={membersChart}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="membersCount"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default MemberLineChart;
