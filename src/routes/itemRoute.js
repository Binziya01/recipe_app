import express from "express"
import { getAllItems, getSingleItem } from "../controllers/itemController.js"
import { getSearchedItems } from "../controllers/itemController.js"

const router = express.Router()

router.get("/all-items", getAllItems)
router.get("/items", getSearchedItems)
router.get("/items/:id", getSingleItem)

export default router