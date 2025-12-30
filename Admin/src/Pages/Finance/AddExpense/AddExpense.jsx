import React, { useState } from "react";
import "./AddExpense.css";
import { AppContextHook } from "../../../context/AppState";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();
  const {addExpense} = AppContextHook();
  const [data, setData] = useState({
    title: "",
    description: "",
    amount: "",
    category: "",
    paymentMethod: "",
    vendor: "",
    date: "",
    //  receiptImage:{
    //   public_id: { type: String,default:"" },
    //    secure_url: { type: String,default:"" },
    //  },
    isRecurring: false,
    recurringPeriod: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await addExpense(data);
        if (res?.data?.success) {
          toast.success(res.data.message);
          navigate('/expense-list');
        } else {
          toast.error(res.response?.data?.message);
        }
  };
  console.log(data);

  return (
    <div className="add-expense-container">
      <h1>Add Expense</h1>

      <form className="expense-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label>
            Title
            <input
              type="text"
              placeholder="Expense Title"
              name="title"
              value={data.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Amount
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Description
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category
            <select
              name="category"
              placeholder="Choose Category"
              value={data.category}
              onChange={handleChange}
            >
              <option value={""} disabled>Choose category</option>
              {[
                "Equipment",
                "Maintenance",
                "Electricity",
                "Rent",
                "Salaries",
                "Supplements",
                "Marketing",
                "Miscellaneous",
              ].map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Payment Method
            <select
              name="paymentMethod"
              value={data.paymentMethod}
              onChange={handleChange}
            ><option value={""} disabled>Choose Payment mode</option>
              {["Cash", "Online", "Bank Transfer", "Cheque"].map(
                (method, i) => (
                  <option key={i} value={method}>
                    {method}
                  </option>
                )
              )}
            </select>
          </label>
          <label>
            Vendor
            <input
              type="text"
              name="vendor"
              value={data.vendor}
              onChange={handleChange}
              placeholder="vendor"
            />
          </label>
        </div>
        <div className="form-group">
          <div className="is-recurring">
            Recurring Expense
            <div className="is-rec-box">
              <input
                type="checkbox"
                name="isRecurring"
                value={data.isRecurring}
                onChange={(e) =>
                  setData({ ...data, isRecurring: e.target.checked })
                }
              />
            </div>
          </div>
          <label>
            Recurring Period
            <select
              name="recurringPeriod"
              value={data.recurringPeriod}
              onChange={handleChange}
              disabled={!data.isRecurring}
            >
              {["", "Daily", "Weekly", "Monthly", "Yearly"].map((period, i) => (
                <option key={i} value={period}>
                  {period === "" ? "Select Period" : period}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <input
            type="date"
            onChange={(e) => setData({ ...data, date: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
