import mongoose from "mongoose";

const adminSchema  = new mongoose.Schema({
    banner:{
        type:String,
    },avatar:{
        type:String
    }

},{
    timestamps:true
})

const Admin = mongoose.model('Admin',adminSchema)

export default Admin