const mongoose = require("mongoose")


const taskSchema = mongoose.Schema({
        title : String,
        description:String,
        about:String,
        pic:String,
        userId:String,
        postedby:{type:mongoose.Types.ObjectId,ref:"user",required:true}
})

 const TaskModel = mongoose.model("task", taskSchema)

  module.exports={
     TaskModel
  }











