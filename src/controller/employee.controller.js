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
