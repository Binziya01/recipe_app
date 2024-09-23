import app from "./src/app.js";
import config from "./src/config/config.js";
import colors from "colors"
import mongoose from "mongoose"

(async(req,res)=>{
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log(`Successfully connected to mongodb`.bgCyan.white);

    }catch(error){
        console.log(`Error in DB connection ${error}`);
    }
})()

const PORT = config.PORT
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`.bgMagenta.white);
    
})