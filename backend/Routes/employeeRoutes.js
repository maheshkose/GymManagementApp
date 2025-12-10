import express from "express";
import {
  addEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  addAttendenceOfEmployee,
  deleteAttendenceOfEmployee,
  paySalary,
} from "../Controllers/employeeCon.js";

import { isAdminAuthenticated } from "../Middlewares/authentication.js";



const employeeRouter = express.Router();

// Add new employee (protected route)
employeeRouter.post("/add", isAdminAuthenticated, addEmployee);

// Get all employees (protected route)
employeeRouter.get("/getAllEmployee", isAdminAuthenticated, getAllEmployee);

// Get single employee by ID (protected route)
employeeRouter.get("/getEmployeeById/:id", isAdminAuthenticated, getEmployeeById);

// Update employee by ID (protected route)
employeeRouter.put("/updateEmployeeById/:id", isAdminAuthenticated, updateEmployeeById);

// Delete employee by ID (protected route)
employeeRouter.delete("/deleteEmployeeById/:id", isAdminAuthenticated, deleteEmployeeById);

//Add attendence of employee
employeeRouter.get('/addAttendenceOfEmployee/:id',isAdminAuthenticated, addAttendenceOfEmployee);
//delete attendence of employee
employeeRouter.post('/deleteAttendenceOfEmployee',isAdminAuthenticated, deleteAttendenceOfEmployee);

employeeRouter.post("/paySalary/:id",isAdminAuthenticated,paySalary);
export default employeeRouter;
