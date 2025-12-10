import React, { useEffect, useState } from "react";
import "./RenewMemberPlan.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContextHook } from "../../context/AppState";
import { ImCross } from "react-icons/im";
import "../AddMember/AddMember.css";
import { toast } from "react-toastify";

const RenewMemberPlan = () => {
  const { renewMemberPlan, getAllPlans, getMemberById } = AppContextHook();
  const navigate = useNavigate();
  const { id } = useParams();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [member, setmember] = useState({});
  console.log("current member", member);
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
  const getMemberByIdHandler = async () => {
    console.log("getMemberById");

    const res = await getMemberById(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
      setmember(res.data.member);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  useEffect(() => {
    const fn = async () => {
      await getMemberByIdHandler();

      await getAllPlanHandler();
      setSelectedPlan(plans[0]);
    };
    fn();
  }, []);
  useEffect(() => {
    if (member && Object.keys(member).length !== 0) {
      setData({
        name: member.name,
        phone: member.phone,
        email: member.email,
        address: member.address,
        gender: member.gender,
        plan: member.currentPlan.plan._id,
        planStartingDate: member.currentPlan.planStartingDate,
        totalPrice: member.currentPlan.plan.finalPrice,
        discount: member.currentPlan.plan.discount,
        paidAmount: member.currentPlan.paidAmount,
        profileImage: null,
      });
    }
  }, [member]);
  // useEffect(() => {
  //   setSelectedPlan(plans[0]);
  // }, [plans]);
  useEffect(() => {
    setData({
      ...data,
      ["totalPrice"]: selectedPlan?.finalPrice,
      ["discount"]: selectedPlan?.discount,
    });
  }, [selectedPlan]);

  const [preview, setPreview] = useState("/default-pi.jpg");

  // handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, profileImage: file });

    // preview image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    //   const payLoad = new FormData();

    //   payLoad.append("name", data.name);
    //   payLoad.append("phone", data.phone);
    //   payLoad.append("email", data.email);
    //   payLoad.append("address", data.address);
    //   payLoad.append("gender", data.gender);
    //   payLoad.append("plan", data.plan);
    //   payLoad.append("planStartingDate", data.planStartingDate);
    //   payLoad.append("totalPrice", data.totalPrice);
    //   payLoad.append("discount", data.discount);
    //   payLoad.append("paidAmount", data.paidAmount);

    //   // profileImage must be a File object (if using input type file)
    //   if (data.profileImage instanceof File) {
    //   payLoad.append("profileImage", data.profileImage);
    // }

    const res = await renewMemberPlan(member._id, {
      plan: data.plan,
      planStartingDate: data.planStartingDate,
      paidAmount: data.paidAmount,
    });
    if (res?.data?.success) {
      toast.success(res.data.message);
      navigate(-1);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  // console.log('plans',plans);

  // console.log('selectedPlan',selectedPlan);
  // console.log(",plans[0]",plans[0]);
  console.log("data", data);

  return (
   <div className="renewMember-page">
  <form onSubmit={handleSubmit} className="renewMember-form ">

    <div className="form-header-r">
      <h2>Renew Member</h2>
      <h3 onClick={() => navigate(-1)}>
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
        disabled
      />
    </div>

    {/* Form Grid */}
    <div className="form-grid-r">

      <div className="form-row">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className="form-row">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className="form-row">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className="form-row">
        <label>Gender</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          disabled
        >
          <option value="">Gender</option>
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
          required
        >
          <option value="">Choose Plan</option>
          {plans?.length ? (
            plans.map((plan, i) => (
              <option key={i} value={plan._id}>
                {plan.name}
              </option>
            ))
          ) : (
            <option>No plans</option>
          )}
        </select>
      </div>

      <div className="form-row">
        <label>Plan Starting Date</label>
        <input
          type="date"
          name="planStartingDate"
          value={data.planStartingDate?.slice(0, 10) || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Total Price</label>
        <input
          type="number"
          name="totalPrice"
          value={data.totalPrice}
          disabled
        />
      </div>

      <div className="form-row">
        <label>Discount</label>
        <input
          type="number"
          name="discount"
          value={data.discount}
          disabled
        />
      </div>

      <div className="form-row">
        <label>Paid Amount</label>
        <input
          type="number"
          name="paidAmount"
          value={data.paidAmount}
          onChange={handleChange}
          required
        />
      </div>

    </div>

    <button type="submit" className="submit-btn">
      Renew Member
    </button>

  </form>
</div>

  );
};

export default RenewMemberPlan;
