import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Finance.css";
import { useNavigate } from "react-router-dom";

const Finance = () => {
  const navigate = useNavigate();

  const [financeData, setFinanceData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    profit: 0,
    monthly: [],
  });

  useEffect(() => {
    // Dummy Data (later replace with API)
    const revenue = 85000;
    const expenses = 43000;

    const monthlyData = [
      { month: "Jan", revenue: 12000, expenses: 6000 },
      { month: "Feb", revenue: 10000, expenses: 8000 },
      { month: "Mar", revenue: 15000, expenses: 7000 },
      { month: "Apr", revenue: 13000, expenses: 6000 },
      { month: "May", revenue: 17000, expenses: 9000 },
      { month: "Jun", revenue: 18000, expenses: 11000 },
    ];

    setFinanceData({
      totalRevenue: revenue,
      totalExpenses: expenses,
      profit: revenue - expenses,
      monthly: monthlyData,
    });
  }, []);

  const { totalRevenue, totalExpenses, profit, monthly } = financeData;

  return (
    <div className="finance-container">
      <h1>Finance Overview</h1>

      <div className="finance-buttons">
        <button onClick={() => navigate("/add-expense")}>Add Expense</button>
        <button onClick={() => navigate("/expense-list")}>Expense List</button>
        <button onClick={() => navigate("/revenue-list")}>Revenue List</button>
      </div>

      <div className="finance-cards">
        <div className="finance-card">
          <h2>Total Revenue</h2>
          <p className="green">₹{totalRevenue}</p>
        </div>

        <div className="finance-card">
          <h2>Total Expenses</h2>
          <p className="red">₹{totalExpenses}</p>
        </div>

        <div className="finance-card">
          <h2>{profit >= 0 ? "Profit" : "Loss"}</h2>
          <p className={profit >= 0 ? "green" : "red"}>₹{profit}</p>
        </div>
      </div>

      <div className="finance-chart">
        <h2>Monthly Revenue vs Expenses</h2>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4ade80" />
              <Bar dataKey="expenses" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Finance;
