import React, { useState } from "react";
import { AppContextHook } from "../../context/AppState";
import "./VerifyEmail.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";

const VerifyEmail = () => {
  const [isOtpAv, setIsOtpAv] = useState(false);
  const [isOtpverified, setIsOtpverified] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [resendOtp, setresendOtp] = useState(false);
  const [time, settime] = useState(300);
  const { getOtp, verifyOtp } = AppContextHook();
  const navigate = useNavigate();

  const getOtpHandler = async (e) => {
    e.preventDefault();
    const res = await getOtp({ email });
    if (res?.data?.success) {
      toast.success(res.data.message);
      setIsOtpAv(true);
      resendOtpTimerHandler();
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    const res = await verifyOtp({ email, otp });
    if (res?.data?.success) {
      toast.success(res.data.message);
        setIsOtpverified(true);
    } else {
      toast.error(res.response?.data?.message);
    }
  };
  const resendOtpTimerHandler = async () => {
    const interval = setInterval(() => {
      settime(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        setresendOtp(true);
      }
      return prev - 1;
    });
    }, 1000);
    setTimeout(() => {
      setresendOtp(true);
    }, 5 * 60 * 1000);
  };

  return (
    <div className="verify-email">
        {isOtpverified?<Register email={email}/>: !isOtpAv ? (
        <div className="email">
          <form className="get-otp" onSubmit={getOtpHandler}>
            <h2>Email Authentication</h2>
            <label>
              Gmail
              <input
                type="email"
                placeholder="Enter Your Gmail"
                // value={e.target.value}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button className="submit-btn" type="submit">
              {" "}
              Get Otp
            </button>
          </form>
        </div>
      ) : (
        <div className="otp">
          <form className="verify-otp" onSubmit={verifyOtpHandler}>
            <h1>Enter Your OTP</h1>
            <button onClick={()=>setIsOtpAv(false)} className="Edit-otp-btn">Edit Email</button>
            <label>
              OTP
              <input
                type="text"
                placeholder="Enter Your OTP"
                // value={e.target.value}
                onChange={(e) => setotp(e.target.value)}
              />
              {/* <p
                className={resendOtp ? "resendotp-active" : "resendotp"}
                onClick={() => {
                  resendOtp ? getOtpHandler : "";
                  settime(0);
                }}
              >
                Resend Otp : {resendOtp ? time : ""}
              </p> */}
            </label>
            <button type="submit"> Verify Otp</button>
          </form>
        </div>
      )};
     
    </div>
  );
};

export default VerifyEmail;
