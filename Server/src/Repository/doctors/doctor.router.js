import express from "express";
import DoctorController from "./doctor.controller.js";

const doctorRouter = express.Router();
const doctorController = new DoctorController();


//====== doctor signup routes ========//
doctorRouter.post("/signup", (req, res, next)=>{
    doctorController.doctorSignup(req, res, next);
});

//====== doctor signin routes ========//
doctorRouter.post("/signin", (req, res, next)=>{
    doctorController.doctorSignin(req, res, next);
});

//====== doctor logout routes ========//
doctorRouter.get("/logout", (req, res, next)=>{
    doctorController.logoutDoctor(req, res, next);
});



export default doctorRouter;