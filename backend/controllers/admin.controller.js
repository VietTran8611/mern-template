import Admin from '../models/admin.model.js'
import mongoose from 'mongoose'

export const getAdmin = async(req,res)=>{
    try{
        const ad = await Admin.find({})
        res.status(200).json({success: true, data: ad})
    }catch(err){
        console.log("Error in get admin:", err.message)
        res.status(500).json({success: false, message:"Server Error"})
    }
}

export const createAdmin = async (req,res)=>{
    const image = req.body

    const newImage = new Admin(image)

    try{
        await newImage.save()
        res.status(201).json({success: true, data: newImage})
    }catch(err){
        console.log("Error in create image:", err.message)
        res.status(500).json({success: false, message:"Server Error"})
    }
}

// export const deleteOrder = async(req,res)=>{
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//       return  res.status(404).json({success: false, message:"Invalid Id"})
//     }

//     try{
//         await Order.findByIdAndDelete(id)
//         res.status(200).json({success: true, message: "product deleted"})
//     }catch(err){
//         console.log("Error in delete product:", err.message)
//         res.status(500).json({success: false, message:"Server Error"})
//     }
// }
