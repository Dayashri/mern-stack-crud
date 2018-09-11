const express=require('express');
const router=express.Router();

//Skills Model
const employeeSkill=require('../models/EmployeeSkill');
const skillset=require('../models/Skillset');
const portifolio=require('../models/Portifolio');

router.get('/getAll',(req,res)=>{
    console.log("inside get all skills");
    employeeSkill.find()
        .sort({employeeId:1})
        .then(employeeSkills=>res.json(employeeSkills))
});

router.get('/getOnlyPortifolio/:id',(req,res)=>{debugger
    console.log("inside getOnlyPortifolio");
    portifolio.find({"name":req.params.id}, 'name')
        .then(portifolio=>res.json(portifolio))
});

router.post('/addPortifolio',(req,res,next)=>{debugger
    console.log("inside addPortifolio");
    portifolio.create(req.body).then(function(portifolio){
        res.send("Successfully Saved");
    }).catch(next);
});

router.get('/getAll',(req,res)=>{
    console.log("inside get all skills");
    employeeSkill.find()
        .sort({employeeId:1})
        .then(employeeSkills=>res.json(employeeSkills))
});

router.post('/addSkill',(req,res,next)=>{
    console.log("inside add skills for an Employee");
    employeeSkill.create(req.body).then(function(emplSkill){
        res.send("Successfully Saved");
    }).catch(next);
});

 module.exports=router; 