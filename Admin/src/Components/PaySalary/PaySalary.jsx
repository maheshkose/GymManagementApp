import React, { useState } from "react";
import { CgCross } from "react-icons/cg";
import { AppContextHook } from "../../context/AppState";
import "./PaySalary.css";
import { ImCross } from "react-icons/im";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const PaySalary = () => {
  const { updateEmployeeById,getEmployeeById,paySalary } = AppContextHook();
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [employee, setemployee] = useState({});
  //  console.log('preview',preview);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    role: "",
    salary: "",
    joiningDate: "",
    documents: null,
    profileImage: null,
    date:"",
    paidAmount:"",
    
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setData({ ...data, [name]: files });
    } else  {
      setData({ ...data, [name]: value });
    }
   
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, ["profileImage"]: file });

    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "documents" && data.documents) {
        for (let i = 0; i < data.documents.length; i++) {
          formData.append("documents", data.documents[i]);
        }
      } else if (
        key === "profileImage" &&
        data.profileImage &&
        data.profileImage[0]
      ) {
        formData.append("profileImage", data.profileImage[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    const res = await paySalary(id, formData);
    if (res?.data?.success) {
      toast.success(res.data.message);
      navigate(-1);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const getEmployeeByIdHandler = async () => {
    const res = await getEmployeeById(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
      setemployee(res.data.employee);
      
      
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  useEffect(() => {
    getEmployeeByIdHandler();
  }, []);

  useEffect(() => {
    let formatted="";
     if (employee?.joiningDate) {
    const date = new Date(employee.joiningDate);
     formatted = date.toISOString().split("T")[0];
    
  }
    setData({
      name: employee.name,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    gender: employee.gender,
    role: employee.role,
    salary: employee.salary,
    joiningDate: formatted,
    documents: null,
    profileImage: null,
    date:"",
    paidAmount:"",
    
    });
   
    setPreview(employee.profileImage?.secure_url)
    
  }, [employee])
  
  console.log('data',data);
  
  

  return (
    <div className="pay-salary">
      <form className="pay-salary-form" onSubmit={handleSubmit}>
        <div className="pay-salary-header">
          <h1>Pay Salary</h1>
          <h3
            onClick={() => {
              navigate(-1);
            }}
          >
            <ImCross />
          </h3>
        </div>
        <div className="emp-img-doc">
          <div className="form-group">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="preview-img"
              />
            ) : (
              <div className="preview-placeholder">Image Preview</div>
            )}
            <label>Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              accept="image/*"
              disabled={true}
            />
          </div>

          {/* <div className="form-group">
            <label>Documents</label>
            <input
              type="file"
              name="documents"
              onChange={handleChange}
              multiple
            />
          </div> */}
        </div>

        <div className="form-element">

          <div className="form-group">
            <label>Salary Payment Date</label>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Paid Amount</label>
            <input
              type="number"
              name="paidAmount"
              value={data.paidAmount}
              onChange={handleChange}
            />
          </div>
          {/* <div className="form-group">
            <label>Due Amount</label>
            <input
              type="number"
              name="dueAmount"
              value={data.dueAmount}
              onChange={handleChange}
            />
          </div> */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
             disabled={true}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              disabled={true}
            >
              
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" onChange={handleChange} disabled={true}>
              {[
                "trainer",
                "receptionist",
                "accountant",
                "cleaner",
                "manager",
              ].map((role, i) => (
                <option key={i} value={role}>
                  {role.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={data.salary}
              onChange={handleChange}
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={data.joiningDate}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          
        </div>
        <button type="submit">Pay Salary</button>
      </form>
    </div>
  );
};

export default PaySalary;
