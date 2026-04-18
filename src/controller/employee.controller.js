const employeeService = require("../services/employee.service");
const {
  employeeSchema,
  updateEmployeeSchema,
} = require("../validations/employee.validation");
const logger = require("../logger/logger");

// CREATE
const createEmployee = async (req, res) => {
  try {
    const { error, value } = employeeSchema.validate(req.body);

    if (error) {
      logger.warn("Validation failed on createEmployee", {
        error: error.details[0].message,
      });
      return res.status(400).json({ error: error.details[0].message });
    }

    const employee = await employeeService.createEmployee(value);

    logger.info("Employee created", { id: employee.id });

    res.status(201).json(employee);
  } catch (err) {
    logger.error("Error creating employee", { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
const getEmployees = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const result = await employeeService.getAllEmployees({ page, limit });

    logger.info("Fetched employees with pagination", {
      page,
      limit,
      count: result.data.length,
    });

    res.status(200).json(result);
  } catch (err) {
    logger.error("Error fetching employees", { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
const getEmployeeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      logger.warn("Invalid employee ID", { id: req.params.id });
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      logger.warn("Employee not found", { id });
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json(employee);
  } catch (err) {
    logger.error("Error fetching employee", { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      logger.warn("Invalid employee ID for update", { id: req.params.id });
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const { error, value } = updateEmployeeSchema.validate(req.body);

    if (error) {
      logger.warn("Validation failed on updateEmployee", {
        error: error.details[0].message,
      });
      return res.status(400).json({ error: error.details[0].message });
    }

    const updated = await employeeService.updateEmployee(id, value);

    if (!updated) {
      logger.warn("Employee not found for update", { id });
      return res.status(404).json({ error: "Employee not found." });
    }

    logger.info("Employee updated", { id });

    res.status(200).json(updated);
  } catch (err) {
    logger.error("Error updating employee", { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      logger.warn("Invalid employee ID for delete", { id: req.params.id });
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const deleted = await employeeService.deleteEmployee(id);

    if (!deleted) {
      logger.warn("Employee not found for delete", { id });
      return res.status(404).json({ error: "Employee not found." });
    }

    logger.info("Employee deleted", { id });

    res.status(200).json({ message: "Employee deleted." });
  } catch (err) {
    logger.error("Error deleting employee", { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// SALARY
const getEmployeeSalary = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      logger.warn("Invalid employee ID for salary", { id: req.params.id });
      return res.status(400).json({ error: "Invalid employee id" });
    }

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      logger.warn("Employee not found for salary", { id });
      return res.status(404).json({ error: "Employee not found." });
    }

    const salary = employeeService.calculateSalary(employee);

    logger.info("Calculated salary", { id });

    res.status(200).json(salary);
  } catch (err) {
    logger.error("Error calculating salary", { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// METRICS BY COUNTRY
const getMetricsByCountry = async (req, res) => {
  try {
    const { country } = req.params;

    if (!country) {
      logger.warn("Country param missing");
      return res.status(400).json({ error: "Country is required" });
    }

    const metrics = await employeeService.getMetricsByCountry(country);

    logger.info("Fetched country metrics", { country });

    res.status(200).json(metrics);
  } catch (err) {
    logger.error("Error fetching country metrics", { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// METRICS BY JOB TITLE
const getMetricsByJobTitle = async (req, res) => {
  try {
    const { jobTitle } = req.params;

    if (!jobTitle) {
      logger.warn("Job title param missing");
      return res.status(400).json({ error: "Job title is required" });
    }

    const metrics = await employeeService.getMetricsByJobTitle(jobTitle);

    logger.info("Fetched job metrics", { jobTitle });

    res.status(200).json(metrics);
  } catch (err) {
    logger.error("Error fetching job metrics", { error: err.message });
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
