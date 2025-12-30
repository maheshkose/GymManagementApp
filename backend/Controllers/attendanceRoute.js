import e from "express";
import { isAdminAuthenticated } from "../Middlewares/authentication.js";
import { getAttendenceOfTodaymembers, getAllAttendenceTrendOfmembers, getCurrentlyInGymmembers, getAttendenceTrendPerHourOfmembers, topattendingmembers, topattendingemployees, getCurrentlyInGymemployees, getAllAttendenceTrendOfEmployee, getAttendenceOfTodayEmployee } from "../Controllers/attendenceCon.js";

const attendanceRouter = e.Router();

attendanceRouter.get('/getAttendenceOfTodaymembers',isAdminAuthenticated, getAttendenceOfTodaymembers);
attendanceRouter.get('/getAllAttendenceTrendOfmembers',isAdminAuthenticated, getAllAttendenceTrendOfmembers);

attendanceRouter.get('/getCurrentlyInGymmembers',isAdminAuthenticated, getCurrentlyInGymmembers);
attendanceRouter.get('/getAttendenceTrendPerHourOfmembers',isAdminAuthenticated, getAttendenceTrendPerHourOfmembers);
attendanceRouter.get('/topattendingmembers',isAdminAuthenticated, topattendingmembers);

attendanceRouter.get('/topattendingEmployee',isAdminAuthenticated, topattendingemployees);
attendanceRouter.get('/getCurrentlyInGymEmployee',isAdminAuthenticated, getCurrentlyInGymemployees);
attendanceRouter.get('/getAllAttendenceTrendOfEmployee',isAdminAuthenticated, getAllAttendenceTrendOfEmployee);
attendanceRouter.get('/getAttendenceOfTodayEmployee',isAdminAuthenticated, getAttendenceOfTodayEmployee);

export default attendanceRouter;