import dotenv from "dotenv";
import { RegistrationRoutes } from "./src/Routers/DoctorPatientRegisterRoutes.js";

import express from "express";
import connectMongodb from "./src/config/connectMongodb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";

//====== setup cors =======//
const corsOptions = {
  origin: "http://localhost:3000", //------- Adjust this to your frontend's origin ---------//
  credentials: true,
};

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//====== used middleware for parsing req body and cookies =====//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(errorHandler);

app.use("/api/Register", RegistrationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
  connectMongodb();
});
