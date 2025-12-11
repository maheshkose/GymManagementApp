import React, { useEffect, useState } from "react";
import "./RevenueList.css";

const RevenueList = () => {
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    setRevenue([
      { source: "Membership Fees", amount: 45000, date: "2025-01-05" },
      { source: "Personal Training", amount: 15000, date: "2025-01-12" },
      { source: "Protein Sale", amount: 25000, date: "2025-01-20" },
    ]);
  }, []);

  return (
    <div className="revenue-container">
      <h1>Revenue List</h1>

      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount (₹)</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {revenue.map((rev, i) => (
            <tr key={i}>
              <td>{rev.source}</td>
              <td>{rev.amount}</td>
              <td>{rev.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueList;
