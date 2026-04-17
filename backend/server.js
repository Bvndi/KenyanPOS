import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";


dotenv.config();

//create app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Use item routes
app.use("/api/items", itemRoutes);
// Use purchase routes
app.use("/api/purchases", purchaseRoutes);
// Use sale routes
app.use("/api/sales", saleRoutes);
// Use auth routes
app.use("/api/auth", authRoutes);
// Use equipment routes
app.use("/api/equipment", equipmentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("POS Backend Running");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});