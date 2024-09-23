import express from "express"
import { getCategory } from "../controllers/categoryController.js"

const router = express.Router()

router.get("/categories/:category",getCategory)

export default router