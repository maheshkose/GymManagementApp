import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './library/connectDb.js';
import errorMiddleware from './Middlewares/errorMiddleware.js';
import cloudinaryConnection from './library/cloudinary.js';
import { sendEmail } from './library/Gmail.js';
import userRouter from './Routes/userRoutes.js';
import membersRouter from './Routes/membersRoute.js';import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";



dotenv.config();

const app = express();

//database connection
connectDb();
//cron setup
import './library/planCheck.js';
import planRouter from './Routes/planRoutes.js';
import employeeRouter from './Routes/employeeRoutes.js';
import financeRouter from './Routes/finaceRoute.js';
import attendanceRouter from './Controllers/attendanceRoute.js';


app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174',process.env.FRONTEND_URL,process.env.ADMIN_URL],
    methods:['GET','POST','PUT','DELETE','PATCH'],
    credentials:true
}));

//send mail test route
app.get('/send-test-email', async (req, res) => {
  const info = await sendEmail("kosemahesh9@gmail.com","test email","<h1>This is a test email from Gym Management App</h1>");
  res.send('Test email sent', info);
});
//cloudinary connection
cloudinaryConnection();

//routes
app.get('/', (req, res) => {
  res.send('Welcome to the Gym Management App Backend!');
});

app.use('/api/user',userRouter);
app.use('/api/members',membersRouter);
app.use('/api/plan',planRouter); 
app.use('/api/employee',employeeRouter); 
app.use('/api/finance',financeRouter); 
app.use('/api/attendance',attendanceRouter); 


//error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


