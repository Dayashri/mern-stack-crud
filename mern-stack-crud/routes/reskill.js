const express=require('express');
const router=express.Router();
const os=require("os");

//Skills Model
const employeeSkill=require('../models/EmployeeSkill');
const skillset=require('../models/Skillset');
const portifolio=require('../models/Portifolio');
const employeeDir=require('../models/EmployeeDir');

router.get('/getAll',(req,res)=>{
    console.log("inside get all skills");
    employeeSkill.find()
        .sort({employeeId:1})
        .then(employeeSkills=>res.json(employeeSkills))
});

router.get('/getAllPortifolio',(req,res)=>{
    console.log("inside getAllPortifolio");
    portifolio.find({}, {"name":1})
        .then(portifolio=>res.json(portifolio))
});

router.get('/getOnlyPortifolio',(req,res)=>{
    console.log("inside getOnlyPortifolio");
    portifolio.find({"name":req.query.name})
        .then(portifolio=>res.json(portifolio))
});

router.get('/getSkillgroups',(req,res)=>{
    console.log("inside getSkillgroups");
    skillset.find({},{"name":1})
        .then(skillset=>res.json(skillset))
});

router.get('/getOneSkillGroup',(req,res)=>{
    console.log("inside getOneSkillGroup");
    skillset.find({"name":req.query.name},{"Components.name":1})
        .then(skillset=>res.json(skillset))
});

router.get('/getOneComponentSkill',(req,res)=>{
    console.log("inside getOneSkillGroup");
    skillset.find( { "Components": { $elemMatch: { name: req.query.cName, grpName: req.query.grpName } } },{"Components":1} )
    .then(skillset=>res.json(skillset))
    });

router.post('/addPortifolio',(req,res,next)=>{
    console.log("inside addPortifolio");
    portifolio.create(req.body).then(function(portifolio){
        res.send("Successfully Saved Porifolio");
    }).catch(next);
});

router.post('/addSkillSet',(req,res,next)=>{
    console.log("inside add addSkillSet");
    skillset.create(req.body).then(function(portifolio){
        res.send("Successfully Saved Skill Set");
    }).catch(next);
});


router.post('/addSkill',(req,res,next)=>{
    console.log("inside add skills for an Employee");
    employeeSkill.create(req.body).then(function(emplSkill){
        res.send("Successfully Saved");
    }).catch(next);
});

router.get('/getUserName',(req,res)=>{
    console.log("inside getUserName");
    console.log(os.userInfo().username);
    employeeDir.find({"loginId":os.userInfo().username},{"employeeId":1,"loginId":1}).then(employee=>{
        if(employee.length===0){
            res.send({userFlag:0});
        }else{
            res.send({userFlag:1,employeeId:employee[0].employeeId,loginId:employee[0].loginId});
        }
    });
});
router.post('/addEmployee',(req,res,next)=>{
    console.log("inside addEmployee");
    employeeDir.create(req.body).then(function(employeedir){
        res.send("Successfully Saved");
    }).catch(next);
});

router.get('/checkSubmitStats',(req,res)=>{
    console.log("inside checkSubmitStats");
    employeeDir.find({"employeeId":req.query.empId},{"employeeId":1,"loginId":1}).then(employee=>{
        if(employee.length===0){
            res.send({submittedCount:0});
        }else{
            res.send({submittedCount:1});
        }
    });
});


 module.exports=router; 
