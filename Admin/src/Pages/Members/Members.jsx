import React, { useEffect, useState } from "react";
import "./Members.css";
import AddMember from "../../Components/AddMember/AddMember";
import { AppContextHook } from "../../context/AppState";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { CiFilter, CiSearch, CiSquareCheck } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineAutorenew } from "react-icons/md";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const {
    getAllMembers,
    getAllExpiredMembers,
    getAllLiveMembers,
    addAttendence,
    payDueAmount,
    getAllPlans,
    checkInMember,
    checkOutMember,
  } = AppContextHook();
  const navigate = useNavigate();

  const [showAddMember, setshowAddMember] = useState(false);

  const [members, setMembers] = useState([]);
  const [allMembers, setallMembers] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [searchResultArray, setsearchResultArray] = useState([]);
  const [plans, setPlans] = useState([]);

  const getAllLiveMembersHandler = async () => {
    const res = await getAllLiveMembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setMembers(res.data.allLiveMembers);
      setallMembers(res.data.allLiveMembers);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getAllExpiredMembersHandler = async () => {
    const res = await getAllExpiredMembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setMembers(res.data.allExpiredMembers);
      setallMembers(res.data.allExpiredMembers);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getAllMembersHandler = async () => {
    const res = await getAllMembers();
    if (res?.data?.success) {
      toast.success(res.data.message);
      setMembers(res.data.allMembers);
      setallMembers(res.data.allMembers);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const addAttendenceHandler = async (userId) => {
    const res = await addAttendence({ userId });
    if (res?.data?.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getAllPlanHandler = async () => {
    //fetch all plans from backend
    const res = await getAllPlans();
    if (res?.data?.success) {
      setPlans(res.data?.allPlans);
      // toast.success(res.data.message);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const checkInMemberHandler = async (id) => {
    const res = await checkInMember(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const checkOutMemberHandler = async (id) => {
    const res = await checkOutMember(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllLiveMembersHandler();
    getAllPlanHandler();
  }, []);
  console.log("members", members);

  if (!members && members.length === 0) {
    return <></>;
  }

  const OnSearchChangeHandler = (e) => {
    const value = e.target.value.toLowerCase().trim();

    setsearchQuery(value);
    // console.log(allEmployees);
    if (value === "") {
      // setsearchResultArray([]);
      setMembers(allMembers);
      return;
    }
    const searchResult = allMembers?.filter((empl) =>
      empl.name.toLowerCase().includes(value)
    );
    // console.log('searchResult',searchResult);
    // setsearchResultArray(searchResult);
    setMembers(searchResult);
  };
  const PlanBasedFilter = (e) => {
    const plan = e.target.value.toLowerCase().trim();
    if (plan === "all") {
      setMembers(allMembers);
      return;
    }
    const filteredMembers = allMembers.filter(
      (m) => m.currentPlan.plan.name === plan
    );
    setMembers(filteredMembers);
  };
  return (
    <div className="members-page">
      <div className="memeber-nav">
        <div className="left add-members">
          <div className="search">
            <form>
              <input
                type="text"
                placeholder="search member"
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
            </div>
          </div>
          <button
            onClick={() => {
              setshowAddMember(!showAddMember);
            }}
          >
            <TiUserAdd />
            <span>{showAddMember ? "Cancel" : "Add New Member"}</span>
          </button>
        </div>
        <div className="right-con">
          <ul className="nav right">
            <li
              className="live-m"
              onClick={() => {
                getAllLiveMembersHandler();
              }}
            >
              Live Members
            </li>
            <li
              className="live-m"
              onClick={() => {
                getAllMembersHandler();
              }}
            >
              Toatal Members
            </li>
            <li
              className="live-m"
              onClick={() => {
                getAllExpiredMembersHandler();
              }}
            >
              Expired Members
            </li>
          </ul>
          <div className="plan-filter">
            <label htmlFor="filterbyPlan">
              <CiFilter />
              <span>Filter</span>
            </label>

            <select
              name="filterByPlan"
              id="filterbyPlan"
              onChange={PlanBasedFilter}
            >
              <option value="all">All Plans</option>

              {plans && plans.length !== 0 ? (
                plans.map((p, i) => (
                  <option key={i} value={p.name}>
                    {p.name}
                  </option>
                ))
              ) : (
                <option value="">No plans found</option>
              )}
            </select>
          </div>
        </div>
      </div>
      {showAddMember ? (
        <AddMember
          showAddMember={showAddMember}
          setshowAddMember={setshowAddMember}
          getAllLiveMembersHandler={getAllLiveMembersHandler}
        />
      ) : (
        <></>
      )}

      <div className="members-container">
        {members && members.length !== 0 ? (
          members.map((member, i) => (
            <div key={i} className="member-card">
              <div className="pro-name-email">
                <div className="member-profile-img">
                  <img
                    src={
                      member.profileImage?.secure_url
                        ? `${member.profileImage?.secure_url}`
                        : "/default-pi.jpg"
                    }
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
                <div className="name-email">
                  <h3>{member.name}</h3>
                  <h4>{member.email}</h4>
                  <p>{member.address}</p>
                  <p>+91-{member.phone}</p>
                </div>
              </div>
              <div className="plan-details">
                <p className="join-date">
                  Join Date :{" "}
                  <strong>
                    {new Date(
                      member.currentPlan.planStartingDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </strong>
                </p>
                <p className="end-date">
                  End Date :{" "}
                  <strong>
                    {new Date(
                      member.currentPlan.planEndingDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </strong>
                </p>
                <p>
                  Plan : <strong>{member?.currentPlan.plan?.name}</strong>
                </p>
                <p>
                  Final Amt :{" "}
                  <strong>{member?.currentPlan.plan?.finalPrice}</strong>
                </p>
                <p>
                  Paid Amt : <strong>{member?.currentPlan.paidAmount}</strong>
                </p>
                <p>
                  Due : <strong>{member?.currentPlan.dueAmount}</strong>
                </p>
              </div>
              <hr />
              <div className="members-nav">
                <ul>
                  <li
                    onClick={() => {
                      navigate(`/memberDetails/${member?._id}`);
                    }}
                  >
                    <CgProfile /> <span>Profile</span>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/memberupdate/${member._id}`);
                    }}
                  >
                    <FaUserEdit /> <span>Edit</span>
                  </li>
                  <li
                    onClick={() => {
                      checkInMemberHandler(member._id);
                    }}
                  >
                    <CiSquareCheck /> <span>CheckIn</span>
                  </li>
                  <li
                    onClick={() => {
                      checkOutMemberHandler(member._id);
                    }}
                  >
                    <CiSquareCheck /> <span>CheckOut</span>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/renewPlan/${member._id}`);
                    }}
                  >
                    <MdOutlineAutorenew /> <span>Renew</span>
                  </li>
                  {member?.currentPlan.dueAmount > 0 ? (
                    <li
                      onClick={() => {
                        navigate(`/payDue/${member._id}`);
                      }}
                    >
                      <LuReceiptIndianRupee /> <span>Pay Due</span>
                    </li>
                  ) : (
                    ""
                  )}
                  <li
                    onClick={() => {
                      navigate(`/deleteMember/${member._id}`);
                    }}
                  >
                    <RiDeleteBin2Line /> <span>Delete</span>
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ color: "#222" }}>No Members Found</h1>
        )}
      </div>
    </div>
  );
};

export default Members;
