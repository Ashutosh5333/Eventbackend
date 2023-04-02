const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { blogUsermodel } = require("../models/blogUser.model")

const blogUserRouter = express.Router()




blogUserRouter.post("/signup", async(req,res) => {
 const {email,password,name}= req.body;
    const userPresent = await blogUsermodel.findOne({email})
      if(userPresent){
        res.send("user is already present")
        return 
      }
  try{
    bcrypt.hash(password, 4, async function(err, hash) {
        const user = new blogUsermodel({email,password:hash,name})
        await user.save()
        res.send("Signup successfully")
    })
  }
  catch(err){
    console.log(err)
    res.send("Something went wrong ply try again later")
  }
})


blogUserRouter.post("/login", async(req,res) =>{
 const {email,password,name,_id,pic} = req.body;
 try{
   
  const user = await blogUsermodel.find({email})
   
    if(user.length > 0){
       const hashed_password = user[0].password;
   
       bcrypt.compare(password,hashed_password,function(err, result){
           if(result){
               const token= jwt.sign({userId:user[0]._id}, "hush");
               res.send({"msg":"Login sucessfull", "token":token  })
           }
           else{
             res.send("Please check password")
           }

       }) }
       else{
         res.send("first registered")
       }
 }
 catch{
   res.send("authentication failed 3")
 }
})


module.exports={
    blogUserRouter
}