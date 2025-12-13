import React, { useState } from 'react'
import './Login.css'
import { MdEmail, MdPassword } from 'react-icons/md'
import { AppContextHook } from '../../context/AppState'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const {login} = AppContextHook();
    const [data, setdata] = useState({
        email:"",
        password:""
    });

    const handleChange = (e) => {
        setdata({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);
        const res = await login(data);
        if (res?.data?.success) {
            toast.success(res.data.message);
            navigate('/');
        }else{
            toast.error(res.response?.data?.message)
        
        }
    };

    return (
    <div className='login-container'>
        <div className="login-card">
            
           
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                <p>Login to your Gym account</p>

                <div className="input-group">
                    <MdEmail className="icon"/>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter Email"
                        value={data.email}
                        onChange={handleChange}
                        required
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

                <div className="form-bottom">
                    <label>
                        <input type="checkbox" /> Remember Me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className="login-btn">Login</button>

            </form>
        </div>
    </div>
  );
}

export default Login;
