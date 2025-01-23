import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import seedAdmin from "./utils/seedAdmin.js";

dotenv.config();

connectDB();

const app = express();

// Request Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

seedAdmin();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
