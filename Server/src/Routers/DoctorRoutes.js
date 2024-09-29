import express from "express";
import { upload } from "../middleware/multer.js";
import {
  AddDoctorController,
  UpdateDoctorController,
} from "../Controller/DoctorController.js";

export const DoctorRoutes = express.Router();

DoctorRoutes.route("/doctoradd").post(
  upload.single("image"),
  AddDoctorController
);
DoctorRoutes.put(
  "/update/:doctorId",
  upload.single("image"),
  UpdateDoctorController
);
