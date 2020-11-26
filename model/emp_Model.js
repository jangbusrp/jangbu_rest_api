const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employee = new Schema({
    id: {type: String},
    emp_fname: {type: String},
       emp_lname: {type: String},
       emp_address: {type: String},
    emp_salary: {type: String},
    emp_age: {type: String},
    
});

module.exports = mongoose.model('Emp_Model', employee);