import React, { useEffect, useState } from "react";
import AddPlan from "../../Components/AddPlan/AddPlan";
import { AppContextHook } from "../../context/AppState";
import { MdCurrencyRupee } from "react-icons/md";
import { toast } from "react-toastify";
import "./MemberShips.css";
import UpdatePlan from "../../Components/updatePlan/UpdatePlan";

const Memberships = () => {
  const { updatePlan, deletePlan, addPlan, getAllPlans, getPlanById } =
    AppContextHook();
  const [plans, setPlans] = useState([]);
  const [showAddPlanForm, setshowAddPlanForm] = useState(false);
  const [showUpadatePlanForm, setshowUpadatePlanForm] = useState(false);
  const [planToBeUpadte, setPlanTobeUpadte] = useState(false);

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
  useEffect(() => {
    getAllPlanHandler();
  }, []);

  const deletePlanHandler = async (planId) => {
    const res = await deletePlan(planId);
    if (res?.data?.success) {
      toast.success(res.data.message);
      getAllPlanHandler();
    } else {
      toast.error(res.response?.data?.message);
    }
  };

  return (
    <div className="memberships-page">
      {showUpadatePlanForm ? (
                    <UpdatePlan
                      showUpadatePlanForm={showUpadatePlanForm}
                      setshowUpadatePlanForm={setshowUpadatePlanForm}
                      getAllPlanHandler={getAllPlanHandler}
                      planData={planToBeUpadte}
                    />
                  ) : (
                    ""
                  )}
      <button
        className="add-plan-btn"
        onClick={() => {
          setshowAddPlanForm(!showAddPlanForm);
        }}
      >
        {showAddPlanForm ? "Cancel" : "Add Membership Plan"}
      </button>
      {showAddPlanForm ? (
        <div className="add-plans">
          <AddPlan
            showAddPlanForm={showAddPlanForm}
            setshowAddPlanForm={setshowAddPlanForm}
            getAllPlanHandler={getAllPlanHandler}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="plans-container">
        {plans && plans.length !== 0 ? (
          plans.map((plan, index) => {
            return (
              <div key={index} className="plan-card">
                <h3>{plan.name}</h3>
                <p>{plan.duration} Days MemberShip</p>
                <h1>
                  <MdCurrencyRupee />
                  {plan.price}/package
                </h1>
                <p>
                  Discount <MdCurrencyRupee />
                  {(plan.discount / 100) * plan.price}
                </p>
                <hr />
                <ul className="features">
                  <h1>Features</h1>
                  <div className="features-container">
                  {plan.features && plan.features.length !== 0
                    ? plan.features.map((f, i) => <li>{f}</li>)
                    : ""}
                    </div>
                </ul>
                <p>{plan.description}</p>

                <div className="buttons">
                  <button
                    className="update-plan"
                    onClick={() => {
                      setshowUpadatePlanForm(!showUpadatePlanForm);
                      setPlanTobeUpadte(plan)
                    }}
                  >
                    Update Plan
                  </button>
                  
                  <button
                    className="delete-plan"
                    onClick={() => {
                      deletePlanHandler(plan._id);
                    }}
                  >
                    Delete Plan
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Plans found</p>
        )}
      </div>
    </div>
  );
};

export default Memberships;
