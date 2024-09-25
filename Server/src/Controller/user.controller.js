import { addPatient, userLogin } from "../Repository/user.repository.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";

export const patientRegister = async(req,res)=>{
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }
        const salt = await bcrypt.genSalt(12);
        const hasedPassword = await bcrypt.hash(password, salt);
        const data = {
            name,
            email,
            password: hasedPassword,
          }
        const savePatient = await addPatient(data);
        res
        .status(200)
        .json(new ApiResponse(200, savePatient, "patient sucessfully register"));
    }
    catch (error) {
        res
          .status(error.statusCode || 500)
          .json(new ApiResponse(error.statusCode || 500, null, error.message));
      }
}

export const doctorRegister = async(req,res)=>{
    try{
        const { name, email, password, department } = req.body;
        if (!name || !email || !password || !department) {
            throw new ApiError(400, "All fields are required");
        }
        const salt = await bcrypt.genSalt(12);
        const hasedPassword = await bcrypt.hash(password, salt);
        const data = {
            name,
            email,
            password: hasedPassword,
            department
          }
        const savePatient = await addDoctor(data);
        res
        .status(200)
        .json(new ApiResponse(200, savePatient, "Doctor sucessfully register"));
    }
    catch (error) {
        res
          .status(error.statusCode || 500)
          .json(new ApiResponse(error.statusCode || 500, null, error.message));
      }
}

export const loginUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await userLogin({name, email});
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                },
                process.env.jwt,
                { expiresIn: "1d" }
            );
            return res.status(200).cookie("jwtToken", token, {
                httpOnly: true, secure: true, sameSite: "none"})
                .json( new ApiResponse( 200,
                    { _id: patient._id, name: patient.name },
                    "successfully login"));
        }
    }catch (error) {
        res
          .status(error.statusCode || 500)
          .json(new ApiResponse(error.statusCode || 500, null, error.message));
      }
}