import User from "../models/userSchema.js";
import config from "../config/config.js";
import JWT from "jsonwebtoken"

export const cookieOptions = {
    expires : new Date(Date.now()+30*24*60*60*1000),
    httpOnly : true
}

// signup
export const signUp=async(req,res)=>{
    try{
        
        const {name,email,password,phone,address} = req.body

        
        if(!name || !email || !password || !address || !phone){
            res.status(400).json({
                success:false,
                message:"All the fields are required"
            })
        }


        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(200).json({
                success:false,
                message:"already signed up,please login"
            })
        }

    
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address
        })
        
    
        user.password = undefined

        
        res.status(201).json({
            success:true,
            message:"signed up successfully",
            user
        })

    }catch(error){
        console.log(error);
        res.status(500).json({    
            success:false,
            message:`Error in signing up ${error}`,
            error
        })
    }

    

}


// login
export const login =async(req,res)=>{
    try{
        // get info
        const {email,password} = req.body
        // validation
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "invalid email or password"
            })
        }
        // check user
        let user = await User.findOne({email}).select("+password")

        // if there is no users send response
        if(!user){
            res.status(404).json({
                success : false,
                message : "user not found , please signup"
            })
        }

        // if user found ,compare password
        const isPasswordMatched = await user.comparePassword(password)

        // if password doesn't match send response
        if(! isPasswordMatched){
            res.status(400).json({
                success : false,
                message : "Invalid password"
            })
        }

        // if password matched genarate token
        const token =JWT.sign({_id : user._id,role:user.role},
            config.JWT_SECRET,{expiresIn:config.JWT_EXPIRY}
        )

        // flushout password
        user.password = undefined

        // setup cookie
        // 1. I want to store a value in the cookie
        // 2. The value is going to bed token
        // 3. I want it as http only
        res.cookie("token",token,cookieOptions)

        // response success
        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address,
                role:user.role
            },
            token
        })


    }catch(error){
        console.log(error);
        res.status(500).json({   
            success:false,
            message:`Error in login ${error}`,
            error
        })
    }
    

}

// Logout

export const logout = (req,res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!"
    })
}

// Test controller

export const testController = (req,res)=>{
    res.send("protected route")
}