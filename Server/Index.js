import express from "express";
import dotenv from "dotenv";
import { patientRoutes } from "./src/Repository/Patient/PatientRegistrationRepo";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/patient", patientRoutes);
app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
