import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  phoneNumber: {
    type: Number,
    unique: true,
    required: [true, "Number is required"],
    minLength: [10, "Phoneno need contain min 10 digits"],
  },

  gender: {
    type: String,
    enum: ["male", "female"],
  },

  specialty: {
    type: String,
    required: true,
  },

  qualifications: {
    type: [String],
    required: true,
  },

  workingHours: {
    type: String,
    required: true,
  },

  availabilityStatus: {
    type: String,
    enum: ["available", "unavailable", "on_leave"],
    default: "available",
  },
});

const DoctorModel = mongoose.model("DoctorModel", DoctorSchema);
export default DoctorModel;
