import express from 'express';
import { totalrevenew } from '../Controllers/finaceCon.js';


const financeRouter = express.Router();

financeRouter.get('/totalRevenew',totalrevenew);

export default financeRouter;