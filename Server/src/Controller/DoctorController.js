import ApiError from "../utils/ApiError.js";

import {
  addDoctor,
  DeleteRepo,
  ReadDoctor,
  specificDoctor,
} from "../Repository/DoctorRepository.js";
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

export const getallDoctor = async (req, res) => {
  try {
    const doctor = await ReadDoctor();
    res.status(200).json(new ApiResponse(200, doctor, "all doctors"));
  } catch (error) {
    res.status(404).json(new ApiResponse(404, "unable to get all doctors"));
  }
};

export const DeleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await DeleteRepo(id);
    res.status(200).json(new ApiResponse(200, "deleted sucessfully"));
  } catch {
    res
      .status(500)
      .json(new ApiResponse(500, "unable to delete the selected doctor"));
  }
};
export const DeatailOfDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const specific = await specificDoctor(id);

    if (!specific) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No doctor found with this ID"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, specific, "Doctor details fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res
      .status(500)
      .json(
        new ApiResponse(500, null, "Unable to get doctor with the provided ID")
      );
  }
};
