import React from "react";
import "./Header.css";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AppContextHook } from "../../context/AppState";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  // const { getAllEmployee } = AppContextHook();
  // const [allEmployees, setallEmployees] = useState([
  //   { name: "mahesh" },
  //   { name: "arpan" },
  //   { name: "bala" },
  //   { name: "vishakha" },
  // ]);
  // const [searchQuery, setsearchQuery] = useState("");
  // const [searchResultArray, setsearchResultArray] = useState([]);
  // const getAllEmployeeHandler = async () => {
  //   const res = await getAllEmployee();
  //   if (res?.data?.success) {
  //     toast.success(res.data.message);
  //     setallEmployees(res.data.allEmployees);
  //   } else {
  //     toast.error(res.response?.data?.message);
  //   }
  // };
  // useEffect(() => {
  //   getAllEmployeeHandler();
  // }, []);

  // const OnSearchChangeHandler = (e) => {
  //   const value = e.target.value.toLowerCase().trim();

  //   setsearchQuery(value);
  //   // console.log(allEmployees);
  //   if (value === "") {
  //     setsearchResultArray([]);
  //     return;
  //   }
  //   const searchResult = allEmployees?.filter((empl) =>
  //     empl.name.toLowerCase().includes(value)
  //   );
  //   // console.log('searchResult',searchResult);
  //   setsearchResultArray(searchResult);
  // };
  // console.log("allEmployees", allEmployees);
  // console.log("searchResultArray", searchResultArray);

  return (
    <div className="header">
      <div className="header-container">
        <div className="left">
          <h1>Overview</h1>
        </div>
        <div className="right">
          <div className="search">
            <form>
              <input
                type="text"
                placeholder="search"
                className="search-input"
                // value={searchQuery}
                // onChange={OnSearchChangeHandler}
              />
              <CiSearch />
            </form>
            {/* <div className="search-suggestion-container">
              {searchResultArray && searchResultArray.length !== 0 ? (
                <ul className="search-sugg-ul">
                  {searchResultArray?.map((s, i) => (
                    <li
                      key={i}
                      className="search-suggestion-li"
                      onClick={() => {
                        navigate(`/memberDetails/${s?._id}`);
                      }}
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div> */}
          </div>

          <NavLink to={"/notification"}>
            <IoNotificationsOutline />
          </NavLink>

          <NavLink to={"/profile"}>
            <div className="profile-div">
              <img src="" alt="" />
              <span>hi mahesh</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
