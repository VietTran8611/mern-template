import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.token
    if(!token) return res.status(400).json({success:false,message: "No token provided"})
    try {
       const decoded = jwt.verify(token,process.env.JWT_SECRET)
       if(!decoded) return res.status(400).json({success:false,message: "Invalid token"})
       req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(500).json({success:false,message: error.message})
    }
}