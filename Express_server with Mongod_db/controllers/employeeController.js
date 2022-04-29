// const data = {
//   employees: require("../model/employees.json"),
//   setEmployees: (data) => {
//     this.employees = data;
//   },
// };

const Employee = require("../model/Employee");

//Get all employees
const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(400).json({ message: "No employee found." });
  res.json(employees);
};

//Create an Employee
const createNewEmployee = async (req, res) => {
  if (!req?.body.firstname || !req?.body.lastname) {
    return res.status(400).json({ message: "First and lst name are required" });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

//Update Employee
const updateEmployee = async (req, res) => {
  if (!req?.body.id) {
    return res.status(400).json({ message: "Id parameter is required. " });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches Id ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  const result = await employee.save();
  res.json(result);
};

//Delete Employee
const deleteEmployee = async (req, res) => {
  if (!req?.body.id) {
    return res.status(400).json({ message: "Employee Id is required. " });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches Id ${req.body.id}` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

//Get Employee
const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Employee Id is required. " });
  }

  const employee = await Employee.findOne({ _id: req.params.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches Id ${req.params.id}` });
  }
  res.json(employee);
};

module.exports = {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createNewEmployee,
  getEmployee,
};
