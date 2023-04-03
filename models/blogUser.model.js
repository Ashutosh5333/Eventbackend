const mongoose = require("mongoose")


const bloguserSchema = mongoose.Schema({
        name : { type: String, required: true },
        email: { type: String, required: true, min: 4, unique: true },
        password: { type: String, required: true },
        pic:String,
        role:{type:String,default:"user"},
      
})

 const blogUsermodel = mongoose.model("user", bloguserSchema)


  module.exports={
    blogUsermodel
  }











