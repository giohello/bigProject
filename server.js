import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/userRoutes.js";
import billionaireRoutes from "./routes/billionaires.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use(express.static("public"));
app.use("/api/billionaires", billionaireRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
