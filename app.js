const Express=require('express')
const bodyParser=require('body-parser')
const Cors=require('cors')
const mongoose=require('mongoose')
const userModel = require('./userModel')
const postModel = require('./postModel')
const jwt=require('jsonwebtoken')

const app=Express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/blogDB?retryWrites=true&w=majority")

app.post("/userreg",async(request,response)=>{
    let data=request.body
    const bloguser=new userModel(data)
    let result=await bloguser.save()
    if (result.Name!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})



app.post("/login",async(request,response)=>{
    let data=request.body
    let getUsername=data.username
    let getPassword=data.password
    let result=await userModel.find({username:getUsername})
    if (result.length>0) {
        if (result[0].password==getPassword) {
            jwt.sign({username:getUsername,password:getPassword},"blogapp",{expiresIn:"1d"},
            (error,token)=>{
                if (error) {
                    response.json({"status":"Unauthorized User !!!"})
                } else {
                    response.json({"status":"success","data":result[0],"token":token})
                }

            })
        } else {
            response.json({"status":"Invalid Username or Password !!!"})
        }
    } else {
        response.json({"status":"User does not exist !!!"})
    }
})



app.post("/addp",async(request,response)=>{
    let data=request.body
    let token=request.body.token
    const post=new postModel(data)
    let result=await post.save()
    if (result.postTitle!="") {
        jwt.verify(token,"blogapp",(error,decoded)=>{
            if (error) {
                response.json({"status":"Unauthorized User !!!"})
            } else {
                response.json({"status":"success"})
            }
        })
    } else {
        response.json({"status":"error"})
    }
})



app.post("/viewmp",async(request,response)=>{
    let data=request.body.post_id
    let token=request.body.token
    let result=await postModel.find({"post_id":data})
    jwt.verify(token,"blogapp",(error,decoded)=>{
        if (decoded) {
            response.json(result)
        } else {
            response.json({"status":"Unauthorized User !!!"})
        }
    })
})



app.post("/viewap",async(request,response)=>{
    let token=request.body.token
    let result=await postModel.find()
    jwt.verify(token,"blogapp",(error,decoded)=>{
        if (error) {
            response.json({"status":"Unauthorized User !!!"})
        } else {
            response.json(result)
        }
    })
})














app.listen(3001,()=>{
    console.log("Server Running")
})