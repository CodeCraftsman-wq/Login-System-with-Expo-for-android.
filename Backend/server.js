const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const cors = require('cors');

require('dotenv') .config();

const User = require("./models/User");
const connectDB=require('./db');

// Define app
const app=express();
const PORT=3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname,"public")));


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) .then(() => console.log('MongoDB connected')) .catch((err) => console.log(err));



// Dummy user data
const user={
    username:"admin",
    password:"12345"
};

app.get("/", (req, res) => {
  res.json({message: "Server is running properly ✅" });
});


//Route Login POST
// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // ✅ Using User here
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({success: true,message: "✅ Login Successful"});
  } else {
    res.json({success: false,message: "❌ Invalid username or password!"});
  }
});


// Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password }); // 
  await newUser.save();
  res.json({success: true,message: "✅ User Registered Successfully"});
});


app.listen(PORT, () => console.log(`Server running on http://192.168.0.15:${PORT}`));


