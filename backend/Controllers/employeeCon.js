import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js"
import Employee from "../Models/employeModel.js";

export const addEmployee = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    gender,
    role,
    salary,
    joiningDate,
    documents,
    profileImage,
  } = req.body;

    // Manual validation
  if (!name || !email || !phone || !gender || !role || !salary) {
    return next(new ErrorHandler("All required fields must be provided", 400));
  }
  // Create employee
  const employee = await Employee.create({
    name,
    email,
    phone,
    address,
    gender,
    role,
    salary,
    joiningDate,
    documents,
    profileImage,
  });

  res.status(200).json({
    success: true,
    message: "Employee added successfully",
    employee,
  });
});


export const getAllEmployee = catchAsyncErrors(async (req, res, next) => {
  const allEmployees = await Employee.find();

  if (!allEmployees || allEmployees.length === 0) {
    return next(new ErrorHandler("Employees not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Employees found successfully",
    allEmployees,
  });
});

export const getEmployeeById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);

  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Employee found successfully",
    employee,
  });
});

export const updateEmployeeById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    employee,
  });
});

export const deleteEmployeeById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndDelete(id);

  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
    employee,
  });
});
