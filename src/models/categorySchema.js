import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    menuId:{ 
        type : Number,
        required : true
    },
    slug : {
        type:String,
        lowercase:true
    }
},{timestamps:true})

export const Category = mongoose.model("Category",categorySchema)