const express = require("express")
const { TaskModel } = require("../models/Task.model")


 const taskRouter= express.Router()


   taskRouter.get("/task", async (req,res) =>{
        try{
         const Task = await TaskModel.find({userId:req.body.userId})
           res.send(Task)
        }catch(err){
          console.log(err)
          res.send("error in get  data")
        }
   })


     taskRouter.post("/task/create", async (req,res) =>{
         const payload = req.body
               try{
                   const Task = new TaskModel(payload)
                       await Task.save()
                       res.send("task added succesfully")
               }catch(err){
                  console.log(err)
                  res.send({"err":"Something went wrong"})
               }
     })


   
     taskRouter.patch("/update/:dataId", async(req,res) =>{
   const dataId = req.params.dataId
   const userId=req.body.userId
   const payload = req.body;
     try{
       const taskdata= await TaskModel.findOne({_id:dataId})  
         if(userId!==taskdata.userId){
           res.send("you are not authnticated")
         }else{
           await TaskModel.findByIdAndUpdate({_id:dataId},payload)
           res.send({"msg":"update data created sucessfully"})
         }
     }catch(err){
       console.log(err)
       res.send({"msg":"item updated successfully"})
     }

      
})
    
   
taskRouter.delete("/dlete/:taskId", async(req,res) =>{
   const taskId = req.params.taskId
   const userId=req.body.userId
     try{
       const taskdata= await TaskModel.findOne({_id:taskId})  
         if(userId!==taskdata.userId){
           res.send("you are not authnticated")
         }else{
           await TaskModel.findByIdAndDelete({_id:taskId})
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