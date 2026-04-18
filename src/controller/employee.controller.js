const db = require("../db/database");

const createEmployee = (req, res) => {
  const { fullName, jobTitle, country, salary } = req.body;

  if (!fullName || !jobTitle || !country || !salary) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
  INSERT INTO employees (fullName, jobTitle, country, salary)
  VALUES (?,?,?,?)`;

  db.run(query, [fullName, jobTitle, country, salary], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      fullName,
      jobTitle,
      country,
      salary,
    });
  });
};

const getEmployees = (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(rows);
  });
};

const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.get("SELECT * FROM employees WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json(row);
  });
};

const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const { fullName, jobTitle, country, salary } = req.body;

  if (!fullName || !jobTitle || !country || !salary) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const query = `UPDATE employees SET fullName = ?, jobTitle = ?, country = ?, salary = ? WHERE id = ?`;

  db.run(query, [fullName, jobTitle, country, salary, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({
      id,
      fullName,
      jobTitle,
      country,
      salary,
    });
  });
};

const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const query = `DELETE FROM employees WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({
      message: "Employee deleted.",
    });
  });
};

const getEmployeeSalary = (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.get("SELECT * FROM employees WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const gross = row.salary;
    let deductions = 0;

    if (row.country === "India") {
      deductions = gross * 0.1;
    } else if (row.country === "USA") {
      deductions = gross * 0.12;
    }

    const net = gross - deductions;

    res.status(200).json({
      gross,
      deductions,
      net,
    });
  });
};

const getMetricsByCountry = (req, res) => {
  const country = req.params.country;

  const query =
    "SELECT MIN(salary) as min, MAX(salary) as max, AVG(salary) as avg FROM employees WHERE country = ?";

  db.get(query, [country], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("DB ROW:", row);
    res.status(200).json({
      min: row.min || 0,
      max: row.max || 0,
      avg: row.avg ? Math.round(row.avg) : 0,
    });
  });
};

module.exports = {
  create: createEmployee,
  getAll: getEmployees,
  getById: getEmployeeById,
  update: updateEmployee,
  delete: deleteEmployee,
  getSalary: getEmployeeSalary,
  getMetricsByCountry,
};
