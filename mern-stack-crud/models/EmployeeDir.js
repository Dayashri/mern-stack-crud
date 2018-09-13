const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const EmployeeDirSchema=new Schema({
    loginId:{
        type:String,
        required:true
    },
    employeeId: {
        type: Number,
        required: true
    }
});

const EmployeeDir = mongoose.model('employeedir', EmployeeDirSchema);

module.exports = EmployeeDir;