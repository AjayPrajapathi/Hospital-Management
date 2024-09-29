import dotenv from "dotenv";
import { RegistrationRoutes } from "./src/Routers/DoctorPatientRegisterRoutes.js";
import express from "express";
import connectMongodb from "./src/config/connectMongodb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";
import { DoctorRoutes } from "./src/Routers/DoctorRoutes.js";
dotenv.config();
//====== setup cors =======//
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();
const port = process.env.PORT || 3000;

//====== used middleware for parsing req body and cookies =====//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(cors(corsOptions));
app.use(errorHandler);

app.use("/api/Register", RegistrationRoutes);
app.use("/api/doctor", DoctorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
  connectMongodb();
});
