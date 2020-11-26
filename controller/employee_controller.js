const mongoose = require('mongoose');
const Employee = mongoose.model('Emp_Model');
const fetch = require('node-fetch');

exports.employee_api = async function(request, response){
    try{
        let api_res = await fetch("http://dummy.restapiexample.com/api/v1/employees");
        let employee_json = await api_res.json();
        return response.status(200).json(employee_json);
      
    }catch(e){
        console.log('Error is: ')
        console.log(e)
        return response.json({'error': 'Error'})
    }
}

exports.get = async function(request, response){
    const employees_list = await Employee.find({});
    return response.status(200).json(employees_list);
}

exports.create =  async function(request, response){
    let {id, emp_fname,emp_lname,emp_address, emp_salary, employee_age} = request.body
    let employee = new Employee();
    employee.id = id;
    employee.emp_fname = emp_fname;
       employee.emp_lname = emp_lname;
          employee.emp_address = emp_address;
    employee.emp_salary = emp_salary;
    employee.emp_age = emp_age;
    await employee.save();
    return response.status(201).json(employee);
}

exports.update = async function(request, response){

    let {id, emp_fname,emp_lname,emp_address, emp_salary, employee_age} = request.body
    let employee = await Employee.findById(request.params.id);
    if(!employee){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
        employee.id = id;
          employee.emp_fname = emp_fname;
          employee.emp_lname = emp_lname;
          employee.emp_address = emp_address;
          employee.emp_salary = emp_salary;
          employee.emp_age = emp_age;
        employee.save();
        return response.status(201).json(employee);
    }
}

exports.destroy = async function(request, response){
    let employee = await Employee.findById(request.params.id);
    if(!employee){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
        await employee.remove();
        return response.status(204).json(employee);
    }
}

exports.getById = async function(request, response){
    let employee = await Employee.findById(request.params.id);
    return response.status(200).json(employee);
}