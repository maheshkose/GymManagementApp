import  jwt  from 'jsonwebtoken';
import catchAsyncErrors from './catchAsyncErrors.js'
import ErrorHandler from './ErrorHandler.js';
import User from '../Models/userModels.js';

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {

  const token = req.cookies.admin_token;
  
  // console.log('token',req.cookies.admin_token);
  

  if (!token) {
    return next(new ErrorHandler("Admin authentication token not found at middleware", 401));
  }

  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
 
  

  const user = await User.findById(decodedData.id).select("name email role");

  if (!user) {
    return next(new ErrorHandler("User not found at", 404));
  }

  if (user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admin only.", 403));
  }

  req.user = user;
  next();
});


export const isClientAuthenticated = catchAsyncErrors(async (req,res,next) => {
    const token = req.cookies.client_token;
    if (!token) {
        return next(new ErrorHandler('token is not found',400));
    }
    let decode;
    try {
          decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token",401));
    }

    const user = await User.findById(decode._id);

    if(!user){
        return next(new ErrorHandler("no user found",401));
    }
    req.user = user;
    if (user.role !== 'client') {
        return next(new ErrorHandler("only client can access this resources",401));
    }
    
    next();
})