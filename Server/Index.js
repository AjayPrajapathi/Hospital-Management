import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/Routers/patientRoutes.js";
// import doctorRoutes from './src/Routers/doctorRoutes.js';
import { connectDb } from "./src/db.Config.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
  connectDb();
});
