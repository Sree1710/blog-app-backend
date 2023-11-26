const mongoose=require('mongoose')
const postModel=mongoose.model("posts",mongoose.Schema(
    {
        postTitle:{type:String,required:true},
        postDesc:String,
        postImg:String
    }
))
module.exports=postModel