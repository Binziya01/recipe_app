import { Item } from "../models/itemSchema.js";


  export const getAllItems = async (req, res) => {
      
      const result = await Item.find().sort({createAt: -1})
      res.status(200).json(result)
    }

  export const getSearchedItems = async(req,res)=>{
    const { q } =req.query
    try{
        let items;
        if(q){
            items = await Item.find({ name: { $regex: q, options: 'i' }})
        }
        res.status(200).json(items)

    }catch(error){
        res.status(500).json({message: "No items found!"})

    }
  }

  export const getSingleItem = async(req,res) => {
    const {id} =req.params

    try{
      const item = await Item.findById(id)
      res.json(item)

    }catch(err){
      res.status(500).json({message: "No items found!"})
    }
  }
  
  