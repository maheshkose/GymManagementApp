import React, { useEffect, useState } from "react";
import "./RevenueList.css";
import { toast } from "react-toastify";
import { AppContextHook } from "../../../context/AppState";

const RevenueList = () => {
  const {getRevenueArray} = AppContextHook();
  const [revenue, setRevenue] = useState([]);


     const getRevenueArrayHandler = async () => {
        const res = await getRevenueArray();
        if (res?.data?.success) {
          toast.success(res.data.message);
          setRevenue(res.data.revenue);
        } else {
          toast.error(res.response?.data?.message);
        }
      };
  useEffect(() => {
    // setRevenue([
    //   { source: "Membership Fees", amount: 45000, date: "2025-01-05" },
    //   { source: "Personal Training", amount: 15000, date: "2025-01-12" },
    //   { source: "Protein Sale", amount: 25000, date: "2025-01-20" },
    // ]);
    getRevenueArrayHandler();
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
