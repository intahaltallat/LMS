var express=require("express");
var router= express.Router();
var Student = require('../models/student');


//GET Routes
router.get('/',function(req,res,next){
    res.send("Student Dashboard");
});

//Get student enrolled in particular course
router.post('/getStudentEnrolled', function(req, res, next){

});




module.exports=router;