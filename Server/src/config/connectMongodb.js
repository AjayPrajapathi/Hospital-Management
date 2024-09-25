import mongoose from "mongoose";

//====== function to connect database ============//
const connectMongodb = async()=>{
    try{

        mongoose.connect(`${process.env.DB_URL}/HospitalDB`);
        
        console.log("mongodb is connected");


    }catch(error){
        console.log("error connect mongodb: ", error);
    }
}

export default connectMongodb;