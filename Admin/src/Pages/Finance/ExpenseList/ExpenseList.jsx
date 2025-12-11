import React, { useState, useEffect } from "react";
import "./ExpenseList.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setExpenses([
      { title: "Electricity Bill", amount: 5000, category: "Utility", date: "2025-01-03" },
      { title: "Protein Stock", amount: 12000, category: "Stock", date: "2025-01-10" },
      { title: "Equipment Repair", amount: 8000, category: "Maintenance", date: "2025-01-15" },
    ]);
  }, []);

  return (
    <div className="expense-list-container">
      <h1>Expense List</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount (₹)</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp, i) => (
            <tr key={i}>
              <td>{exp.title}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
