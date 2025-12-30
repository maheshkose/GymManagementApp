import express from "express"
import mongoose from "mongoose"
import { isAdminAuthenticated } from "../Middlewares/authentication.js";
import { addAttendence, addMember, checkIn, checkOut, deleteAttendence, deleteMemberById, getAllExpiredMembers, getAllLiveMembers, getAllMembers, getMemberById, payDueAmount, renewmembersPlan, updateMemberById } from "../Controllers/membersCon.js";
import { getMembersStats, seedMembersStats } from "../Controllers/membersStatsCon.js";

const membersRouter = express.Router();
membersRouter.post('/createMember',isAdminAuthenticated, addMember);
membersRouter.get('/getAllMembers',isAdminAuthenticated, getAllMembers);
membersRouter.get('/getAllLiveMembers',isAdminAuthenticated, getAllLiveMembers);
membersRouter.get('/getAllExpiredMembers',isAdminAuthenticated, getAllExpiredMembers);
membersRouter.get('/getMemberById/:id',isAdminAuthenticated, getMemberById);
membersRouter.patch('/updateMemberById/:id',isAdminAuthenticated, updateMemberById);
membersRouter.delete('/deleteMemberById/:id',isAdminAuthenticated, deleteMemberById);

membersRouter.post('/addAttendence',isAdminAuthenticated, addAttendence);
membersRouter.post('/deleteAttendence',isAdminAuthenticated, deleteAttendence);


// getMembersStats
membersRouter.get('/getMembersStats', isAdminAuthenticated,getMembersStats);
membersRouter.get('/seedMembersStats', isAdminAuthenticated,seedMembersStats);

//renew plan
membersRouter.post('/renewPlan/:id',isAdminAuthenticated,renewmembersPlan);
membersRouter.post('/payDueAmount/:id',isAdminAuthenticated,payDueAmount);

//check in and out
membersRouter.get('/checkIn/:id',isAdminAuthenticated, checkIn);
membersRouter.get('/checkOut/:id',isAdminAuthenticated, checkOut);


export default membersRouter;