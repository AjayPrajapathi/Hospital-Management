import ApiError from "../utils/ApiError.js";
import { PatientModel } from "../Schema/patientSchema.js";
import DoctorModel from "../Schema/doctorSchema.js";

export const addPatient = async ({ name, email, password }) => {
  const existedPatient = await PatientModel.findOne({
    $or: [{ name }, { email }],
  });
  if (existedPatient) {
    throw new ApiError(409, "patient is already exist");
  }

  const newPatient = new PatientModel({ name, email, password });
  newPatient.save();
  return { name, email };
};

export const addDoctor = async ({ name, email, password, department }) => {
  const existedDoctor = await DoctorModel.findOne({
    $or: [{ name }, { email }],
  });
  if (existedDoctor) {
    throw new ApiError(409, "Doctor is already exist");
  }

  const newDoctor = new DoctorModel({ name, email, password, department });
  newDoctor.save();
  return { name, email, department };
};

export const userLogin = async ({ name, email }) => {
  const user =
    (await PatientModel.findOne({ $or: [{ name, email }] })) ||
    (await DoctorModel.findOne({ $or: [{ name, email }] }));
  if (!user) throw new ApiError(404, "invalid username or email");
  return user;
};
