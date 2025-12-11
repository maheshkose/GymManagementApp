import React from "react";
import "./Employee.css";
import "../Members/Members.css";
import { AppContextHook } from "../../context/AppState";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { CiSearch, CiSquareCheck } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

const Employee = () => {
  const {
    addEmployee,
    getAllEmployee,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
    addEmployeeAttendenceById,
    deleteEmployeeAttendenceById,
  } = AppContextHook();
  const [employees, setemployees] = useState([]);
  const navigate = useNavigate();
  const getAllEmployeeHandler = async () => {
    const res = await getAllEmployee();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setemployees(res.data.allEmployees);
    } else {
      toast.error(res.response?.data?.message);
    }
  };

    const [searchQuery, setsearchQuery] = useState("");
    const [searchResultArray, setsearchResultArray] = useState([]);
  const addAttendenceHandler = async (id) => {
    const res = await addEmployeeAttendenceById(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const deleteEmployeeAttendenceByIdHandler = async (id, date) => {
    const res = await deleteEmployeeAttendenceById({ id, date });
    if (res?.data?.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllEmployeeHandler();
  }, []);

  const OnSearchChangeHandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    setsearchQuery(value);
    // console.log(allEmployees);
    if (value === "") {
      setsearchResultArray([]);
      return;
    }
    const searchResult = employees?.filter((empl) =>
      empl.name.toLowerCase().includes(value)
    );
    // console.log('searchResult',searchResult);
    setsearchResultArray(searchResult);
  };

  return (
    <div className="employee-page">
      <div className="add-employee-button">
         <div className="search">
                    <form>
                      <input
                        type="text"
                        placeholder="search employee"
                        className="search-input"
                        value={searchQuery}
                        onChange={OnSearchChangeHandler}
                      />
                      <CiSearch />
                    </form>
                    <div className="search-suggestion-container">
                      {searchResultArray && searchResultArray.length !== 0 ? (
                        <ul className="search-sugg-ul">
                          {searchResultArray?.map((s, i) => (
                            <li
                              key={i}
                              className="search-suggestion-li"
                              onClick={() => {
                                navigate(`/employeeDetails/${s?._id}`);
                              }}
                            >
                              {s.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
        <button
          onClick={() => {
            navigate("/addEmployee");
          }}
        >
          Add Employee
        </button>
      </div>
      <div className="employee-grid">
        {employees && employees.length !== 0 ? (
          employees?.map((employee, i) => (
            <div key={i} className="employee-card member-card">
              <div className="pro-name-email">
                <div className="member-profile-img">
                  <img
                    src={
                      employee.profileImage?.secure_url
                        ? `${employee.profileImage?.secure_url}`
                        : "/default-pi.jpg"
                    }
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
                <div className="name-email">
                  <h3>{employee.name}</h3>
                  <h4>{employee?.email}</h4>
                  <p>{employee?.address}</p>
                  <p>+91-{employee?.phone}</p>
                </div>
              </div>
              <div className="plan-details">
                <p className="join-date">
                  Join Date :{" "}
                  <strong>
                    {new Date(employee?.joiningDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </strong>
                </p>
                <p>Salary : <strong>{employee?.salary}</strong></p>
              </div>
              <hr />
              <div className="members-nav">
                <ul>
                  <li
                    onClick={() => {
                      navigate(`/employeeDetails/${employee?._id}`);
                    }}
                  >
                    <CgProfile /> <span>Profile</span>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/employeeupdate/${employee?._id}`);
                    }}
                  >
                    <FaUserEdit /> <span>Edit</span>
                  </li>
                  <li
                    onClick={() => {
                      addAttendenceHandler(employee?._id);
                    }}
                  >
                    <CiSquareCheck /> <span>CheckIn</span>
                  </li>
                  <li onClick={()=>{navigate(`/paySalary/${employee?._id}`)}}>
                    <MdOutlineAutorenew /> <span>Pay Salary</span>
                  </li>
                  <li>
                    <RiDeleteBin2Line /> <span>Delete</span>
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <h1>No employees found</h1>
        )}
      </div>
    </div>
  );
};

export default Employee;
