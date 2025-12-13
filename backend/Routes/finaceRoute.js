import express from 'express';
import { getExpensesArray, getRevenueArray, getRevenueVsExpense, totalExpenses, totalrevenew } from '../Controllers/finaceCon.js';
import { isAdminAuthenticated } from "../Middlewares/authentication.js";

const financeRouter = express.Router();

financeRouter.get('/totalRevenew', isAdminAuthenticated, totalrevenew);
financeRouter.get('/totalExpenses', isAdminAuthenticated, totalExpenses);
financeRouter.get('/getRevenueArray', isAdminAuthenticated, getRevenueArray);
financeRouter.get('/getExpensesArray', isAdminAuthenticated, getExpensesArray);
financeRouter.get('/getRevenueVsExpense', isAdminAuthenticated, getRevenueVsExpense);

export default financeRouter;