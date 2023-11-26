const Express=require('express')
const bodyParser=require('body-parser')
const Cors=require('cors')
const mongoose=require('mongoose')
const userModel = require('./userModel')

const app=Express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/blogDB?retryWrites=true&w=majority")

app.post("/userreg",async(request,response)=>{
    let data=request.body
    let bloguser=new userModel(data)
    let result=await bloguser.save()
    if (result.Name!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})









app.listen(3001,()=>{
    console.log("Server Running")
})