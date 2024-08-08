require('dotenv').config();
const express=require('express');
const app=express();
const connect=require("./connect/config");
const course=require('./controller/course');
const bodyParser=require('body-parser');
const port=3000;

connect();
app.use(bodyParser.json()); 

app.get('/',(req,res)=>{
    return res.send("hello");

})
app.use('/courses',course);

app.listen(port,()=>{
    try{
        console.log(`port running on ${port}`);

    }catch(e){
        console.log(e);

    }
})
