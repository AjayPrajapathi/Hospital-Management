import DoctorRepository from "./doctor.repository.js";
import { hashedPassword } from "../../utils/passwordHashing.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../../utils/ApiResponse.js";


//====== doctor controller class contains methods for communicate between doctor routes and repo ===//
export default class DoctorController{

    constructor(){
        this.doctorRepository = new DoctorRepository();
    }


    //====== doctor signup controller ========//
    async doctorSignup(req, res, next){
        try{

            const doctorInfo = req.body;
            const hashePassword =await hashedPassword(doctorInfo.password);

            const result = await this.doctorRepository.doctorSignup({
               
                ...doctorInfo,
                password:hashePassword,
            });

            if(result?.success){
                return res.json(new ApiResponse(201, result, "Doctor is created!"));
            }

        }catch(error){
            next(error);
        }
    }


    //======== doctor signin controller ============//
    async doctorSignin(req, res, next){
        try{

            const doctorCredential = req.body;

            console.log("signin req.body: ", doctorCredential)
            const result = await this.doctorRepository.doctorSignin(doctorCredential);

            if(result?.success){
                //---- create jwt token -------//
                const token = jwt.sign(
                    { email:result.doctor.email,
                      doctorId:result.doctor._id },

                    process.env.JWT_SECRET, {expiresIn:"3h"});

                //------ return response with cookie and token --------//
                return res.status(200).cookie("jwtToken", token, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
                .json({success:true, message:result.message, token:token, doctor:result.doctor})
                
            }


        }catch(error){
            console.log("error: ", error)
            next(error);
        }
    }


    //======== doctor logout controller ===========//
    async logoutDoctor(req, res, next){
        try{

            res.clearCookie('jwtToken').status(200).send({message:"User logout sucessfully!"});

        }catch(error){
            next(error)
        }

    }
}