import React, { useState } from 'react'
import './Register.css'
import { MdEmail, MdPassword } from 'react-icons/md'
import { AppContextHook } from '../../context/AppState'
import { toast } from 'react-toastify'

const Register = ({email}) => {
    const {register} = AppContextHook();
    const [data, setdata] = useState({
        name:"",
        email:email,
        password:""
    });

    const handleChange = (e) => {
        setdata({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);
        const res = await register(data);
        if (res?.data?.success) {
            toast.success(res.data.message);
        }else{
            toast.error(res.response?.data?.message)
        
        }
    };

    return (
    <div className='login-container'>
        <div className="register-card  ">
            
           
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                <p>Login to your Gym account</p>

                    <div className="input-group">
                    <MdEmail className="icon"/>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Enter Name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <MdEmail className="icon"/>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter Email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        readOnly = {true}
                    />
                </div>

                <div className="input-group">
                    <MdPassword className="icon"/>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                

                <button type="submit" className="login-btn">Login</button>

            </form>
        </div>
    </div>
  );
}

export default Register;
