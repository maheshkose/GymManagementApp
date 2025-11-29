import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import User from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import { generateCookies } from "../Utils/jwt.js";

import { sendOtpEmail } from "../library/Gmail.js";
import { Otp } from "../Models/otpModel.js";


export const registerAdmin = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please provide name, email and password", 400));
    }
    const exsitingUser = await User.findOne({ email });
    if (exsitingUser) {
        return next(new ErrorHandler("User already exsits with this Gmail", 409));
    }
    const hasdedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hasdedPassword,
        role: 'admin',
        
    })
     res.status(200).json({
        success:true,
        message:`${newUser.role} registered succefully`,
        user:{name:newUser.name,email:newUser.email,role:newUser.role}
    });
    
});
export const registerClient = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please provide name, email and password", 400));
    }
    const exsitingUser = await User.findOne({ email });
    if (exsitingUser) {
        return next(new ErrorHandler("User already exsits with this Gmail", 409));
    }
    const hasdedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hasdedPassword,
        role: 'client',
        
    })
    res.status(200).json({
        success:true,
        message:`${newUser.role} registered succefully`,
        user:{name:newUser.name,email:newUser.email,role:newUser.role}
    });
    
});

export const sendGmailVerificationOtp = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("Please provide email", 400));
    }
    const gmailInfo = await sendOtpEmail(email);
    if (!gmailInfo) {
        return next(new ErrorHandler("Failed to send OTP email", 500));
    }

    res.status(200).json({
        success: true,
        message: "OTP sent to your email",
        gmailInfo
    });
})

export const verifyGmailOtp = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return next(new ErrorHandler("Please provide email and otp", 400));
    }
    const otpEntry = await Otp.findOne({ email });
    if (!otpEntry) {
        return next(new ErrorHandler("OTP not found or expired", 404));
    }
    const isOtpValid = await bcrypt.compare(otp, otpEntry.otp);
    if (!isOtpValid) {
        return next(new ErrorHandler("Invalid OTP", 400));
    }
    await Otp.deleteMany({ email });

    res.status(200).json({
        success: true,
        message: "OTP verified successfully",
    });

});

export const loginAdmin = catchAsyncErrors(async (req, res, next) => {
    // Login logic here
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (user.role !== 'admin') {
        return next(new ErrorHandler("Only admin can access this feature"));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid password", 400));
    }

    generateCookies(user, res);
});

export const loginClient = catchAsyncErrors(async (req, res, next) => {
    // Login logic here
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid password", 400));
    }

    generateCookies(user, res);
});

export const logoutAdmin = catchAsyncErrors(async (req,res,next) => {
    const token = req.cookies.admin_token;

    if (!token) {
        return next(new ErrorHandler("Authentication Token not found", 400));
    }

    res.clearCookie("admin_token",{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    })
     res.status(200).json({
        success:true,
        message:`logout succefully`
        
    });
}) 

export const logoutClient = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies.client_token;

    if (!token) {
        return next(new ErrorHandler("Authentication Token not found", 400));
    }

    res.clearCookie("client_token",{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    })
     res.status(200).json({
        success:true,
        message:`logout succefully`
        
    });
}) 

export const getUserDetails = catchAsyncErrors(async (req,res,next) => {
    const user = req.user;
    
    
    if (!user) {
         return next(new ErrorHandler("User Not found to", 404));
    }
    res.status(200).json({
        success:true,
        message:'User details fetched successfully',
        user
    })
})