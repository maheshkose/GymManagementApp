import React from "react";
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
  
  
  const modifiedmembers = memberStats?.map((m) => {
    return {
      date: new Date(m.date).toLocaleDateString("en-GB", {
        day:"numeric",
        month: "short",
      }),
      membersCount: m.membersCount,
    };
  });

  

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={modifiedmembers}>
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
  );
};

export default MemberLineChart;
