const express = require("express")
const { TaskModel } = require("../models/Task.model")
const { authenticate } = require("../middleware/Authenticate")


 const taskRouter= express.Router()

  
 taskRouter.get("/allblog", async (req,res) =>{
  try{
   const Task =  await TaskModel.find().populate("postedby",["name","email","pic"])
     res.send(Task)
  }catch(err){
    console.log(err)
  }
})

//  ------------------- Single data  ------------------- // 

taskRouter.get("/allblog/:Id", async (req,res) =>{
    const  Id =  req.params.Id
  try{
   const Task =  await TaskModel.findOne({_id:Id}).populate("postedby",["name","email","pic"])
     res.send(Task)
  }catch(err){
    console.log(err)
  }
})


   taskRouter.get("/task", authenticate, async (req,res) =>{
        try{
         const Task = await TaskModel.find({userId:req.body.userId})
              .populate("postedby",["name","email","pic"])
           res.send(Task)
        }catch(err){
          console.log(err)
          res.send("error in get  data")
        }
   })


     taskRouter.post("/task/create", async (req,res) =>{
         const payload = req.body
         const userId=req.body.userId
               try{
                   const Task = new TaskModel({...payload,postedby:userId})
                       await Task.save()
                       res.send({"msg" :"data created sucessfully"})
               }catch(err){
                  console.log(err)
                  res.send({"err":"Something went wrong"})
               }
     })



     taskRouter.patch("/task/update/:dataId", authenticate, async(req,res) =>{
   const dataId = req.params.dataId
   const userId=req.body.userId
   const payload = req.body;
     try{
       const taskdata= await TaskModel.findOne({_id:dataId})  
         if(userId!==taskdata.userId){
           res.send("you are not authenticated")
         }else{
           await TaskModel.findByIdAndUpdate({_id:dataId},payload)
           res.send({"msg":"update data created sucessfully"})
         }
     }catch(err){
       console.log(err)
       res.send({"msg":"item updated successfully"})
     }

      
})
    
   
taskRouter.delete("/task/delete/:taskId", authenticate, async(req,res) =>{
   const taskId = req.params.taskId
   const userId=req.body.userId
     try{
       const taskdata= await TaskModel.findOne({_id:taskId})  
         if(userId!==taskdata.userId){
           res.send("you are not authnticated")
         }else{
           await TaskModel.findOneAndDelete({_id:taskId})
           res.send({"msg":"Delete data  sucessfully"})
         }
     }catch(err){
       console.log(err)
       res.send({"msg":"item delete successfully"})
     }

      
})



   module.exports={
    taskRouter
   }