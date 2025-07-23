import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ Database not connected: " + error.message);
        process.exit(1); // stop the app if DB connection fails
    }
}

export default connectDB;
