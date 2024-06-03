import mongoose from "mongoose";


 const Connect= async (username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@cluster0.vdili48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try{
       await mongoose.connect(URL);
       console.log('database connected');
    }
    catch(error){
        console.log('oops error',error);
    }

}

export default Connect;