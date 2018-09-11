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

router.get('/getAllPortifolio',(req,res)=>{debugger
    console.log("inside getAllPortifolio");
    portifolio.find({}, {"name":1})
        .then(portifolio=>res.json(portifolio))
});

router.get('/getOnlyPortifolio',(req,res)=>{debugger
    console.log("inside getOnlyPortifolio");
    console.log(req.query.name);
    portifolio.find({"name":req.query.name})
        .then(portifolio=>res.json(portifolio))
});

router.get('/getSkillgroups',(req,res)=>{debugger
    console.log("inside getSkillgroups");
    skillset.find({},{"name":1})
        .then(skillset=>res.json(skillset))
});

router.get('/getOneSkillGroup',(req,res)=>{debugger
    console.log("inside getOneSkillGroup");
    console.log(req.query.name);
    skillset.find({"name":req.query.name},{"Components.name":1})
        .then(skillset=>res.json(skillset))
});

router.get('/getOneComponentSkill',(req,res)=>{debugger
    console.log("inside getOneSkillGroup");
    // skillset.find({"Components.name":req.query.name,"Components.grpName":req.query.grpName},"Components.skillset"), 
    //     function(err, the_user){
    //         if(err)console.log(err)
    //         if(the_user){
    //             res.json(the_user)
    //         }
    //     };
    skillset.find( { "Components": { $elemMatch: { name: req.query.cName, grpName: req.query.grpName } } } )
    .then(skillset=>res.json(skillset))
    });

router.post('/addPortifolio',(req,res,next)=>{debugger
    console.log("inside addPortifolio");
    portifolio.create(req.body).then(function(portifolio){
        res.send("Successfully Saved Porifolio");
    }).catch(next);
});

router.post('/addSkillSet',(req,res,next)=>{debugger
    console.log("inside add addSkillSet");
    skillset.create(req.body).then(function(portifolio){
        res.send("Successfully Saved Skill Set");
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
