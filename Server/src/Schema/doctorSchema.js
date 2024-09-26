<<<<<<< HEAD:Server/src/Model/Registration/doctorSchema.js
import mongoose, { Types } from "mongoose";

const doctorSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    phoneNumber:{
        type: Number,
        unique: true,
        required: [true, "Number is required"],
        minLength: [10, "Phoneno need contain min 10 digits"]
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
        default: "available"
    },


})

const doctorModel = mongoose.model("Doctor", doctorSchema);
export default doctorModel;
=======
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

>>>>>>> 2a53951 (Changes in Login and Register code for patient and doctor):Server/src/Schema/doctorSchema.js
