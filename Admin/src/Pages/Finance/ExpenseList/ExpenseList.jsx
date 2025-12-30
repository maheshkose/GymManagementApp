import React, { useState, useEffect } from "react";
import "./ExpenseList.css";
import { AppContextHook } from "../../../context/AppState";
import { toast } from "react-toastify";
import { CiFilter } from "react-icons/ci";
import { TbSortAscendingNumbers } from "react-icons/tb";

const ExpenseList = () => {
  const { getExpensesArray } = AppContextHook();
  const [expenses, setExpenses] = useState([]);
  const [expensesArray, setExpensesArray] = useState([]);

  const getExpensesArrayHandler = async () => {
    const res = await getExpensesArray();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setExpenses(res.data.expense);
      setExpensesArray(res.data.expense);
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
  const OnsearchHandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "") {
      setExpenses(expensesArray);
      return;
    }
    const filteredExpenses = expensesArray.filter((exp) =>
      exp.title.toLowerCase().includes(value)
    );
    setExpenses(filteredExpenses);
  };
  const OnFilterChangeHandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "all") {
      setExpenses(expensesArray);
      return;
    }
    const searchResult = expensesArray?.filter((empl) =>
      empl.category.toLowerCase().includes(value)
    );

    setExpenses(searchResult);
  };
  const sorthandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "none") {
      setExpenses(expensesArray);
      return;
    }
    if (value === "ascending") {
      const sorted = [...expensesArray].sort((a, b) => a.amount - b.amount);
      setExpenses(sorted);
    }
    if (value === "descending") {
      const sorted = [...expensesArray].sort((a, b) => b.amount - a.amount);
      setExpenses(sorted);
    }
  };

  

  return (
    <div className="expense-list-container">
      <h1>Expense List</h1>
      <div className="expense-list-table-container">
        <div className="exp-list-header">
          <input
            type="text"
            placeholder="search by title"
            onChange={OnsearchHandler}
          />
          <div className="sort-by-amount filter">
            <label htmlFor="filter">
              <TbSortAscendingNumbers />
              <span>Sort</span>
            </label>
            <select name="filter" id="filter" onChange={sorthandler}>
              {["none", "ascending", "descending"].map((f, i) => (
                <option key={i} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="filter">
              <CiFilter />
              <span>Filter</span>
            </label>

            <select name="filter" id="filter" onChange={OnFilterChangeHandler}>
              {[
                "all",
                "Equipment",
                "Maintenance",
                "Electricity",
                "Rent",
                "Salaries",
                "Supplements",
                "Marketing",
                "Miscellaneous",
              ].map((f, i) => (
                <option key={i} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
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
                <td>
                  {new Date(exp.date).toDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
