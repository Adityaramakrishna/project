import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  imageurl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('mobiles', mobileSchema);