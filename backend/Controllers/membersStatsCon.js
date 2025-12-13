import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import MembersStats from "../Models/memberStats.js";


export const getMembersStats = catchAsyncErrors(async (req,res,next) => {
    const targetDate = new Date("2025-12-01T06:21:32.726+00:00");
    const membersStats = await MembersStats.find();


    if (!membersStats || membersStats.length === 0) {
        return next(new ErrorHandler('Members Stats not found',400));
    }
    console.log(membersStats);
    

//     const firstDayStats = membersStats[0].statsArray.filter(stat => {
//   const day = new Date(stat.date).getDate(); // or getUTCDate() if needed
//   return day === 1;
// });

    res.status(200).json({
        success:'true',
        messsage:"Members Stats Found",
        membersStats
    })
})
const dateseed = (month)=>{
const now = new Date();
    const firstDate = new Date(now);
    firstDate.setDate(1);
    firstDate.setMonth(month);

    return firstDate;
}

export const seedMembersStats = catchAsyncErrors(async (req,res,next) => {
    
    const statsArray = [
        {
            date:dateseed(1),
            membersCount:90
        },
        {
            date:dateseed(2),
            membersCount:80
        },
        {
            date:dateseed(3),
            membersCount:70
        },
        {
            date:dateseed(4),
            membersCount:60
        },
        {
            date:dateseed(5),
            membersCount:90
        },
         {
            date:dateseed(6),
            membersCount:80
        },
        {
            date:dateseed(7),
            membersCount:100
        },
        {
            date:dateseed(8),
            membersCount:50
        },
        {
            date:dateseed(9),
            membersCount:70
        },
         {
            date:dateseed(10),
            membersCount:50
        },
        {
            date:dateseed(11),
            membersCount:30
        },
        {
            date:dateseed(12),
            membersCount:60
        }
        
    ]
    const membersStats = await MembersStats.insertMany(statsArray);
    if (!membersStats) {
        return next(new ErrorHandler('Members Stats not seed',400));
    }
    res.status(200).json({
        success:'true',
        messsage:"Members Stats Found",
        membersStats
    })
})


