import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("connect to DB");
    }).catch((err)=>{
        console.log(`Error connecting to DB: ${err}`);
    })

}

export default connectDB;