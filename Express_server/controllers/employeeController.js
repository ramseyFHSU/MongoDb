const data = {
  employees: require("../model/employees.json"),
  setEmployees: (data) => {
    this.employees = data;
  },
};

//Get all employees
const getEmployees = (req, res) => {
  res.json(data.employees);
};

//Create an Employee
const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees?.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({ message: "First and lst name are required" });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

//Update Employee
const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee Id ${req.body.id} is not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.firstname = req.body.lastname;
  const filterArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filterArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

//Delete Employee
const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee Id ${req.body.id} is not found ` });
  }
  const filterArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filterArray]);
  res.json(data.employees);
};

//Get Employee
const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee Id ${req.body.id} is not found ` });
  }
  res.json(data.employees);
};

module.exports = {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createNewEmployee,
  getEmployee,
};
