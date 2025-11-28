import express from 'express'
import catchAsyncErrors from '../Middlewares/catchAsyncErrors.js'
import {v2 as cloudinary} from "cloudinary"
import ErrorHandler from '../Middlewares/ErrorHandler.js';
import Members from '../Models/membersModel.js';

export const addMember = catchAsyncErrors(async (req, res, next) => {
  const profileImage = req.files?.profileImage;

  const {
    name,
    phone,
    email,
    address,
    gender,
    plan,
    planStartingDate,
    totalPrice,
    discount,
    paidAmount
  } = req.body;

  if (
    !name ||
    !phone ||
    !email ||
    !address ||
    !gender ||
    !plan ||
    !planStartingDate ||
    !totalPrice ||
    !discount ||
    !paidAmount
  ) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const existingMember = await Members.findOne({ email });
  if (existingMember) {
    return next(new ErrorHandler("Member with this email already exists", 400));
  }

  // Upload profile image only if provided
  let profileImageData = {
    public_id: null,
    secure_url: null,
  };

  if (profileImage) {
    try {
      const cloudinaryRes = await cloudinary.uploader.upload(
        profileImage.tempFilePath
      );
      profileImageData = {
        public_id: cloudinaryRes.public_id,
        secure_url: cloudinaryRes.secure_url,
      };
    } catch (err){

        return next(new ErrorHandler("Cloudinary upload failed", 500));
    }
  }

  // Auto payment status
  const paymentStatus =
    paidAmount >= totalPrice
      ? "paid"
      : paidAmount > 0
      ? "partial"
      : "pending";

  const newMember = await Members.create({
    name,
    phone,
    email,
    address,
    gender,
    plan,
    planStartingDate,
    totalPrice,
    discount,
    paidAmount,
    paymentStatus,
    attendence:[],
    profileImage: profileImageData, // store null if not uploaded
  });

  res.status(201).json({
    success: true,
    message: "Member added successfully",
    member: newMember,
  });
});

export const getAllMembers = catchAsyncErrors(async (req,res,next) => {
    const allMembers = await Members.findMany({});
    if (!allMembers || allMembers.length === 0) {
        return next(new ErrorHandler('Members not found',400));
    }
    res.status(200).json({
        success:true,
        message:'Member fechted successfully ',
        allMembers
    })
});

export const getAllLiveMembers = catchAsyncErrors(async (req,res,next) => {
    const allLiveMembers = await Members.findMany({isActive:true});
    if (!allLiveMembers || allLiveMembers.length === 0) {
        return next(new ErrorHandler('Members not found',400));
    }
    res.status(200).json({
        success:true,
        message:'Member fechted successfully ',
        allLiveMembers
    })
});

export const getAllExpiredMembers = catchAsyncErrors(async (req,res,next) => {
    const allExpiredMembers = await Members.findMany({isActive:false});
    if (!allExpiredMembers || allExpiredMembers.length === 0) {
        return next(new ErrorHandler('Members not found',400));
    }
    res.status(200).json({
        success:true,
        message:'Member fechted successfully ',
        allExpiredMembers
    })
});






export const addAttendence = catchAsyncErrors(async (req,res,next) => {
    const {userId} = req.body;
    const todayAttendence = {
      date:new Date(),
    }
    const user = await Members.findByIdAndUpdate(userId,{$push:{attendence:todayAttendence}},{new:true});
    if (!user) {
      return next(new ErrorHandler('user not found',400));
    }

    res.status(200).json({
      success:true,
      message:"attendence added successfully",
      user:user
    })
});

export const deleteAttendence = catchAsyncErrors(async (req, res, next) => {
  const { userId, date } = req.body;

  const user = await Members.findByIdAndUpdate(
    userId,
    { $pull: { attendence: { date: new Date(date) } } },
    { new: true }
  );

  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }

  res.status(200).json({
    success: true,
    message: "Attendance deleted successfully",
    user,
  });
});


