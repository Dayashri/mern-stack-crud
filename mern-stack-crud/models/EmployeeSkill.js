const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const EmployeeSkillSchema=new Schema({
    fName:{
        type:String,
        required:true
    },
    lName: {
        type: String,
        required: [true, 'Last Name field is required']
    },
    employeeId: {
        type: Number,
        validate: {
            validator: function(v) {
                return /^[0-9]{1,6}$/.test(v);
            },
            message: '{VALUE} is not Valid!'
        },
        required: [true, 'Employee Id field is required']
    },
    skill1: {
        type: [String],
        required: [true, 'Skill from Set 1 is required']
    },
    skill2: {
        type: [String],
        required: [true, 'Skill from Set 2 is required']
    }
});

const EmployeeSkill = mongoose.model('employeeskill', EmployeeSkillSchema);

module.exports = EmployeeSkill;