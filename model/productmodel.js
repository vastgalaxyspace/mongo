const mongoose=require("mongoose");
const product=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
        },
    comments:[{
        user:String,
        text:String,
    }],
    views: {
        type: Number,
        default: 0, // Default to 0 if not specified
      },
      likes: {
        type: Number,
        default: 0, // Default to 0 if not specified
      },
},{timestamps:true});

module.exports=mongoose.model('Course',product);