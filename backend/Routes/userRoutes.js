import express from "express";
import {  loginAdmin, loginClient, registerAdmin, registerClient, sendGmailVerificationOtp, verifyGmailOtp } from "../Controllers/userControllers.js";

const userRouter = express.Router();

// Sample route for user registration
userRouter.post("/getGamilVerificationOtp", sendGmailVerificationOtp);
userRouter.post("/verifyGmailOtp", verifyGmailOtp);
userRouter.post("/registerAdmin", registerAdmin);
userRouter.post("/registerClient", registerClient);
userRouter.post("/loginAdmin", loginAdmin);
userRouter.post("/loginClient", loginClient);


export default userRouter;