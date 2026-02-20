const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const success = (res, data, msg="Success") =>
  res.status(200).json({ success:true, message:msg, data });

const fail = (res, code, msg) =>
  res.status(code).json({ success:false, message:msg });

exports.signup = async (req,res)=>{
  try{
    const {name,email,password}=req.body;

    if(!name||!email||!password)
      return fail(res,400,"All fields required");

    const exist=await User.findOne({email});
    if(exist)
      return fail(res,400,"User already exists");

    const hash=await bcrypt.hash(password,10);

    const user=await User.create({name,email,password:hash});

    success(res,{id:user._id},"Signup successful");
  }catch(err){
    console.error(err);
    fail(res,500,"Server error");
  }
};

exports.login = async (req,res)=>{
  try{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user) return fail(res,401,"Invalid credentials");

    const match=await bcrypt.compare(password,user.password);
    if(!match) return fail(res,401,"Invalid credentials");

    const token=jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    success(res,{token},"Login successful");
  }catch(err){
    console.error(err);
    fail(res,500,"Server error");
  }
};
