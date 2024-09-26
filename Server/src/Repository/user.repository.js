import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {patientModel} from "../Schema/patientSchema.js";
import {doctorModel} from '../Schema/doctorSchema.js'
import jwt from "jsonwebtoken";

export const addPatient = async ({name, email, password}) => {
  const existedPatient = await patientModel.findOne({
    $or: [{ name }, { email }],
  });
  if (existedPatient) {
    throw new ApiError(409, "patient is already exist");
  }
    
  const newPatient = new patientModel({name, email, password});
  newPatient.save();
  return {name, email}
};

export const addDoctor = async ({name, email, password, department}) => {
  const existedPatient = await doctorModel.findOne({
    $or: [{ name }, { email }],
  });
  if (existedPatient) {
    throw new ApiError(409, "patient is already exist");
  }
    
  const newPatient = new patientModel({name, email, password, department});
  newPatient.save();
  return {name, email, department}
};

export const userLogin =  async ({name, email}) => {
  const user = await patientModel.findOne({$or: [{ name, email }]}) || 
                  await doctorModel.findOne({$or: [{name, email}]});
  if (!user)
    throw new ApiError(404, "invalid username or email");
  return user
};
