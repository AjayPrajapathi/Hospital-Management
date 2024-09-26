import dotenv from "dotenv";
import userRoutes from "./src/Routers/patientRoutes.js";

import express from "express";
import connectMongodb from "./src/config/connectMongodb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";

import doctorRouter from "./src/Repository/doctors/doctor.router.js";

dotenv.config();

const app = express();


//====== used middleware for parsing req body and cookies =====//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//====== setup cors =======//
const corsOptions = {
  origin: 'http://localhost:3000', //------- Adjust this to your frontend's origin ---------//
  credentials: true,
};

app.use(cors(corsOptions))


//======= setup routes for doctors =======================//
app.use("/api/doctor", doctorRouter)





//======= handle error using errorHandler middleware =========//
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", userRoutes);




app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
  connectMongodb()
})