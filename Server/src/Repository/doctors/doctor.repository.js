import doctorModel from "../../Model/Registration/doctorSchema.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";
import { comparePassword } from "../../utils/passwordHashing.js";

//======== a doctory reporitory class contains methods for handle doctors db operations ==========//
export default class DoctorRepository{

    //===== doctor signup ===========//
    async doctorSignup(doctorInfo){
        try{

            const newDoctor = new doctorModel(doctorInfo);
            const savedDoctor = await newDoctor.save();
            return {success:true, message:"Signup sucessfully!", doctor:this.removedPassword(savedDoctor)}

        }catch(error){
            throw error;
        }
    }

    //===== doctor signin ==========//
    async doctorSignin({email, password}){
        try{
            const doctor = await doctorModel.findOne({email:email});
            if(!doctor){
                throw new AppError("Invalid email!", 404);
            }

            //======= checking passwords is correct ===================//
            const verifiedPassoword = await comparePassword(password, doctor.password);
            if(!verifiedPassoword){
                throw new AppError("Incorrect password!", 401);
            }

            return {success:true, message:"Signin sucessfully!", doctor:this.removedPassword(doctor)};


        }catch(error){
            throw error;
        }
    }






    //========= a utility functions which removed password when returned doctor =========//
    removedPassword(data){
        const {password, ...dataWithoutPassword} = data.toObject();;

        return dataWithoutPassword;
    }

}