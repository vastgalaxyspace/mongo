const express=require('express');
const router=express.Router();
const Course=require('../model/productmodel');

router.post('/insert',async(req,res)=>{
    const {name,price}=req.body;
    if(!name || !price){
        return res.status(400).send('name and price is require');
    }
    const course=new Course({
        name,price });

        try{
            const result=await course.save();
            res.status(201).send(result);
        }catch(e){
            console.log(e);
        }


});

router.get('/find',async(req,res)=>{
    try{
    const courses=await Course.find();
    res.send(courses);  }
    catch(err){
        res.status(500).send('error finding courses :'+err);
    }
});
router.get('/findbyname',async(req,res)=>{

    const {name}=req.query;
    if(!name){
        return res.status(400).send('name is required');
    }
    try{

        const courses=await Course.find({name:name});
        if(courses.length==0){
            return res.status(404).send('no course found for this name');
        }
        res.send(courses);

    }catch(err){
        return res.status(500).send('error finding courses :'+err);

    }
});

router.get('/findcommentbyuser',async(req,res)=>{
    const {user}=req.query;
    if(!user){
        return res.status(404).send('User is required');
    }
    try{
        const courses=await Course.find({
            comments:{
                $elemMatch:{user:user},
            },
        });

        if(courses.length==0){
            return res.status(404).send('No courses found with the given comment user');
        }
        res.send(courses);



    }catch(err){
        res.status(500).send('Error finding courses: ' + err);

    }
});

router.put('/updateone/:id',async(req,res)=>{
    const {id}=req.params;
    const {name,price}=req.body;

    if(!name && !price ){
        return res.status(400).send("name or price is requrie");
    }
    const userscheama={};
    if(name) userscheama.name=name;
    if(price) userscheama.price=price;

    try{
        const result=await Course.updateOne({_id:id},{$set:userscheama});

        if(result.nModified===0){
            return res.status(400).send("No course found");
        }
        res.send("course updated sucessfully");

    }catch(err){
        res.status(404).send(err);
    }

});
router.put('/incrementViews/:id', async (req, res) => {
    const { id } = req.params;
    const { incrementBy } = req.body;
  
    if (incrementBy === undefined) {
      return res.status(400).send('Increment value is required');
    }
  
    try {
      const result = await Course.updateOne({ _id: id }, { $inc: { views: incrementBy } });
      if (result.nModified === 0) {
        return res.status(404).send('No course found to update views');
      }
      res.send(`Views incremented by ${incrementBy}`);
    } catch (error) {
      res.status(500).send('Error incrementing views: ' + error.message);
    }
  });
  router.put('/updateComment/:courseId/:commentId', async (req, res) => {
    const { courseId, commentId } = req.params;
    const { user, text } = req.body;
  
    try {
      const course = await Course.findOneAndUpdate(
        { 
          _id: courseId, 
          'comments._id': commentId 
        },
        { 
          $set: {
            'comments.$.user': user,
            'comments.$.text': text
          }
        },
        { new: true }
      );
  
      if (!course) {
        return res.status(404).send('Course or comment not found');
      }
  
      res.send(course);
    } catch (error) {
      res.status(500).send('Error updating comment: ' + error.message);
    }
  });
  router.delete('/deleteByName', async (req, res) => {
    const { name } = req.body;
  
    try {
      const result = await Course.deleteMany({ name: name });
  
      if (result.deletedCount === 0) {
        return res.status(404).send('No course found with that name');
      }
  
      res.send(`Deleted ${result.deletedCount} course(s)`);
    } catch (error) {
      res.status(500).send('Error deleting course: ' + error.message);
    }
  });
// Using findOneAndDelete
router.delete('/deleteOneByName', async (req, res) => {
    const { name } = req.body;
  
    try {
      const course = await Course.findOneAndDelete({ name: name });
  
      if (!course) {
        return res.status(404).send('Course not found');
      }
  
      res.send(`Deleted course: ${course.name}`);
    } catch (error) {
      res.status(500).send('Error deleting course: ' + error.message);
    }
  });
    
  





module.exports=router;