const mogoose=require("mongoose");
const color=require("colors");
const connectDB=async()=>{
    try{
        const conn=await mogoose.connect('mongodb://localhost:27017/product');
        console.log(`mongodb connected ${conn.connection.host}`.cyan.underline.bold);

    }catch(e){
        console.log(e);
    }
}

module.exports=connectDB;