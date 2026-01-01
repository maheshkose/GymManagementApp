import React, { useEffect, useState } from "react";
import "./RevenueList.css";
import { toast } from "react-toastify";
import { AppContextHook } from "../../../context/AppState";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";

const RevenueList = () => {
  const { getRevenueArray } = AppContextHook();
  const [revenue, setRevenue] = useState([]);
  const [revenueArray, setRevenueArray] = useState([]);

  const getRevenueArrayHandler = async () => {
    const res = await getRevenueArray();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setRevenue(res.data.revenue);
      setRevenueArray(res.data.revenue);
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
  const OnsearchHandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "") {
      setRevenue(revenueArray);
      return;
    }
    const filteredExpenses = revenueArray.filter((exp) =>
      exp.source.toLowerCase().includes(value)
    );
    setRevenue(filteredExpenses);
  };
  const OnFilterChangeHandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "all") {
      setRevenue(revenueArray);
      return;
    }
    const searchResult = revenueArray?.filter((empl) =>
      empl.source.toLowerCase().includes(value)
    );

    setRevenue(searchResult);
  };
  const sorthandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "none") {
      setRevenue(revenueArray);
      return;
    }
    if (value === "ascending") {
      const sorted = [...revenueArray].sort((a, b) => a.amount - b.amount);
      setRevenue(sorted);
    }
    if (value === "descending") {
      const sorted = [...revenueArray].sort((a, b) => b.amount - a.amount);
      setRevenue(sorted);
    }
  };

  return (
    <div className="revenue-container">
      <h1>Revenue List</h1>
      <div className="revenue-list-container">
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
                "Membership",
                "Membership Due Amount Payed",
                "Personal Training",
                "Product Sale",
                "Supplements",
                "Gym Merchandise",
                "Other",
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
                <td>
                  {new Date(rev.date).toDateString("en-US", {
                    year: "numeric",
                    day: "2-digit",
                    month: "short",
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

export default RevenueList;
