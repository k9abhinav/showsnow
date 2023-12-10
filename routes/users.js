require("dotenv").config();
const { response } = require("express");
const mongoose = require("mongoose");
const plm =require("passport-local-mongoose")

mongoose.connect("mongodb+srv://abhinava03kks:showsnow@clustershowsnow.0ijtawv.mongodb.net/?retryWrites=true&w=majority").then((response)=>{
  console.log("Connected to database")
})
.catch((error)=>{
  console.log(error);
  console.log("Not connected to the database");
})

const userSchema = mongoose.Schema({
  
  fullname:{
    type: String,

  },
  username:{
    type: String,
    required:true,
    unique:true,
  },
  password:{
    type: String,
   
     },
  secret:{
    type: String,
   
  },
  
},{timestamps:true})

userSchema.plugin(plm);

module.exports=mongoose.model("trial2",userSchema)

