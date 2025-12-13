import React, { useEffect, useState } from "react";
import "./PayDue.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContextHook } from "../../context/AppState";
import { ImCross } from "react-icons/im";
import "../AddMember/AddMember.css";
import { toast } from "react-toastify";

const PayDue = () => {
  const { getMemberById,payDueAmount } = AppContextHook();
  const navigate = useNavigate();
  const { id } = useParams();
  // const [plans, setPlans] = useState([]);
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
    planEndingDate:"",
    paymentMethod:"",
    totalPrice: "",
    discount: "",
    paidAmount: "",
    dueAmount:"",
    profileImage: null,
  });

  // const getAllPlanHandler = async () => {
  //   //fetch all plans from backend
  //   const res = await getAllPlans();
  //   if (res?.data?.success) {
  //     setPlans(res.data?.allPlans);
  //     // toast.success(res.data.message);
  //   } else {
  //     toast.error(res.response?.data?.message);
  //   }
  // };
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

      // await getAllPlanHandler();
      
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
        plan: member.currentPlan.plan,
        planStartingDate: member.currentPlan.planStartingDate,
        planEndingDate: member.currentPlan.planEndingDate,
        paymentMethod:"",
        totalPrice: member.currentPlan.finalPrice,
        discount: member.currentPlan.discount,
        paidAmount: "",
        dueAmount:member.currentPlan.dueAmount,
        profileImage: null,
      });
    }

  }, [member]);
  


  const [preview, setPreview] = useState("/default-pi.jpg");

  // handle input change
  const handleChange = (e) => {
    const {name,value} = e.target;

    setData((prev)=>{
      const update = {...prev,[name]:value}
      return update;
    });
  };

  // handle image file selection
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setData({ ...data, profileImage: file });

  //   // preview image
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreview(reader.result);
  //   };
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const res = await payDueAmount(member._id, 
      data
    );
    if (res?.data?.success) {
      toast.success(res.data.message);
      navigate(-1);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  // console.log('plans',plans);

 
  // console.log(",plans[0]",plans[0]);
  console.log("data", data);

  return (
   <div className="paydue-page">
  <form onSubmit={handleSubmit} className="paydue-form ">

    <div className="form-header-p">
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
      
    </div>

    {/* Form Grid */}
    <div className="form-grid-p">

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

      {/* <div className="form-row">
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
      </div> */}

      {/* <div className="form-row">
        <label>Select Plan</label>
        <select
          name="plan"
          value={data.plan}
          onChange={(e) => {
            handleChange(e);
            // const chosen = plans.find((p) => p._id === e.target.value);
            // setSelectedPlan(chosen);
          }}
          disabled={true}
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
      </div> */}

      {/* <div className="form-row">
        <label>Plan Starting Date</label>
        <input
          type="date"
          name="planStartingDate"
          value={data.planStartingDate?.slice(0, 10) || ""}
          onChange={handleChange}
          
          disabled={true}
        />
      </div> */}
      {/* <div className="form-row">
        <label>Plan Ending Date</label>
        <input
          type="date"
          name="planEndingDate"
          value={data.planEndingDate}
          // onChange={handleChange}
          // required
          // readOnly
          disabled={true}
        />
      </div> */}
      <div className="form-row">
            <label>Select Payment method</label>
            <select
              name="paymentMethod"
              value={data.paymentMethod}
              onChange={(e) => {
                handleChange(e);
                
              }}
              placeholder="select plan"
              required
            >
              <option value="">Choose Payment Method</option>
              {["Cash", "Online", "UPI", "Card", "Bank Transfer"]?.map((pm,i) => (
                <option key={i} value={pm}>
                  {pm}
                </option>
              ))}
            </select>
          </div>

      {/* <div className="form-row">
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
      </div> */}

<div className="form-row">
        <label>Due Amount</label>
        <input
          type="number"
          name="dueAmount"
          value={data.dueAmount}
          // onChange={handleChange}
          // required
          readOnly
        />
      </div>
      <div className="form-row">
        <label>Amount</label>
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
     PayDue
    </button>

  </form>
</div>

  );
};

export default PayDue;
