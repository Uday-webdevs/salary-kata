const employeeService = require("../services/employee.service");
const {
  employeeSchema,
  updateEmployeeSchema,
} = require("../validations/employee.validation");

// CREATE
const createEmployee = async (req, res) => {
  try {
    const { error, value } = employeeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const employee = await employeeService.createEmployee(value);

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
const getEmployeeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const { error, value } = updateEmployeeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updated = await employeeService.updateEmployee(id, value);

    if (!updated) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const deleted = await employeeService.deleteEmployee(id);

    if (!deleted) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({ message: "Employee deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SALARY
const getEmployeeSalary = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const salary = employeeService.calculateSalary(employee);

    res.status(200).json(salary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// METRICS BY COUNTRY
const getMetricsByCountry = async (req, res) => {
  try {
    const { country } = req.params;

    if (!country) {
      return res.status(400).json({ error: "Country is required" });
    }

    const metrics = await employeeService.getMetricsByCountry(country);

    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// METRICS BY JOB TITLE
const getMetricsByJobTitle = async (req, res) => {
  try {
    const { jobTitle } = req.params;

    if (!jobTitle) {
      return res.status(400).json({ error: "Job title is required" });
    }

    const metrics = await employeeService.getMetricsByJobTitle(jobTitle);

    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create: createEmployee,
  getAll: getEmployees,
  getById: getEmployeeById,
  update: updateEmployee,
  delete: deleteEmployee,
  getSalary: getEmployeeSalary,
  getMetricsByCountry,
  getMetricsByJobTitle,
};
