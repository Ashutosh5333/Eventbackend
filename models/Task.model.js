const mongoose = require("mongoose")


const taskSchema = mongoose.Schema({
        title : String,
        description:String,
        about:String,
        pic:String,
        userId:String
})

 const TaskModel = mongoose.model("task", taskSchema)

  module.exports={
     TaskModel
  }











