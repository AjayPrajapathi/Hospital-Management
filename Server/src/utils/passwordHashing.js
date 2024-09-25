import bcrypt from "bcrypt";

//======= function to hashed a passowrds =========//
export async function hashedPassword(password){
   const hashedPass= await bcrypt.hash(password, 12);
   return hashedPass;
    
}


//======== functions to verifu passowrds ==============//
export async function comparePassword(password, hashedPass) {
   return await bcrypt.compare(password, hashedPass);
    
}