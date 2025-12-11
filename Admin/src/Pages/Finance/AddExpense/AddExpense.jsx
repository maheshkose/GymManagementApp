import React, { useState } from "react";
import "./AddExpense.css";

const AddExpense = () => {
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Expense Added:", data);
    alert("Expense Added Successfully");
  };

  return (
    <div className="add-expense-container">
      <h1>Add Expense</h1>

      <form className="expense-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Expense Title"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setData({ ...data, amount: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setData({ ...data, category: e.target.value })}
          required
        />

        <input
          type="date"
          onChange={(e) => setData({ ...data, date: e.target.value })}
          required
        />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
