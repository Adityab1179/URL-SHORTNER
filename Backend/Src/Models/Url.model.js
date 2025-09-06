const mongoose =require("mongoose")
const ShortUrlSchema=new mongoose.Schema({
    full_url:{
        type:String,
        required:true
    },   
    short_url:
    {
        type:String,
        required:true,
        unique:true
    },
    qrCode:
    {
        type:String,
        required:true,
        unique:true
    },
    clicks:
    {
        type:Number,
        required:true,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})
const ShortUrl=mongoose.model("ShortUrl",ShortUrlSchema)
module.exports=ShortUrl