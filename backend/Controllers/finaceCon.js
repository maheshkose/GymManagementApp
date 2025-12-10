import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js"
import Member from '../Models/membersModel.js'

export const totalrevenew = catchAsyncErrors(async (req,res,next) => {
    const revenew = await Member.aggregate([
        {
            $project:{
                "plansArray.paidAmount":1
            }
        },
        
    ]);
    

    if (!revenew) {
        return next(new ErrorHandler('revenew array not found',400));
    }
    console.log(revenew);
    

    let totalrevenewMoney = 0;
    revenew.forEach(element => {
        element.plansArray.forEach(e => {
            totalrevenewMoney += e.paidAmount;
        })
    });
    console.log('totalrevenewMoney',totalrevenewMoney);
    
    res.json({
        revenew,
        totalrevenewMoney
    })
})

export const totalExpenses = catchAsyncErrors(async (req,res,next) =>{
    
});