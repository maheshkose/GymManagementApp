import express from "express";
import {  getUserDetails, loginAdmin, loginClient, logoutAdmin, logoutClient, registerAdmin, registerClient, sendGmailVerificationOtp, verifyGmailOtp } from "../Controllers/userControllers.js";
import { isAdminAuthenticated, isClientAuthenticated } from "../Middlewares/authentication.js";

const userRouter = express.Router();

// Sample route for user registration
userRouter.post("/getGamilVerificationOtp", sendGmailVerificationOtp);
userRouter.post("/verifyGmailOtp", verifyGmailOtp);
userRouter.post("/registerAdmin", registerAdmin);
userRouter.post("/registerClient", registerClient);
userRouter.post("/loginAdmin", loginAdmin);
userRouter.post("/loginClient", loginClient);
userRouter.get("/getAdminDetails",isAdminAuthenticated, getUserDetails);
userRouter.get("/getClientDetails",isClientAuthenticated, getUserDetails);
userRouter.get("/adminLogout",isAdminAuthenticated, logoutAdmin);
userRouter.get("clientLogout",isClientAuthenticated, logoutClient);


export default userRouter;