import express from "express";
import {
  addEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from "../Controllers/employeeCon.js";
import { isAdminAuthenticated } from '../Middlewares/authentication.js' ;

const employeeRouter = express.Router();

// Add new employee (protected route)
employeeRouter.post("/add", isAdminAuthenticated, addEmployee);

// Get all employees (protected route)
employeeRouter.get("/", isAdminAuthenticated, getAllEmployee);

// Get single employee by ID (protected route)
employeeRouter.get("/:id", isAdminAuthenticated, getEmployeeById);

// Update employee by ID (protected route)
employeeRouter.put("/:id", isAdminAuthenticated, updateEmployeeById);

// Delete employee by ID (protected route)
employeeRouter.delete("/:id", isAdminAuthenticated, deleteEmployeeById);

export default employeeRouter;
