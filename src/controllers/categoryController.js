import { Category } from "../models/categorySchema.js"
import { Item } from "../models/itemSchema.js"
import slugify from "slugify"

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


// create category

export const CreateCategory = async(req,res)=>{
    try{
        // get info from front-end
        const {name, menuId} = req.body
        // validation
        if(!name || !menuId){
            res.status(400).json({
                success:false,
                message:"please provide category name and menu id"
            })
        }
        // check if the category already exist in the database
        const existingCategory = await Category.findOne({name})

        // if the category already existing send response
        if (existingCategory){
            return res.status(200).json({
                success:false,
                message:"category already exist"
            })
        }
        //  if category not exist in database create a new category 
        const category = await Category.create({
            name,
            slug:slugify(name)
        })
        res.status(201).json({
            success:true,
            message:"category created successfully",
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).json({   
            success:false,
            message:`Error in category ${error}`,
            error
        })

    }

}


//  update category

export const UpdateCategory=async(req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params
        const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).json({
            success:true,
            message:"successfully updated the category",
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).json({   
            success:false,
            message:`Error in category updation ${error}`,
            error
    })
}
}


// retrieve all category
export const GetCategory=async(req,res)=>{
    try{
        const category=await Category.find({})
        res.status(200).json({
            success:true,
            message:"All categories",
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).json({   
            success:false,
            message:`Error in category ${error}`,
            error
        })

    }
}

// single category
export const SingleCategory=async(req,res)=>{
    try{
        
        const category=await Category.findOne({slug:req.params.slug})
        res.status(200).json({
            success:true,
            message:"single category",
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).json({   
            success:false,
            message:`Error in category ${error}`,
            error
        })
    }

}


// delete category

export const deleteCategory=async(req,res)=>{
    try{
        const {id}=req.params
        const categorytodelete=await Category.findByIdAndDelete(id)
        if(!categorytodelete){
            return res.status(400).json({
                success:false,
                message:"categpory not found" 
            })

        }
        res.status(200).json({
            success:true,
            message:"categpory has been deleted successfully"
        })


    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`error in deletion category ${error}`,
            error

        })

    }
}