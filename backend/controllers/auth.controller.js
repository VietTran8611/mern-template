import mongoose from 'mongoose'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateVerificationCode } from '../utils/generateVerificationCode.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js'

export const signup = async (req,res)=>{
    const {email,password,name} = req.body
    try {
        if(!email || !password || !name){
            throw new Error("All fields are required")
        }

        const userAlreadyExists = await User.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({success:false,message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const verificationToken = generateVerificationCode()

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000
        })

        await user.save()

        generateTokenAndSetCookie(res,user._id)

        await sendVerificationEmail(user.email,verificationToken)

        res.status(200).json({success:true,message: "Signup success",user:{
            ...user._doc,
            password: undefined
        }})

    } catch (error) {
        res.status(400).json({success:false,message: error.message})
    }
}

export const verifyEmail = async (req,res)=>{
    const {code} = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({success:false,message: "Invalid or expire verification code"})
        }

        user.isverified = true
        user.verificationToken= undefined
        user.verificationTokenExpiresAt=undefined
        await user.save()
        await sendWelcomeEmail(user.email,user.name)

        res.status(200).json({success:true,message: "Signup success",user:{
            ...user._doc,
            password: undefined
        }})
    } catch (error) {
        res.status(500).json({success:false,message: error.message})
    }
}

export const autoVerifyEmail = async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({success: false, message:"Invalid Id"})
      }
  
      try{
         const updaetdUser= await User.findByIdAndUpdate(id,{isverified: true},{new:true})
         res.status(200).json({success:true,data: updaetdUser})
      }catch(err){
          res.status(500).json({success: false, message:"Server Error"})
      }
}

export const logout = async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true,message: "Logout success"})
}

export const login = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({success:false,message: "Invalid credential"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(400).json({success:false,message: "Invalid credential"})
        }
        generateTokenAndSetCookie(res,user._id)
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({success:true,message: "login success",user:{
            ...user._doc,
            password: undefined
        }})
    } catch (error) {
        res.status(500).json({success:false,message: error.message})
    }
}

export const checkAuth = async (req,res)=>{
    try {
        const user = await User.findById(req.userId)
        if(!user){
            res.status(400).json({success:false,message: "User not found"})
        }
        res.status(200).json({success:true,message: "login success",user:{
            ...user._doc,
            password: undefined,
        }})
    } catch (error) {
        res.status(500).json({success:false,message: error.message}) 
    }
}

export const updateUser = async(req,res)=>{
    const {id}= req.params
    const user = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
      return  res.status(404).json({success: false, message:"Invalid Id"})
    }

    try{
       const updaetdUser= await User.findByIdAndUpdate(id,user,{new:true})
       res.status(200).json({success:true,data: updaetdUser})
    }catch(err){
        res.status(500).json({success: false, message:"Server Error"})
    }
}