import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {dbName: "gymManagementApp"});
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
         console.log("Retrying in 5 seconds...");
    setTimeout(connectDb, 5000);
    }
}

export default connectDb;