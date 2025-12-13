import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Expense from "../Models/expenseModel.js";
import Member from "../Models/membersModel.js";
import Revenue from "../Models/revenueModel.js";

export const totalrevenew = catchAsyncErrors(async (req, res, next) => {
  const revenew = await Revenue.find()

  if (!revenew) {
    return next(new ErrorHandler("revenew array not found", 400));
  }
  

  let totalrevenewMoney = 0;
  revenew.forEach((element) => {
    totalrevenewMoney += element.amount;
  });
 

  res.status(200).json({
    success:true,
    messsage:"Total revenew ",
    totalrevenewMoney,
  });
});

export const totalExpenses = catchAsyncErrors(async (req, res, next) => {
  const expense = await Expense.find()

  if (!expense) {
    return next(new ErrorHandler("expense array not found", 400));
  }
  

  let totalexpenseMoney = 0;
  expense.forEach((element) => {
    totalexpenseMoney += element.amount;
  });
  

  res.status(200).json({
    success:true,
    messsage:"Total expense ",
    totalexpenseMoney,
  });
});

export const getRevenueArray = catchAsyncErrors(async (req, res, next) => {
  const revenue = await Revenue.find()

  if (!revenue) {
    return next(new ErrorHandler("revenew array not found", 400));
  }
  

 
 

  res.status(200).json({
    success:true,
    messsage:"All revenue found",
    revenue,
  });
});
export const getExpensesArray = catchAsyncErrors(async (req, res, next) => {
  const expense = await Expense.find()

  if (!expense) {
    return next(new ErrorHandler("expense array not found", 400));
  }
  
  res.status(200).json({
    success:true,
    messsage:"All expenses found ",
    expense,
  });
});


export const getRevenueVsExpense = catchAsyncErrors(async (req, res, next) => {
  // 1️⃣ Get total revenue
  const revenueAgg = await Revenue.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$amount" },
      },
    },
  ]);

  // 2️⃣ Get total expense
  const expenseAgg = await Expense.aggregate([
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$amount" },
      },
    },
  ]);

  const totalRevenue = revenueAgg[0]?.totalRevenue || 0;
  const totalExpenses = expenseAgg[0]?.totalExpenses || 0;
  const profit = totalRevenue - totalExpenses;

  // 3️⃣ Monthly revenue
  const monthlyRevenue = await Revenue.aggregate([
    {
      $group: {
        _id: { month: { $month: "$date" } },
        revenue: { $sum: "$amount" },
      },
    },
  ]);

  

  // 4️⃣ Monthly expense
  const monthlyExpense = await Expense.aggregate([
    {
      $group: {
        _id: { month: { $month: "$date" } },
        expenses: { $sum: "$amount" },
      },
    },
  ]);

  // 5️⃣ Merge monthly data
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const monthly = monthNames.map((month, index) => {
    const rev = monthlyRevenue.find(r => r._id.month === index + 1);
    const exp = monthlyExpense.find(e => e._id.month === index + 1);

    return {
      month,
      revenue: rev?.revenue || 0,
      expenses: exp?.expenses || 0,
    };
  });

  res.status(200).json({
    success: true,
    message: "Revenue vs Expense data fetched",
    totalRevenue,
    totalExpenses,
    profit,
    monthly,
  });
});





export const addRevenue = async (
  source,
  description,
  amount,
  memberId,
  paymentMethod,
  receivedBy,
  invoiceNumber,
  receiptImage
) => {
  console.log("revenue");

  try {
    const revenue = await Revenue.create({
      source,
      description,
      amount,
      memberId,
      paymentMethod,
      receivedBy,
      invoiceNumber,
      receiptImage,
    });

    console.log(revenue);

    return revenue;
  } catch (error) {
    return error;
  }
};



export const addExpense = async (
  title,
  description,
  amount,
  category,
  paymentMethod,
  vendor,
  addedBy,
  receiptImage,
  isRecurring,
  recurringPeriod
) => {
  console.log("Adding expense...");

  try {
    const expense = await Expense.create({
      title,
      description,
      amount,
      category,
      paymentMethod,
      vendor,
      addedBy,
      receiptImage,
      isRecurring,
      recurringPeriod,
    });

    console.log("Expense Created:", expense);
    return expense;

  } catch (error) {
    console.error("Expense Error:", error);
    return error;
  }
};



