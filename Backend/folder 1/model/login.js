import mongoose from "mongoose";
const Schema=mongoose.Schema
const login =new Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    PhoneNumber :{
        type:String,
        required:true
    },
   Address:{
        type:String,
        required:true
    },
    Problem:{
        type:String,
        required:true
    },
    Model:{
        type:String,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
   
})
export default  mongoose.model('login',login)