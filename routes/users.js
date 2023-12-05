
const { response } = require("express");
const mongoose = require("mongoose");
const plm =require("passport-local-mongoose")

mongoose.connect("mongodb://localhost:27017/project").then((response)=>{
  console.log("Connected to database")
})
.catch((error)=>{
  console.log(error)
  console.log("Not connected to the database")
})

const userSchema = mongoose.Schema({
  username:String,
  password:String,
  secret:String
 
},{timestamps:true})

userSchema.plugin(plm);

module.exports=mongoose.model("showsnowusers",userSchema)

