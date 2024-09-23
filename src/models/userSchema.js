import mongoose from "mongoose"
import bcrypt, { compare } from "bcrypt"
import AuthRoles from "../utils/AuthRoles.js"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        maxLength:[20,"name should not exceed 20 chars"]
        
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,

    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"password should contain atleast 8 chars"],
        select:false
    },
    phone:{
        type:String,
        required:[true,"number is required"]
    },
    address:{
        type:String,
        required:[true,"address is required"],
        trim:true,
        maxLength:[18,"address should contain atleast 18 characters"]
    },
    role:{
        type:String,
        enum:Object.values.AuthRoles,
        default:AuthRoles.USER
    }
},
    {timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next()
    this.password = await bcrypt.hash(this.password,10)

})

userSchema.methods = {
    comparePassword : async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }
}
export default mongoose.model("User",userSchema)