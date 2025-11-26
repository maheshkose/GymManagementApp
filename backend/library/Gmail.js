import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Otp } from "../Models/otpModel.js";
import bcrypt from "bcryptjs";
dotenv.config();

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Gym Management" <${process.env.GMAIL_FROM}> <${process.env.GMAIL_USER }>`,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const saveOtpToDb = async (email, otp) => {
    try {

        await Otp.deleteMany({ email });
        const hashedOtp = await bcrypt.hash(otp,10);
        const otpEntry = await Otp.create({
        email,
        otp:hashedOtp,
    });
    return otpEntry;
    } catch (error) {
        console.log("Error saving OTP to DB: ", error);
    }
   
}

export const sendOtpEmail = async (email) => {
    try {
        const otp = generateOTP();
        const info = await sendEmail(
            email,
            "Your OTP Code",
            `<h1>Your OTP Code is ${otp}</h1><p>This code will expire in 5 minutes.</p>`
        );
        
        const otpToDb = await saveOtpToDb(email, otp);
        return {info , otpToDb};
    } catch (error) {
        console.log("Error in sendOtpEmail: ", error);
    }
}