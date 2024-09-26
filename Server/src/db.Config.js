import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/hospital';

export const connectDb = async() =>{
    try{
        await mongoose.connect(url)
        console.log('mongodb connected using mongoose')
    }
    catch(err){
        console.log(err);
    }
}