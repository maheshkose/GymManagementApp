import React, { useState } from "react";
import './AddPlan.css'

const AddPlan = () => {
  const [data, setData] = useState({
    name: "",
    duration: "",
    description: "",
    price: "",
    features: "",
    discount: "",
    planType: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("plan data:", data);
    // Here you can add API call to submit data
  };

  return (
    <div className="add-plan">
      <form onSubmit={handleSubmit}>
        <h2>Add Plan</h2>

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
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
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

        <div className="form-group">
          <label>Features</label>
          <textarea
            name="features"
            placeholder="Separate by comma e.g. Sauna, Steam, PT"
            value={data.features}
            onChange={handleChange}
          />
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
          Add Plan
        </button>
      </form>
    </div>
  );
};

export default AddPlan;
