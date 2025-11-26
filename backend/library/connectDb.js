import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {databaseName: "gymManagementApp"});
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

export default connectDb;