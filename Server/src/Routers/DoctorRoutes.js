import express from "express";
import { upload } from "../middleware/multer.js";
import {
  AddDoctorController,
  DeatailOfDoctor,
  DeleteDoctor,
  getallDoctor,
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

DoctorRoutes.route("/getallDoctor").get(getallDoctor);
DoctorRoutes.route("/Delete/:id").delete(DeleteDoctor);
DoctorRoutes.route("/detailDoctor/:id").get(DeatailOfDoctor);
