import express from 'express'
import { createPlan, deletePlan, getAllPlans, getPlanById, updatePlan } from '../Controllers/plancon.js';
import {isAdminAuthenticated } from '../Middlewares/authentication.js'

const planRouter = express.Router();

planRouter.post('/createPlan',isAdminAuthenticated ,createPlan);
planRouter.put('/updatePlan/:planId',isAdminAuthenticated ,updatePlan);
planRouter.delete('/deletePlan/:planId',isAdminAuthenticated ,deletePlan);
planRouter.get('/getAllPlans',isAdminAuthenticated ,getAllPlans);
planRouter.get('/getPlanById/:planId',isAdminAuthenticated ,getPlanById);


export default planRouter;