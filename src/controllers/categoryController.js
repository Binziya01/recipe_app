import { Category } from "../models/categorySchema.js"
import { Item } from "../models/itemSchema.js"

export const getCategory = async(req,res)=>{
    const {category} = req.params
    

    try{
        const categoryData = await Category.findOne({name: category})
        // console.log(categoryData);
        
        if(!categoryData){
            return res.status(404).json({message:"Category not found!"})
        }
        const items = await Item.find({menuId: categoryData.menuId})
        // console.log(items);
        
        res.status(200).json(items)

    }catch(error){
        res.status(500).json({message:"No category specified!"})
    
    }
}
