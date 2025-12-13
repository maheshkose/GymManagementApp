import React, { useState, useEffect } from "react";
import "./ExpenseList.css";
import { AppContextHook } from "../../../context/AppState";
import { toast } from "react-toastify";


const ExpenseList = () => {
  const {getExpensesArray} = AppContextHook();
  const [expenses, setExpenses] = useState([]);

   const getExpensesArrayHandler = async () => {
      const res = await getExpensesArray();
      if (res?.data?.success) {
        toast.success(res.data.message);
        setExpenses(res.data.expense);
      } else {
        toast.error(res.response?.data?.message);
      }
    };
    

  useEffect(() => {
    // setExpenses([
    //   { title: "Electricity Bill", amount: 5000, category: "Utility", date: "2025-01-03" },
    //   { title: "Protein Stock", amount: 12000, category: "Stock", date: "2025-01-10" },
    //   { title: "Equipment Repair", amount: 8000, category: "Maintenance", date: "2025-01-15" },
    // ]);
    getExpensesArrayHandler();
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
