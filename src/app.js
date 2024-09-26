import express from "express"
import crypto from "crypto"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import itemRoute from "./routes/itemRoute.js"
import categoryRoute from "./routes/categoryRoute.js"



const app = express()
// middlewares
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()) 

// routes
app.use("/api/v1/auth",authRoutes)  
app.use("/api/v1/auth",itemRoute)
app.use("/api/v1/category",categoryRoute)

app.get("/",(req,res)=>{
    res.send("<h1>THE SPECKLED PALET</h1>")
})

// const key = crypto.randomBytes(64).toString("hex")
// console.log(key);

export default app