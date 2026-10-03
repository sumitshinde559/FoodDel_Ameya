import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("DB Connected"))
}


// set MONGODB_URI in .env (or in Vercel environment variables), e.g.
// mongodb+srv://user:password@cluster.mongodb.net/food-del
