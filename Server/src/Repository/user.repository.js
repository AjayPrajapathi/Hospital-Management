import ApiError from "../utils/ApiError.js";
import { PatientModel } from "../Schema/patientSchema.js";
import Admin from "../Schema/Admin.js";

export const addPatient = async ({ name, email, password }) => {
  const existedPatient = await PatientModel.findOne({
    $or: [{ name }, { email }],
  });
  if (existedPatient) {
    throw new ApiError(409, "patient is already exist");
  }

  const newPatient = await PatientModel({ name, email, password });
  newPatient.save();
  return { name, email };
};

export const addAdmin = async ({ name, email, password }) => {
  const esixtedAdmin = await Admin.findOne({
    $or: [{ name }, { email }],
  });
  if (esixtedAdmin) {
    throw new ApiError(409, "Doctor is already exist");
  }

  const newAdmin = new Admin({ name, email, password });
  newAdmin.save();
  return { name, email };
};

export const userLogin = async ({ name, email }) => {
  const user =
    (await PatientModel.findOne({ $or: [{ name, email }] })) ||
    (await Admin.findOne({ $or: [{ name, email }] }));
  if (!user) throw new ApiError(404, "invalid username or email");
  return user;
};
