import express from "express"
import { CreateCategory, deleteCategory, GetCategory, getCategory, SingleCategory, UpdateCategory } from "../controllers/categoryController.js"
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/categories/:category",getCategory)
// create category
router.post("/create-category",isLoggedIn,isAdmin,CreateCategory)
// update
router.put("/update-category/:id",UpdateCategory)
// retrieve all category
router.get("/get-category",GetCategory)
// single category
router.get("/single-category/:slug",SingleCategory)
// delete category
router.delete("/delete-category/:id",isLoggedIn,isAdmin,deleteCategory)

export default router