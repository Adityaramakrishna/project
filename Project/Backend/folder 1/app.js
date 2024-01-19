import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import login from "./model/login";
import shop from "./model/shop";
import auth from "./model/loginpage";
import product from "./model/product";
import mobiles from "./model/mobiles";

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
app.post('/addToCart',(req,res,next)=>{
    console.log(req.body)
    const {imageurl,name,discount,originalPrice,discountedPrice}=req.body
    const sho=new shop({
        imageurl,name,discount,originalPrice,discountedPrice 
    })
    sho.save()
    .then(() => {
        console.log('Item added to cart:', sho);
        return res.status(200).json({ message: 'Item added to cart successfully', shop: sho });
    })
    .catch(error => {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    });
})
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

// Backend
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

   
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

///////
  app.post('/aditya', async (req, res) => {
    console.log('Request Body:', req.body);
  
    const { imageurl, name, discount, originalPrice, discountedPrice } = req.body;
    const stud = new product({
      imageurl, name, discount, originalPrice, discountedPrice
    });
  
    try {
      await stud.save();
      console.log('Data saved to database:', stud);
      return res.json({ msg: 'inserted', result: stud });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/getspares',async(req,res,next)=>{
    let coursedata;
    try{
        coursedata=await product.find();
    }catch(err){
        console.log(err);
    } 
  
    if(!coursedata){
        return res.status(404).json({message:"No courses found"})
    }
    return res.status(200).json({coursedata})
});
///mobiles
app.post('/adi', async (req, res) => {
  console.log('Request Body:', req.body);

  const { imageurl, name, discount, originalPrice, discountedPrice } = req.body;
  const mobi = new mobiles({
    imageurl, name, discount, originalPrice, discountedPrice
  });

  try {
    await mobi.save();
    console.log('Data saved to database:', mobi);
    return res.json({ msg: 'inserted', result: mobi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/authdata',async(req,res,next)=>{
  let authdata;
  try{
      authdata=await mobiles.find();
  }catch(err){
      console.log(err);
  }

  if(!authdata){
      return res.status(404).json({message:"No courses found"})
  }
  return res.status(200).json({authdata})
});