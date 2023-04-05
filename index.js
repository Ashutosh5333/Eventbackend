   
const express = require("express")
const cors = require("cors")
const { Connection } = require("./config/db")
const {  blogUserRouter } = require("./routes/user.routes")
const { taskRouter } = require("./routes/Task.routes")
const { authenticate } = require("./middleware/Authenticate")
const app = express()
app.use(express.json())


app.get("/" , (req,res) => {
  res.send("welcome home")
})


app.use(cors({
  origin:"*"
}))




 app.use(blogUserRouter)

 app.use(taskRouter)

      
    app.listen(8000, async(req,res) =>{
           try{
             await Connection;
              console.log("connected on database")
            }catch(err){
                console.log(err)
                console.log("something went wrong in connected")
            }
            console.log("listen on port 8000")
    })

