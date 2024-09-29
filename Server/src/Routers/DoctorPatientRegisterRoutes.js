import express from "express";
import {
  patientRegister,
  AdminRegister,
} from "../Controller/user.controller.js";
import { userLogin } from "../Repository/user.repository.js";

export const RegistrationRoutes = express.Router();

RegistrationRoutes.route("/patient/register").post(patientRegister);
RegistrationRoutes.route("/admin/register").post(AdminRegister);
RegistrationRoutes.route("/login").post(userLogin);
