import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { AppContextHook } from "../../context/AppState";
import "./UpdatePlan.css";
import { toast } from "react-toastify";

const UpdatePlan = ({
  showUpadatePlanForm = { showUpadatePlanForm },
  setshowUpadatePlanForm = { setshowUpadatePlanForm },
  getAllPlanHandler = { getAllPlanHandler },
  planData,
}) => {
  const { updatePlan } = AppContextHook();
  const [data, setData] = useState({
    name: planData.name,
    duration: planData.duration,
    description: planData.description,
    price: planData.price,
    features: planData.features,
    discount: planData.discount,
    planType: planData.planType,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("plan data:", data);
    const res = await updatePlan(data, planData._id);
    if (res?.data?.success) {
      toast.success(res.data.message);
      getAllPlanHandler();
      setshowUpadatePlanForm(false);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  return (
    <div className="update-plan-page">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Update Plan</h2>
          <h3
            onClick={() => {
              setshowUpadatePlanForm(false);
            }}
          >
            <ImCross />
          </h3>
        </div>
        <div className="form-group-grid">
          <div className="form-group">
            <label>Plan Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter plan name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Duration (in days)</label>
            <input
              type="number"
              name="duration"
              placeholder="Duration"
              value={data.duration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Plan Type</label>
            <select
              name="planType"
              value={data.planType}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="standard">Standard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={data.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              placeholder="Enter discount"
              value={data.discount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group features">
            <label>Features</label>
            <textarea
              name="features"
              placeholder="Separate by comma e.g. Sauna, Steam, PT"
              value={data.features}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter plan description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          UpdatePlan
        </button>
      </form>
    </div>
  );
};

export default UpdatePlan;
