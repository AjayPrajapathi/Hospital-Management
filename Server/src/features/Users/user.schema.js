import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: [true, "email is required"],
    },
    PhoneNo:{
        type: Number,
        unique: true,
        required: [true, "Number is required"],
        minLength: [10, "Phoneno need contain min 10 digits"]
    },
    type:{
        type: String,
        enum: ['Doctor', 'Patient'],
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    }
})

export const userModel = mongoose.model('User', userSchema);