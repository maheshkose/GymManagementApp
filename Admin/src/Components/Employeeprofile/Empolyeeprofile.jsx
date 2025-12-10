import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";
import { AppContextHook } from "../../context/AppState";
import { toast } from "react-toastify";
import "./Employeeprofile.css";

const Employeeprofile = () => {
  const [showAttendenceReport, setshowAttendenceReport] = useState(false);
  const { id } = useParams();
  const { getEmployeeById } = AppContextHook();
  const [employee, setEmployee] = useState({});

  const getEmployeeByIdHandler = async () => {
    console.log("getEmployeeById");

    const res = await getEmployeeById(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
      setEmployee(res.data.employee);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  useEffect(() => {
    getEmployeeByIdHandler();
  }, []);
  console.log("current Employee", employee);

  return (
    <div className="employee-profile">
      <div className="profile-name-img">
        <div className="profile-img">
          <img
            src={
              employee.profileImage?.secure_url
                ? `${employee.profileImage?.secure_url}`
                : "/default-pi.jpg"
            }
            alt=""
          />
        </div>
        <div className="name-email">
          <h3>{employee.name}</h3>
          <p>{employee.address}</p>
          <p>{employee.email}</p>
          <p>{employee.phone}</p>
        </div>
      </div>
      <div className="other-details">
        <p> Employee ID : {employee._id} </p>
        <p>
          Joining Date :{" "}
          {new Date(employee.joiningDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p>Gender : {employee.gender}</p>
        <p>Role : {employee.role}</p>
        <p>Salary : {employee.salary}</p>
      </div>
      <div className="attendence-report">
        <p>Attendence Report</p>
        <p
          onClick={() => {
            setshowAttendenceReport(!showAttendenceReport);
          }}
        >
          <IoIosArrowDown />
        </p>
        {showAttendenceReport
          ? employee.attendance && employee.attendance.length !== 0
            ? employee.attendance.map((att, i) => (
                <div key={i} className="attendence-container">
                  <ul>
                    <li>
                      <p>Date</p>
                      <p>
                        {new Date(att.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </li>
                    <li>
                      <p>Time</p>
                      <p>
                        {" "}
                        {new Date(att.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </li>
                    <li>
                      <p>Status</p> <p>{att.status}</p>
                    </li>
                  </ul>
                </div>
              ))
            : ""
          : ""}
      </div>
      <div className="salary-paid-array">
        {employee.salaryPaid && employee.salaryPaid.length !== 0?
          employee.salaryPaid.map((s,i)=>(
            <div key={i} className="salary-card">
              <ul>
                <li>
                  <p>Date</p>
                    <p>{new Date(s.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}</p>
                </li>
                <li>
                  <p>Paid Amount</p>
                  <p>{s.paidAmount}</p>
                </li>
                <li>
                  <p>Due Amount</p>
                  <p>{s.dueAmount}</p>
                </li>
              </ul>
            </div>
          ))
        :""}
      </div>
    </div>
  );
};

export default Employeeprofile;
