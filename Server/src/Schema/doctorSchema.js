import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
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
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  department:{
    type: String,
    enum: ['Cardio','Neuro', 'Dermitologist', 'ENT', 'Dentist', 'gynecologist']
  },
  image:{
    type: File
  }
});

export const doctorModel = mongoose.model("Doctor", doctorSchema);

