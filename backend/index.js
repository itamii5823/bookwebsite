const express = require('express');
const cors = require('cors');
const User = require("./database/usermodule");
const prod =require("./database/products")
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = "dhsgsghdshggd"
const multer =require('multer');
const app= express();

const cart = require('./database/cart');



app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("upload"));




/*function isloggedin(req,res,next){
    if(!req.cookies.user){
        res.send("user doesnt exist");
        console.log("user doesnt exist");
    }
    
        else{
            let data = req.cookies.user;
            console.log(data);
            
        console.log("logedin user")
     next();}
       
}*/





app.get('/',(req,res)=>{
    res.send("hello")
});

app.post("/login",async(req,res)=>{
    const {username,password,email}=req.body;
    const user = await User.findOne({username});
    if(user){
        if(user.password==password){
         console.log("verified");
         const token = jwt.sign({"email":email,"password":password},secret)
         res.cookie("user",token);
         res.send("done")
        }
        else {
            res.send("pass doesnt exist");
        }
        
    }
    else {
        res.send("pass doest exist")
    }
    
});




app.post("/signup",async (req,res)=>{
    const {username,password,email}=req.body;
    const existinguser = await User.findOne({username});
    if(existinguser)return res.send("user already exist");
    const user = new User({username,password,email})
    await user.save();
    console.log(user);
    const token = jwt.sign({"email":email,"username":username,"password":password},secret,{expiresIn:'1d'})
    res.cookie("user",token)
     console.log("signup")
    res.send("received");
});

app.post("/isadmin",async(req,res)=>{
       const token = req.cookies.user;
       if(!token){
        return res.send("user doesnt exist")
         
       }
     try{const verify = jwt.verify(token,secret);
       const email = verify.email
       if(email=="ita@gmail.com"){
         console.log("email verified");
         if(verify.password="sahil"){
            console.log("pass matched");
           
         }}
         else{
            res.send("user doesnt exist")
         }
        }
       catch(err){
        console.log(err);
        res.send("user doesnt exist")
        
       }
       
       
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'upload/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });





app.post("/addprod",upload.single("image"),async(req,res)=>{
    const {name,price,quantity,color,items}=req.body;
    const rate = price
    const imageurl = "/uploads/"+req.file.filename;
    const product = new prod({name,rate,quantity,color,items,imageurl})
    await product.save()
    console.log(product);
    
    
})
app.get("/getdata",async(req,res)=>{
    const products = await prod.find();
    res.json(products)
    
})   


app.post("/addtocart",async(req,res)=>{
    const{prodid,quantity,num,product} = req.body

    const token = req.cookies.user;
    const tokens = jwt.verify(token,secret)
    const users = tokens.username
    const finduser = await User.findOne({"username":users})
    if(finduser){
         finduser.cart.push({product:prodid ,quantity:quantity})
         const cart = finduser.cart
        
         
        await finduser.save()}
})


app.post("/addtocartr",async(req,res)=>{
   const product =req.body
   console.log(product);
   const token = req.cookies.user;
    const tokens = jwt.verify(token,secret)
    const users = tokens.username
    const finduser = await User.findOne({"username":users})
    if(finduser){
         finduser.cart.pull({product:product.product})

        await finduser.save()}
   
})




app.post("/cart",async(req,res)=>{
   const token = req.cookies.user;
   const tokeninfo = jwt.verify(token,secret)
   const username = tokeninfo.username
   const myuser = await User.findOne({"username":username}).populate("cart.product")
  
   if(myuser){
    let total =0
        
      for (let index = 0; index < myuser.cart.length; index++) {
        
        const rate = Number(myuser.cart[index].product.rate)
        const quantity = myuser.cart[index].quantity
        total = total+rate*quantity
         
      }
    
console.log(total)
     res.json({
        "cart":myuser.cart,
        "userinfo":tokeninfo,
        "total":total,
        
     })
   }

})

app.post("/search",async(req,res)=>{
const {search}= req.body
const product = await prod.findOne({name:search})
res.send(product)
try {
    const {prod,quant}=req.body
    const token = req.cookies.user;
    const tokens = jwt.verify(token,secret)
    const users = tokens.username
    const finduser = await User.findOne({"username":users})
    if(finduser){
         finduser.cart.push({product:prod,quantity:quant})
        await finduser.save()}
} catch (error) {
}
})


const PORT = 5000;
app.listen(PORT,()=>{
    console.log("port",{PORT});
    
});



