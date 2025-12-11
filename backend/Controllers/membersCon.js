import express from "express";
import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Members from "../Models/membersModel.js";
import Plan from "../Models/planModels.js";
import Revenue from "../Models/revenueModel.js";
import { addRevenue } from "./finaceCon.js";

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
    paidAmount,
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
    } catch (err) {
      return next(new ErrorHandler("Cloudinary upload failed", 500));
    }
  }

  // Auto payment status
  const paymentStatus =
    paidAmount >= totalPrice ? "paid" : paidAmount > 0 ? "partial" : "pending";

  const planFromDb = await Plan.findById(plan);
  if (!planFromDb) {
    return next(new ErrorHandler("plan not found", 400));
  }
  const startDate = new Date(planStartingDate);
  console.log("startDate", startDate);

  if (!startDate) {
    {
      return next(new ErrorHandler("Invalid start date", 400));
    }
  }
  if (isNaN(startDate.getTime())) {
    return next(new ErrorHandler("Invalid start date", 400));
  }

  const planEndingDate = new Date(
    startDate.getTime() + planFromDb.duration * 24 * 60 * 60 * 1000
  );

  if (!planEndingDate) {
    return next(new ErrorHandler("planEndingDate error", 400));
  }
  const dueAmount = planFromDb.finalPrice - paidAmount;
  if (!dueAmount && dueAmount !== 0) {
    return next(new ErrorHandler("Due Amount error", 400));
  }
  const currentPlan = {
    plan,
    planStartingDate,
    planEndingDate,
    paidAmount,
    dueAmount,
    paymentStatus,
  };
  const newMember = await Members.create({
    name,
    phone,
    email,
    address,
    gender,
    currentPlan,
    plansArray: [currentPlan],
    attendence: [],
    profileImage: profileImageData, // store null if not uploaded
  });

  //adding revenue
  // const revenue =  addRevenue('Membership',`New Member ${name} email ${email} Added this payment`,paidAmount,newMember._id,'paymentMethode',req.user.Id,"invoiceNumber",{public_id:"",secure_url:""})

  res.status(201).json({
    success: true,
    message: "Member added successfully",
    member: newMember,
  });
});

export const getAllMembers = catchAsyncErrors(async (req, res, next) => {
  const allMembers = await Members.find()
    .sort({ createdAt: -1 })
    .populate("currentPlan.plan");
  if (!allMembers || allMembers.length === 0) {
    return next(new ErrorHandler("Members not found", 400));
  }
  res.status(200).json({
    success: true,
    message: "Member fechted successfully ",
    allMembers,
  });
});

export const getAllLiveMembers = catchAsyncErrors(async (req, res, next) => {
  const allLiveMembers = await Members.find({ isActive: true })
    .sort({ createdAt: -1 })
    .populate("currentPlan.plan");
  if (!allLiveMembers || allLiveMembers.length === 0) {
    return next(new ErrorHandler("Members not found", 400));
  }
  res.status(200).json({
    success: true,
    message: "Member fechted successfully ",
    allLiveMembers,
  });
});

export const getAllExpiredMembers = catchAsyncErrors(async (req, res, next) => {
  const allExpiredMembers = await Members.find({ isActive: false })
    .sort({ createdAt: -1 })
    .populate("currentPlan.plan");
  if (!allExpiredMembers) {
    return next(new ErrorHandler("Members not found", 400));
  }

  res.status(200).json({
    success: true,
    message: "Member fechted successfully ",
    allExpiredMembers,
  });
});
export const getMemberById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Member Id is missing in req"), 400);
  }
  const member = await Members.findById(id)
    .populate("currentPlan.plan")
    .populate({
      path: "plansArray",
      populate: {
        path: "plan",
        model: "Plan",
      },
    });
  if (!member) {
    return next(new ErrorHandler("Member not found"), 400);
  }

  res.status(200).json({
    success: true,
    message: "Member found successfully",
    member,
  });
});

export const updateMemberById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  // console.log('data',data);
  //profile image update
  const img = req.files?.profileImage;
  console.log("img", img);

  let profileImageData = {
    public_id: null,
    secure_url: null,
  };
  if (img) {
    try {
      const cloudinaryRes = await cloudinary.uploader.upload(img.tempFilePath);
      profileImageData = {
        public_id: cloudinaryRes.public_id,
        secure_url: cloudinaryRes.secure_url,
      };
      console.log("profileImageData", profileImageData);

      data.profileImage = { ...profileImageData };
      console.log("data.profileImage", data.profileImage);
    } catch (error) {
      return next(new ErrorHandler("Cloudinary upload failed", 500));
    }
  }

  if (!id) {
    return next(new ErrorHandler("Member Id is missing in req"), 400);
  }
  const planFromDb = await Plan.findById(data.plan);
  if (!planFromDb) {
    return next(new ErrorHandler("Plan not found"), 400);
  }
  const startDate = new Date(data.planStartingDate);
  console.log("startDate", startDate);

  if (!startDate) {
    {
      return next(new ErrorHandler("Invalid start date", 400));
    }
  }
  if (isNaN(startDate.getTime())) {
    return next(new ErrorHandler("Invalid start date", 400));
  }

  const planEndingDate = new Date(
    startDate.getTime() + planFromDb.duration * 24 * 60 * 60 * 1000
  );

  if (!planEndingDate) {
    return next(new ErrorHandler("planEndingDate error", 400));
  }
  const dueAmount = planFromDb.finalPrice - data.paidAmount;
  if (!dueAmount && dueAmount !== 0) {
    return next(new ErrorHandler("Due Amount error", 400));
  }
  const paymentStatus =
    data.paidAmount >= planFromDb.finalPrice
      ? "paid"
      : data.paidAmount > 0
      ? "partial"
      : "pending";

    
  
  const updatedMember = {
    name: data.name,
    email: data.email,
    gender: data.gender,
    address: data.address,
    phone: data.phone,
    profileImage: data.profileImage,
    currentPlan: {
      plan: data.plan,
      planStartingDate: data.planStartingDate,
      planEndingDate: planEndingDate,
      paidAmount: data.paidAmount,
      dueAmount: dueAmount,
      paymentStatus: paymentStatus,
    },
  };
  const existingMember = await Members.findById(id);
  if (!member) {
    return next(new ErrorHandler("Member not found"), 400);
  }
  // if (existingMember.paidAmount !== updatedMember.paidAmount) {
  //     const revenue =  addRevenue('Membership',`Member clears due payment ${data.name} email ${data.email} Added this payment`,updatedMember.paidAmount,id,'paymentMethode',req.user.Id,"invoiceNumber",{public_id:"",secure_url:""})
  // }

  const member = await Members.findByIdAndUpdate(id, updatedMember, {
    new: true,
    runValidators: true,
  });
  if (!member) {
    return next(new ErrorHandler("Member not found"), 400);
  }

  res.status(200).json({
    success: true,
    message: "Member updated successfully",
    member,
  });
});
export const deleteMemberById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Member Id is missing in req"), 400);
  }
  const member = await Members.findByIdAndDelete(id);
  if (!member) {
    return next(new ErrorHandler("Member not found"), 400);
  }

  res.status(200).json({
    success: true,
    message: "Member deleted successfully",
    member,
  });
});

export const addAttendence = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.body;
  const todayAttendence = {
    date: new Date(),
    status: "present",
  };
  let user = await Members.findById(userId);
  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }
  const attendence = [...user.attendence];
  const isAlreadymarked = attendence.find((att) => {
    const attdate = new Date(att.date);
    attdate.setHours(0, 0, 0, 0);

    const todayDate = new Date(todayAttendence.date);
    todayDate.setHours(0, 0, 0, 0);
    return attdate.getTime() === todayDate.getTime();
  });
  if (isAlreadymarked) {
    return next(new ErrorHandler("Attendance already marked for today", 400));
  }
  user = await Members.findByIdAndUpdate(
    userId,
    { $push: { attendence: todayAttendence } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "attendence added successfully",
    user: user,
  });
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

export const renewmembersPlan = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler("Member Id is missing in req"), 400);
  }

  const { plan, planStartingDate, paidAmount } = req.body;

  if (!plan || !planStartingDate || !paidAmount) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const planFromDb = await Plan.findById(plan);
  if (!planFromDb) {
    return next(new ErrorHandler("Plan not found"), 400);
  }
  const startDate = new Date(planStartingDate);

  if (!startDate) {
    {
      return next(new ErrorHandler("Invalid start date", 400));
    }
  }
  if (isNaN(startDate.getTime())) {
    return next(new ErrorHandler("Invalid start date", 400));
  }

  const planEndingDate = new Date(
    startDate.getTime() + planFromDb.duration * 24 * 60 * 60 * 1000
  );

  if (!planEndingDate) {
    return next(new ErrorHandler("planEndingDate error", 400));
  }
  const dueAmount = planFromDb.finalPrice - paidAmount;
  if (!dueAmount && dueAmount !== 0) {
    return next(new ErrorHandler("Due Amount error", 400));
  }
  const paymentStatus =
    paidAmount >= planFromDb.finalPrice
      ? "paid"
      : paidAmount > 0
      ? "partial"
      : "pending";

  const member = await Members.findByIdAndUpdate(
    id,
    {
      $push: {
        plansArray: {
          plan,
          planStartingDate,
          planEndingDate,
          paidAmount,
          dueAmount,
          paymentStatus,
        },
      },
      $set: {
        currentPlan: {
          plan,
          planStartingDate,
          planEndingDate,
          paidAmount,
          dueAmount,
          paymentStatus,
        },
      },
    },

    { new: true, runValidators: true }
  );

  if (!member) {
    return next(new ErrorHandler("Error updating Member", 400));
  }

  res.status(200).json({
    success: true,
    message: "Member's plan renewed successfully",
    member,
  });
});
