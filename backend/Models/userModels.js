import mongoose from "mongoose";
import adminSchema from "./adminModel.js";
import jwt from "jsonwebtoken";
// import clientSchema from "./clientModel.js";

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
        minLenth: [3, "Name must be at least 3 characters long"],

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 characters long"],
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client',
    },
    admin:{
        type:adminSchema,
        default:{}
    },
    // client:{
    //     type:clientSchema,
    //     default:{}
    // },
}, { timestamps: true });


userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
}

const User = mongoose.model("User", userSchema);
 export default User;


