const mongoose=require('mongoose')
const postModel=mongoose.model("posts",mongoose.Schema(
    {
        post_id:String,
        postTitle:{type:String,required:true},
        postDesc:String,
        postImg:String
    }
))
module.exports=postModel