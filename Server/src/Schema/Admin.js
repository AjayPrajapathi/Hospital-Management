import mongoose from "mongoose";

const AdminModel = new mongoose.Schema({
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
});

const Admin = mongoose.model("Admin", AdminModel);
export default Admin;
