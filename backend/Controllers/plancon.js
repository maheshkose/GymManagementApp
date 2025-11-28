import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Plan from "../Models/planModels.js";


// Create a new plan
export const createPlan = catchAsyncErrors(async (req, res, next) => {
  const { name, duration, description, price, features, discount, planType } =
    req.body;

  //  Validation
  if (!name || !duration || !description || !price) {
    return next(
      new ErrorHandler(
        "Please provide name, duration, description, and price for the plan",
        400
      )
    );
  }

  // Check if plan with same name exists
  const existingPlan = await Plan.findOne({ name });
  if (existingPlan) {
    return next(new ErrorHandler("A plan with this name already exists", 400));
  }

  // Create Plan
  const newPlan = await Plan.create({
    name,
    duration,
    description,
    price,
    features: features || [],
    discount: discount || 0,
    planType: planType || "basic",
    // finalPrice is auto-calculated by schema default function
  });

  // Response
  res.status(201).json({
    success: true,
    message: "Plan created successfully",
    plan: newPlan,
  });
});

export const updatePlan = catchAsyncErrors(async (req, res, next) => {
  const { planId,name, duration, description, price, features, discount, planType } = req.body;

  const updateData = { name, duration, description, price, features, discount, planType };

  
 

  const updatedPlan = await Plan.findByIdAndUpdate(
    planId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedPlan) {
    return next(new ErrorHandler("Plan not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Plan updated successfully",
    plan: updatedPlan,
  });
});

export const deletePlan = catchAsyncErrors(async (req, res, next) => {
  const { planId } = req.params;
  if (!planId) {
    return next(new ErrorHandler("Plan ID is required", 400));
  }
  const deletedPlan = await Plan.findByIdAndDelete(planId);

  if (!deletedPlan) {
    return next(new ErrorHandler("Plan not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Plan deleted successfully",
    deletedPlan,
  });
});


export const getAllPlans = catchAsyncErrors(async (req, res, next) => {
 
  const allPlans = await Plan.find();

  if (!allPlans || allPlans.length === 0) {
    return next(new ErrorHandler("Plans not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Plan fetched successfully",
    allPlans,
  });
});

export const getPlanById = catchAsyncErrors(async (req, res, next) => {
  const {planId} = req.params;
  const plan = await Plan.findById(planId);

  if (!plan) {
    return next(new ErrorHandler("Plan not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Plan fetched successfully",
    plan
  });
});

