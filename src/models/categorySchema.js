import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: String,
    menuId: Number
})

export const Category = mongoose.model("Category",categorySchema)