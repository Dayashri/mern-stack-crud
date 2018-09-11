const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ComponentGrpSkills=new Schema({
        name:{
            type:String,
            required:true
        },
        grpName:{
            type:String,
            required:true
        },
        skillset:{
            type:[String],
            required:true
        }
});
    //Create Schema
const SkillSetSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    Components:{
        type:[ComponentGrpSkills],
        required:true
    }
});

const SkillSet = mongoose.model('skillset', SkillSetSchema);

module.exports = SkillSet;
