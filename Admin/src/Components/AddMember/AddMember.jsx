import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import "./AddMember.css";
import { AppContextHook } from "../../context/AppState";
import { toast } from "react-toastify";
import { MdCurrencyRupee } from "react-icons/md";

const AddMember = ({ showAddMember, setshowAddMember,getAllLiveMembersHandler }) => {
  const { getAllPlans, createMember } = AppContextHook();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

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
  useEffect(() => {
    setSelectedPlan(plans[0]);
    // setData({...data,["plan"]:plans[0]?._id})
  }, [plans]);

  useEffect(() => {
    setData({ ...data, ["totalPrice"]: selectedPlan?.finalPrice,["discount"]:selectedPlan?.discount });
  }, [selectedPlan]);

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    plan: "",
    planStartingDate: "",
    totalPrice: "",
    discount: "",
    paidAmount: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState("");

  // handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // if (e.target.name === "plan") {
    //   setData({ ...data, ["totalPrice"]: selectedPlan.price });
    // }
  };

  // handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, profileImage: file });

    // preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const payLoad = new FormData();

    payLoad.append("name", data.name);
    payLoad.append("phone", data.phone);
    payLoad.append("email", data.email);
    payLoad.append("address", data.address);
    payLoad.append("gender", data.gender);
    payLoad.append("plan", data.plan);
    payLoad.append("planStartingDate", data.planStartingDate);
    payLoad.append("totalPrice", data.totalPrice);
    payLoad.append("discount", data.discount);
    payLoad.append("paidAmount", data.paidAmount);

    // profileImage must be a File object (if using input type file)
    if (data.profileImage instanceof File) {
    payLoad.append("profileImage", data.profileImage);
  }
    const res = await createMember(payLoad);
    if (res?.data?.success) {
      toast.success(res.data.message);
      getAllLiveMembersHandler();
      setshowAddMember(false);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  // console.log('plans',plans);

  // console.log("selectedPlan", selectedPlan);
  // console.log(",plans[0]",plans[0]);
  // console.log("Data",data);
  

  return (
    <div className="addMember-page">
  <form onSubmit={handleSubmit} className="addMember-form">

    <div className="form-header-m">
      <h2>Add Member</h2>
      <h3 onClick={() => setshowAddMember(false)}>
        <ImCross />
      </h3>
    </div>

    {/* Image Preview */}
    <div className="image-preview-container">
      {preview ? (
        <img src={preview} alt="Profile Preview" className="preview-img" />
      ) : (
        <div className="preview-placeholder">Image Preview</div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="image-input"
      />
    </div>

    {/* Form Grid */}
    <div className="form-grid-a">

      <div className="form-row">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={data.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Gender</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          required
          placeholder="select gender"
        >
          <option value="">Choose Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-row">
        <label>Select Plan</label>
        <select
          name="plan"
          value={data.plan}
          onChange={(e) => {
            handleChange(e);
            const chosen = plans.find((p) => p._id === e.target.value);
            setSelectedPlan(chosen);
          }}
          placeholder="select plan"
          required
        >
          <option value="">Choose Plan</option>
          {plans?.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Plan Starting Date</label>
        <input
          type="date"
          name="planStartingDate"
          value={data.planStartingDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Discount</label>
        <div className="wrapper discount-wrapper">
          <input
            type="number"
            name="discount"
            value={data.discount}
            required
            disabled
          />
          <span className="input-wrap">%</span>
        </div>
      </div>

      <div className="form-row">
        <label>Total Price</label>
        <div className="wrapper ruppe-wrapper">
          <span className="ruppe-wrap"><MdCurrencyRupee /></span>
          <input
            type="number"
            name="totalPrice"
            value={data.totalPrice}
            required
            disabled
          />
        </div>
      </div>

      <div className="form-row">
        <label>Paid Amount</label>
        <div className="wrapper ruppe-wrapper">
          <span className="ruppe-wrap"><MdCurrencyRupee /></span>
          <input
            type="number"
            name="paidAmount"
            value={data.paidAmount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

    </div>

    <button type="submit" className="submit-btn">Add Member</button>
  </form>
</div>

  );
};

export default AddMember;
