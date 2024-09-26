import express from "express";
import {
  patientRegister,
  doctorRegister,
} from "../Controller/user.controller.js";
import { userLogin } from "../Repository/user.repository.js";

export const RegistrationRoutes = express.Router();

RegistrationRoutes.route("/patient/register").post(patientRegister);
RegistrationRoutes.route("/doctor/register").post(doctorRegister);
RegistrationRoutes.route("/login").post(userLogin);
