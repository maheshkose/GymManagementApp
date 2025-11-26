import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './library/connectDb.js';

dotenv.config();

const app = express();

//database connection
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174',process.env.FRONTEND_URL,process.env.ADMIN_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}));

//routes
app.get('/', (req, res) => {
  res.send('Welcome to the Gym Management App Backend!');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
