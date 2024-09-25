import express from "express";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import Patient from "../../Model/Registration/PatientRegistration.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const patientRoutes = express.Router();

patientRoutes.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !username || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existedPatient = await Patient.findOne({
      $or: [{ name }, { email }],
    });
    if (existedPatient) {
      throw new ApiError(409, "patient is already exist");
    }
    const salt = await bcrypt.genSalt(12);
    const hasedPassword = await bcrypt.hash(password, salt);
    const newPatient = await Patient({
      name,
      email,
      password: hasedPassword,
    });
    const savePatient = await newPatient.save().select("-password");
    res
      .status(200)
      .json(new ApiResponse(200, savePatient, "patient sucessfully register"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
});

patientRoutes.post("/loginPatient", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const patient = await Patient.findOne({
      $or: [{ name, email }],
    });

    if (!patient) {
      throw new ApiError(404, "invalid username or email");
    }
    const result = await bcrypt.compare(password, patient.password);
    if (result) {
      const token = jwt.sign(
        {
          _id: patient._id,
          email: patient.email,
          username: patient.name,
        },
        process.env.jwt,
        { expiresIn: "1d" }
      );
      return res
        .status(200)
        .cookie("jwtToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(
          new ApiResponse(
            200,
            { _id: patient._id, username: patient.name },
            "successfully login"
          )
        );
    }
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
});
