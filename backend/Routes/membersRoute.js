import express from "express"
import mongoose from "mongoose"
import { isAdminAuthenticated } from "../Middlewares/authentication.js";
import { addMember } from "../Controllers/membersCon.js";

const membersRouter = express.Router();
membersRouter.post('/createMember',addMember);


export default membersRouter;