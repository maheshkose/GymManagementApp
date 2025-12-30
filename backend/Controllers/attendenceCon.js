import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Members from "../Models/membersModel.js";
import Attendance from "../Models/attendenceModel.js";

export const getAttendenceOfTodaymembers = catchAsyncErrors(
  async (req, res, next) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const attendences = await Attendance.find(
      
      {
         member: { $ne: null },
        date: { $gte: startOfDay },
      }
    )
      .populate("member")
      .populate("member.currentPlan.plan");
    if (!attendences || attendences.length === 0) {
      return next(new ErrorHandler("No attendence found for today", 400));
    }
    res.status(200).json({
      success: true,
      message: "Attendence fetched successfully",
      attendences,
    });
  }
);
function getWeekDayFast(dateString) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(dateString).getDay()];
}

export const getAllAttendenceTrendOfmembers = catchAsyncErrors(
  async (req, res, next) => {
    const attendences = await Attendance.aggregate([
      { $match: { member: { $ne: null } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata", // change if needed
            },
          },
          weekDay: {
            $first: {
              $dateToString: {
                format: "%u",
                date: "$date",
                timezone: "Asia/Kolkata",
              },
            },
          },

          records: { $push: "$member" },
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 1, count: 1, records: 1 } },
    ]);
    if (!attendences || attendences.length === 0) {
      return next(new ErrorHandler("No attendence found", 400));
    }

    const weeklyattendenceTrend = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      const dayData = attendences.find((a) => a._id === dateString);
      return {
        date: dateString,
        weekDay: getWeekDayFast(dateString),
        count: dayData ? dayData.count : 0,
        records: dayData ? dayData.records : [],
      };
    }).reverse();

    const weeklyAvgAttendence = parseInt(
      weeklyattendenceTrend.reduce((sum, day) => sum + day.count, 0) / 7
    );

    res.status(200).json({
      success: true,
      message: "Attendence trend fetched successfully",
      attendences,
      weeklyattendenceTrend,
      weeklyAvgAttendence,
    });
  }
);

//currently in the gym

export const getCurrentlyInGymmembers = catchAsyncErrors(
  async (req, res, next) => {
    const attendences = await Attendance.find({
      status: "present",
      member: { $ne: null },
    }).populate("member");
    if (!attendences || attendences.length === 0) {
      return next(new ErrorHandler("No members currently in gym", 400));
    }
    res.status(200).json({
      success: true,
      message: "Currently in gym members fetched successfully",
      attendences,
    });
  }
);

//attendence trend per hour of time for members
export const getAttendenceTrendPerHourOfmembers = catchAsyncErrors(
  async (req, res, next) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const attendences = await Attendance.aggregate([
      { $match: { member: { $ne: null }, date: { $gte: startOfDay } } },
      {
        $group: {
          _id: { $hour: { date: "$checkInTime", timezone: "Asia/Kolkata" } },
          count: { $sum: 1 },
        },
      },
      { $project: { hour: "$_id", count: 1, _id: 0 } },
      { $sort: { hour: 1 } },
    ]);
    if (!attendences || attendences.length === 0) {
      return next(new ErrorHandler("No attendence found", 400));
    }
    const fullDayHours = Array.from({ length: 24 }, (_, i) => i);
    const attendenceTrendPerHour = fullDayHours.map((hour) => {
      const hourData = attendences.find((a) => a.hour === hour);
      return {
        hour,
        count: hourData ? hourData.count : 0,
      };
    });
    const peakHour = attendenceTrendPerHour.reduce(
      (max, current) => (current.count > max.count ? current : max),
      { hour: null, count: 0 }
    );

    res.status(200).json({
      success: true,
      message: "Attendence trend per hour fetched successfully",
      attendences,
      fullDayHours: attendenceTrendPerHour,
      peakHour,
    });
  }
);

export const topattendingmembers = catchAsyncErrors(async (req, res, next) => {
  const attendences = await Attendance.aggregate([
    { $match: { member: { $ne: null } } },
    {
      $group: {
        _id: "$member",
        attendenceCount: { $sum: 1 },
      },
    },
    {
      $sort: { attendenceCount: -1 },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "members",
        localField: "_id",
        foreignField: "_id",
        as: "member",
      },
    },
    { $unwind: "$member" },
  ]);

  if (!attendences || attendences.length === 0) {
    return next(new ErrorHandler("No attendence found", 400));
  }

  res.status(200).json({
    success: true,
    message: "Top attending members fetched successfully",
    attendences,
  });
});


//Emplyees attendance tracking to be added later
export const getAttendenceOfTodayEmployee = catchAsyncErrors(
  async (req, res, next) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const attendences = await Attendance.find(
      
      {
         employee: { $ne: null },
        date: { $gte: startOfDay },
      }
    )
      .populate("employee")
      .populate("employee.currentPlan.plan");
    if (!attendences || attendences.length === 0) {
      return next(new ErrorHandler("No attendence found for today", 400));
    }
    res.status(200).json({
      success: true,
      message: "Attendence fetched successfully",
      attendences,
    });
  }
);

export const getAllAttendenceTrendOfEmployee = catchAsyncErrors(
  async (req, res, next) => {
    const attendences = await Attendance.aggregate([
      { $match: { employee: { $ne: null } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata", // change if needed
            },
          },
          weekDay: {
            $first: {
              $dateToString: {
                format: "%u",
                date: "$date",
                timezone: "Asia/Kolkata",
              },
            },
          },

          records: { $push: "$employee" },
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 1, count: 1, records: 1 } },
    ]);
    if (!attendences || attendences.length === 0) {
      return next(new ErrorHandler("No attendence found", 400));
    }

    const weeklyattendenceTrend = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      const dayData = attendences.find((a) => a._id === dateString);
      return {
        date: dateString,
        weekDay: getWeekDayFast(dateString),
        count: dayData ? dayData.count : 0,
        records: dayData ? dayData.records : [],
      };
    }).reverse();

    const weeklyAvgAttendence = parseInt(
      weeklyattendenceTrend.reduce((sum, day) => sum + day.count, 0) / 7
    );

    res.status(200).json({
      success: true,
      message: "Attendence trend fetched successfully",
      attendences,
      weeklyattendenceTrend,
      weeklyAvgAttendence,
    });
  }
);

export const getCurrentlyInGymemployees = catchAsyncErrors(
  async (req, res, next) => {
    const attendences = await Attendance.find({
      status: "present",
      employee: { $ne: null },
    }).populate("employee");
    if (!attendences || attendences.length === 0) {
      return next(new ErrorHandler("No employees currently in gym", 400));
    }
    res.status(200).json({
      success: true,
      message: "Currently in gym employees fetched successfully",
      attendences,
    });
  }
);

export const topattendingemployees = catchAsyncErrors(async (req, res, next) => {
  const attendences = await Attendance.aggregate([
    { $match: { employee: { $ne: null } } },
    {
      $group: {
        _id: "$employee",
        attendenceCount: { $sum: 1 },
      },
    },
    {
      $sort: { attendenceCount: -1 },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "_id",
        as: "employee",
      },
    },
    { $unwind: "$employee" },
  ]);

  if (!attendences || attendences.length === 0) {
    return next(new ErrorHandler("No attendence found", 400));
  }

  res.status(200).json({
    success: true,
    message: "Top attending employees fetched successfully",
    attendences,
  });
});
