import mongoose from "mongoose";
const Schema=mongoose.Schema
const product =new Schema({
    name:{
        type:String,
        required:true
    },    
   
    discountprice :{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    stars:{
        type:String,
        required:true
    },
   originalprice:{
        type:String,
        required:true
    },
   discount:{
        type:String,
        required:true
    },

   
})
export default  mongoose.model('products',product)