const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const EmployeeSkillSchema=new Schema({
    employeeEmail:{
        type:String,
        required:[true, 'Employee Email field is required']
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
    Portifolio: {
        type: String,
        required: [true, 'Portifolio is required']
    },
    DM: {
        type: String,
        required: [true, 'DM is required']
    },
    LOB: {
        type: String,
        required: [true, 'LOB is required']
    },
    Group: {
        type: String,
        required: [true, 'Group1 is required']
    },
    Component: {
        type: String,
        required: [true, 'Component is required']
    },
    SkillChosen: {
        type: String,
        required: [true, 'Skill is required']
    },
    Certified: {
        type: String,
        required: [true, 'Certified is required']
    },
    certificationType: {
        type: String
    },
    certifyBfTime: {
        type: String
    },
    certificationDate:{
        type: Date
    }
});

const EmployeeSkill = mongoose.model('employeeskill', EmployeeSkillSchema);

module.exports = EmployeeSkill;