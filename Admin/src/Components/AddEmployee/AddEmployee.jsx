import React, { useState } from "react";
import { CgCross } from "react-icons/cg";
import { AppContextHook } from "../../context/AppState";
import "./AddEmployee.css";
import { ImCross } from "react-icons/im";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const { addEmployee } = AppContextHook();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
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
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setData({ ...data, [name]: files });
    } else {
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

    const res = await addEmployee(formData);
    if (res?.data?.success) {
      toast.success(res.data.message);
      navigate(-1);
    } else {
      toast.error(res.response?.data?.message);
    }
  };

  return (
    <div className="add-employee">
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <div className="add-e-header">
          <h1>Add Employee</h1>
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
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              required
            >
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" onChange={handleChange}>
                {["Choose Gender","trainer", "receptionist", "accountant", "cleaner", "manager"].map((role,i)=>(
                    <option key={i} value={role}>{role.toUpperCase()}</option>
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
            />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={data.joiningDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
