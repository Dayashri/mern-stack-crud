const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const PortifolioSchema=new Schema({
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

const Portifolio = mongoose.model('portifolio', PortifolioSchema);

module.exports = Portifolio;