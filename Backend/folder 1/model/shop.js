import mongoose from "mongoose";
const Schema=mongoose.Schema
const shop =new Schema({
    imageurl:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    stars :{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    originalPrice:{
        type:String,
        required:true
    },
    discountedPrice:{
        type:String,
        required:true
    }
   
   
})
export default  mongoose.model('shop',shop)