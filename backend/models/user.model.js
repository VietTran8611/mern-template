import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    lastLogin:{
        type:Date,
        default: Date.now
    },
    isverified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    shippingAddress:{
        country:{
            type:String,
            default:null
        },
        street1:{
            type:String,
            default:null
        },        
        street2:{
            type:String,
            default:null
        },
        city:{
            type:String,
            default:null
        },
        province:{
            type:String,
            default:null
        },
        zip:{
            type:String,
            default:null
        }
    },
    billingAddress:{
        country:{
            type:String,
            default:null
        },
        street1:{
            type:String,
            default:null
        },
        street2:{
            type:String,
            default:null
        },
        city:{
            type:String,
            default:null
        },
        province:{
            type:String,
            default:null
        },
        zip:{
            type:String,
            default:null
        }
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
},{timestamps: true})


const User = mongoose.model('User',userSchema)

export default User