import ApiError from "../utils/ApiError.js";

import { addDoctor } from "../Repository/DoctorRepository.js";
import ApiResponse from "../utils/ApiResponse.js";
import { updateDoctor } from "../Repository/DoctorRepository.js";

export const AddDoctorController = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      gender,

      specialty,
      qualifications,
      workingHours,
      availabilityStatus,
    } = req.body;

    const imageFile = req.file?.path;
    if (!imageFile) {
      return res.status(400).json({ message: "Image file not found" });
    }

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !specialty ||
      !qualifications ||
      !workingHours
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const doctor = {
      name,
      email,
      phoneNumber,
      gender,
      imageFile,
      specialty,
      qualifications,
      workingHours,
      availabilityStatus,
    };

    // Save doctor via repository
    const saveDoctor = await addDoctor(doctor);
    console.log(saveDoctor);

    res
      .status(200)
      .json(new ApiResponse(200, saveDoctor, "Doctor added successfully"));
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};
export const UpdateDoctorController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const {
      name,
      email,
      phoneNumber,
      gender,
      specialty,
      qualifications,
      workingHours,
      availabilityStatus,
    } = req.body;

    const imageFile = req.file?.path;
    const updateData = {
      name,
      email,
      phoneNumber,
      gender,
      imageFile,
      specialty,
      qualifications,
      workingHours,
      availabilityStatus,
    };
    const updatedDoctor = await updateDoctor(doctorId, updateData);
    res
      .status(200)
      .json(new ApiResponse(200, updatedDoctor, "Doctor updated successfully"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};
