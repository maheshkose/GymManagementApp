import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "gymManagementApp" });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
    console.log("🔁 Retrying in 5 seconds...");
    setTimeout(connectDb, 5000);
  }
};

// Handle disconnects after initial connection
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected! Retrying…");
  connectDb();
});

mongoose.connection.on("error", (err) => {
  console.log("⚠️ MongoDB error:", err.message);
});

export default connectDb;
