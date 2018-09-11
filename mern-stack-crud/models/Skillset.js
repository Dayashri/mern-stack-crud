const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const SkillSetSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    DM: {
        type: [String],
        required:true
    },
    LOB: {
        type: [String],
        required:true
    }
});

const SkillSet = mongoose.model('skillset', SkillSetSchema);

module.exports = SkillSet;