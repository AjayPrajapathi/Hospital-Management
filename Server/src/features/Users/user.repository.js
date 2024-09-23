
export const registerUser = async(userData)=>{
    try{
        const newUser = new userModel(userData);
        await newUser.save();
        return {success:true, res:newUser};
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err } };
    }
}