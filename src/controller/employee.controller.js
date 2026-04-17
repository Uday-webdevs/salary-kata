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
  const { id } = req.params;

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

module.exports = {
  create: createEmployee,
  getAll: getEmployees,
  getById: getEmployeeById,
};
