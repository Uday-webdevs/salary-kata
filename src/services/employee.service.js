const db = require("../db/database");

// CREATE
const createEmployee = ({ fullName, jobTitle, country, salary }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO employees (fullName, jobTitle, country, salary)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [fullName, jobTitle, country, salary], function (err) {
      if (err) return reject(err);

      resolve({
        id: this.lastID,
        fullName,
        jobTitle,
        country,
        salary,
      });
    });
  });
};

// GET ALL
const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// GET BY ID
const getEmployeeById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM employees WHERE id = ?", [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

// UPDATE
const updateEmployee = (id, data) => {
  const { fullName, jobTitle, country, salary } = data;

  return new Promise((resolve, reject) => {
    const query = `
      UPDATE employees 
      SET fullName = ?, jobTitle = ?, country = ?, salary = ?
      WHERE id = ?
    `;

    db.run(query, [fullName, jobTitle, country, salary, id], function (err) {
      if (err) return reject(err);

      if (this.changes === 0) return resolve(null);

      resolve({
        id,
        fullName,
        jobTitle,
        country,
        salary,
      });
    });
  });
};

// DELETE
const deleteEmployee = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM employees WHERE id = ?", [id], function (err) {
      if (err) return reject(err);

      if (this.changes === 0) return resolve(false);

      resolve(true);
    });
  });
};

// SALARY CALCULATION
const calculateSalary = (employee) => {
  const gross = employee.salary;
  let deductions = 0;

  if (employee.country === "India") deductions = gross * 0.1;
  else if (employee.country === "USA") deductions = gross * 0.12;

  return {
    gross,
    deductions,
    net: gross - deductions,
  };
};

// METRICS BY COUNTRY
const getMetricsByCountry = (country) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT MIN(salary) as min, MAX(salary) as max, AVG(salary) as avg
      FROM employees
      WHERE country = ?
    `;

    db.get(query, [country], (err, row) => {
      if (err) return reject(err);

      resolve({
        min: row.min || 0,
        max: row.max || 0,
        avg: row.avg ? Math.round(row.avg) : 0,
      });
    });
  });
};

// METRICS BY JOB TITLE
const getMetricsByJobTitle = (jobTitle) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT MIN(salary) as min, MAX(salary) as max, AVG(salary) as avg
      FROM employees
      WHERE jobTitle = ?
    `;

    db.get(query, [jobTitle], (err, row) => {
      if (err) return reject(err);

      resolve({
        min: row.min || 0,
        max: row.max || 0,
        avg: row.avg ? Math.round(row.avg) : 0,
      });
    });
  });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  calculateSalary,
  getMetricsByCountry,
  getMetricsByJobTitle,
};
