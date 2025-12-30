import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Employee from "../Models/employeModel.js";
import { v2 as cloudinary } from "cloudinary";
import Expense from "../Models/expenseModel.js";
import Attendance from "../Models/attendenceModel.js";
export const addEmployee = catchAsyncErrors(async (req, res, next) => {
  const profileImage = req.files?.profileImage;
  let pImage = { public_id: "", secure_url: "" };
  if (profileImage) {
    try {
      const cloudinaryRes = await cloudinary.uploader.upload(
        profileImage.tempFilePath
      );
      pImage = {
        public_id: cloudinaryRes.public_id,
        secure_url: cloudinaryRes.secure_url,
      };
    } catch (error) {
      return next(new ErrorHandler("cloudinary Error", 400));
    }
  }

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
    profileImage: pImage,
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
  const profileImage = req.files?.profileImage;
  let pImage = { public_id: "", secure_url: "" };
  if (profileImage) {
    try {
      const cloudinaryRes = await cloudinary.uploader.upload(
        profileImage.tempFilePath
      );
      pImage = {
        public_id: cloudinaryRes.public_id,
        secure_url: cloudinaryRes.secure_url,
      };
    } catch (error) {
      return next(new ErrorHandler("cloudinary Error", 400));
    }
  }

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
  } = req.body;

  const employee = await Employee.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      address,
      gender,
      role,
      salary,
      joiningDate,
      documents,
      profileImage: pImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

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

export const addAttendenceOfEmployee = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    // Find employee
    const employee = await Employee.findById(id);

    if (!employee) {
      return next(new ErrorHandler("Employee not found", 404));
    }

    // Check if attendance exists for today
    const alreadyPresent = employee.attendance.some((att) => {
      const attDate = new Date(att.date);
      return attDate >= startOfDay; // means already added for today
    });

    if (alreadyPresent) {
      return next(new ErrorHandler("Attendance already marked for today", 400));
    }

    // Add attendance
    const todayAttendence = {
      date: new Date(),
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $push: { attendance: todayAttendence } },
      { new: true }
    );
    if (!updateEmployeeById) {
      return next(new ErrorHandler("Attendance error", 400));
    }

    res.status(200).json({
      success: true,
      message: "Attendance added successfully",
      employee: updatedEmployee,
    });
  }
);

export const deleteAttendenceOfEmployee = catchAsyncErrors(
  async (req, res, next) => {
    const { id, date } = req.body;

    const user = await Employee.findByIdAndUpdate(
      id,
      { $pull: { attendence: { date: new Date(date) } } },
      { new: true }
    ).populate("attendance");

    if (!user) {
      return next(new ErrorHandler("user not found", 400));
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
      employee: user,
    });
  }
);
export const checkIn = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    // Find employee
    const employee = await Employee.findById(id).populate("attendance");

    if (!employee) {
      return next(new ErrorHandler("Employee not found", 404));
    }

    // Check if attendance exists for today
    const alreadyPresent = employee.attendance.some((att) => {
      const attDate = new Date(att.date);
      return attDate >= startOfDay; // means already added for today
    });

    if (alreadyPresent) {
      return next(new ErrorHandler("Attendance already marked for today", 400));
    }


    // Add attendance
    const todayAttendence = {
      employee: id,
      checkInTime: new Date(),
      checkOutTime: null,
      status: "present",
      date: new Date(),
    };
    const todayAttendenceDoc = await Attendance.create(todayAttendence);
    if (!todayAttendenceDoc) {
      return next(new ErrorHandler("Attendance error", 400));
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $push: { attendance: todayAttendenceDoc._id } },
      { new: true }
    );
    if (!updatedEmployee) {
      return next(new ErrorHandler("Attendance error at employee model", 400));
    }


    res.status(200).json({
      success: true,
      message: "Attendance added successfully",
      employee: updatedEmployee,
    });
  }
);

export const checkOut = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    // Find employee
    const employee = await Employee.findById(id).populate("attendance");

    if (!employee) {
      return next(new ErrorHandler("Employee not found", 404));
    }

    // Check if attendance exists for today
    const alreadyPresent = employee.attendance.find((att) => {
      const attDate = new Date(att.date);
      return attDate >= startOfDay ? attDate : false; // means already added for today
    });
      console.log('alreadyPresent',alreadyPresent);
    if (!alreadyPresent) {
      return next(new ErrorHandler("Employee had not checked in today", 400));
    }

    
    if (alreadyPresent.status === "checked out") {
      return next(new ErrorHandler("Employee already checked out today", 400));
    }

    // update attendance
    const todayAttendence = {
      employee: id,
      checkInTime: alreadyPresent.checkInTime,
      checkOutTime: new Date(),
      status: "checked out",
      date: new Date(),
    };
    const todayAttendenceDoc = await Attendance.findByIdAndUpdate(
      alreadyPresent._id,
      todayAttendence,
      { new: true }
    );
    if (!todayAttendenceDoc) {
      return next(new ErrorHandler("Attendance error", 400));
    }

 
    res.status(200).json({
      success: true,
      message: "Employee checked out successfully",
      
    });
  }
);
export const paySalary = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const { date, paidAmount,paymentMethod } = req.body;
  let employee = await Employee.findById(id);
  if (!employee) {
    return next(new ErrorHandler("Employee not found", 400));
  }
  const dueAmount = employee.salary - paidAmount;
  employee = await Employee.findByIdAndUpdate(
    id,
    { $push: { salaryPaid: { date, paidAmount, dueAmount } } },
    { new: true, runValidators: true }
  );
  if (!employee) {
    return next(new ErrorHandler("Employee not updated", 400));
  }

  const expense = await Expense.create({
    title:`Salary`,
    description:`Salary paid to ${employee.name}`,
    amount:paidAmount,
    category:"Salaries",
    paymentMethod,
    vendor:employee.email,
    addedBy:req.user._id,
    receiptImage:{public_id:"",secure_url:""},
    isRecurring:true,
    recurringPeriod:"Monthly",
  });
  
  if (!expense) {
    return next(new ErrorHandler("expense not created", 400));
  }

  
  res.status(200).json({
    success: true,
    message: "Salary Paid successfully",
    employee: employee,
  });
});
