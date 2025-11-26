import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    otp:{
        type:String,
        required:true,
    },
    expireIn:{
        type:Date,
        required:true,
        default:()=> Date.now() + 5*60*1000, //5 minutes
        index:{expires:0},
    },
}, { timestamps: true });
export const Otp = mongoose.model("Otp",otpSchema);