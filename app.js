const assert = require('assert');
const express = require("express")
const bodyParser = require("body-parser")
const app = express();

app.set("view engine", 'ejs'); 
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

//mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/FDweb"); 
 

//creating a login schema

const loginSchema = new mongoose.Schema({
  username:String,
  password:String
});

const Login = mongoose.model("Login", loginSchema);

const login = new Login({
  username:  "Saxenakash53@gmail.com",
  password:777869
});
// login.save();


//creating a product scehema
const productSchema = new mongoose.Schema({
  _id:Number,
  name:String,
  stock:Number
})
const Product = mongoose.model("Product",productSchema);
// const product = new Product({
//   _id:5,
//   name:"sharpner",
//   stock:45
// });
//   const product = new Product({
//     _id:6,
//     name:"axe",
//     stock:45
// }); 

  const chart = new Product({
    _id:7,
    name:"chart paper",
    stock:30
  });

// chart.save();

//creating a customer schema 

const customerSchema = new mongoose.Schema({
  _id:Number,
  name:String,
  Cproduct: productSchema
})
const Customer = mongoose.model("Customer", customerSchema);
// const customer = new Customer({
//   _id:2,
//   name:"Akshat saxena",
//   age:21,
//   Cproduct: product
// });

const raj =new Customer({
  _id:4,
  name:"Nitant saxena ",
  age:20,
  Cproduct: chart
})
// raj.save()



// creating a registration schema
const registerSchema = new mongoose.Schema({
  username:String,
  Email: String,
  password: String  
});
const Register = mongoose.model("Register", registerSchema);

const register = new Register({
  username:"Abhishek",
  Email:"akshatsaxena102005@gmail.com",
  password:778546896
});
// register.save()


//update a document

const updateDocument = async (_id) =>{
  try{
    const result = await Login.updateOne({_id},{
      $set : {
        username:"om"
      }
    });
    console.log(result);
  }catch(err){
    console.log(err);
  }
}

updateDocument("64d27a44ec4f945e0516c2f3")

// const akash = new Login({
//   username:"akash", 
//   password:55226633
// });
// const samarth = new Login({
//   username:"samarth",
//   password:55226420
// });

// const Raj = new Login({
//   username:"Raj",
//   password:652126633
// });

// const names = [akash , samarth , Raj];

// Login.insertMany(names)
// .then(function(){
//   console.log("successful");
// })
// .catch(function(err){
//   console.log(err);
// });

// names.forEach(function(names){
//   console.log(names.username);
// });

// Login.find(function(err,Login){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(Login);
//   }
// });
  // let response =await collection.find({}).toArray();
  // console.log(response);
  
console.log("connection successful");

// getData();




 app.get("/", function(req , res){
   res.sendFile(__dirname + "/index.html"); 
 })
 app.post("/login" , async function(req , res){
   var email = req.body.mail;
   var passw = req.body.pass; 
   try {
    let data = await Register.findOne({ Email: email });

    if (data && data.password === passw) {
      res.sendFile(__dirname + '/menu/index.html');
    } else {
      console.log('Login failed');
      res.send('Login failed'); // You might want to send a response to the client
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

  app.post("/menu", function(req,res){
    res.redirect("/menu");
  })

 app.post("/register" , function(req , res){
  var username = req.body.username;
  var e_mail= req.body.email;
  var passcode = req.body.password; 
  const register = new Register({
    username: username,
    Email:e_mail,
    password:passcode
  });
  register.save();
  console.log(username , e_mail , passcode )
})

 app.listen(process.env.PORT || 3000, function(){
     console.log("server is running on port 3000")
 });





 //Api key
//  b79ad13483a552d22b2114da05f2e05a-us21