import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import login from "./model/login";
// import shop from "./model/shop";
import auth from "./model/loginpage";
import product from "./model/product";
import multer from "multer";


const app=express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://aditya:EJv64hd9Q0jM1v26@cluster0.977yyrj.mongodb.net/cluster0?retryWrites=true&w=majority')
.then(()=>app.listen(4500))
.then(()=>console.log("connected to database and listining to localhost 4500"))
.catch((err)=>console.log(err));
//login
app.post('/addlogin',(req,res,next)=>{
    console.log(req.body)
    const {Name,Email,PhoneNumber,Address,Problem,Model,Brand}=req.body.form
    const log=new login({
        Name,Email,PhoneNumber,Address,Problem ,Model,Brand
    })
    log.save()
    return res.send({"login":log})
})
//add to cart
// app.post('/addToCart',(req,res,next)=>{
//     console.log(req.body)
//     const {imageurl,name,stars,discount,originalPrice,discountedPrice}=req.body
//     const sho=new shop({
//         imageurl,name,stars,discount,originalPrice,discountedPrice 
//     })
//     sho.save()
//     .then(() => {
//         console.log('Item added to cart:', sho);
//         return res.status(200).json({ message: 'Item added to cart successfully', shop: sho });
//     })
//     .catch(error => {
//         console.error('Error adding item to cart:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     });
// })
app.delete('/deleteshopdata/:id',async(req,res,next)=>{
    let shopdata;
    const id=req.params.id
    try{
        shopdata=await shop.findByIdAndDelete({_id:id})
        if(!shopdata){
            return res.status(404).json({ message: "No shop data found." });
        }
        return res.status(200).json({ message: "Shop data deleted successfully", shopData: shopdata });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Internal Server Error' });
    
    }
})
app.get('/getshopdata',async(req,res,next)=>{
    let shopdata;
    try{
        shopdata=await shop.find();
    }catch(err){
        console.log(err);
    }
    if(!shopdata){
        return res.status(404).json({message:"no shopdata found."})

    }
    return res.status(200).json({shopdata})
    }
)
// Backend
app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await auth.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new auth({ username, password });
      await newUser.save();
  
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  });
  
  // loginpage
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await auth.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // You can generate a token and send it to the client for future authenticated requests
      // For simplicity, let's send a success message in this example.
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error: error.message });
    }
  });

  // app.post('/aditya', (req, res) => {
  //   console.log(req.body.formdata); // Change this line
  //   const { name, originalprice, discount, imageurl,stars,discountprice } = req.body.formdata;
  //   const stud = new product({
  //     name, originalprice, discount, imageurl,stars,discountprice
  //   });
  //   try {
  //     stud.save()
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return res.send({ msg: "inserted", result: stud });
  // });
  // app.delete('/deleteitem/:id', (req, res) => {
  //   const cartId = req.params.id;
  
  //   CartItem.findByIdAndRemove(cartId)
  //     .then(() => {
  //       res.send({ message: 'Cart Item Deleted Successfully' });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).json({ error: 'Error while deleting cart item' });
  //     });
  // });
  app.post('/aditya', (req, res) => {
    console.log('Request Body:', req.body); // Check if the data is received correctly
    const { name, originalprice, discount, imageurl, stars, discountprice } = req.body.formdata;
    const stud = new product({
        name, originalprice, discount, imageurl, stars, discountprice
    });
    try {
        stud.save();
        console.log('Data saved to database:', stud);
        return res.send({ msg: "inserted", result: stud });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Example endpoint to get all products
app.get('/getproducts', async (req, res) => {
  try {
      const products = await product.find(); // Assuming 'product' is your MongoDB model
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




