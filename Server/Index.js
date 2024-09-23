import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// login and Registration Routers

// Doctor routers

// Patients related Routers

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
