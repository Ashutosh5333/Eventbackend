const mongoose = require("mongoose")


const taskSchema = mongoose.Schema({
        title : String,
        description:String,
        about:String,
        pic:String,
        userId:String,
        postedby:{type:mongoose.Types.ObjectId,ref:"bloguser",required:true}
})

 const TaskModel = mongoose.model("task", taskSchema)

  module.exports={
     TaskModel
  }











