let employees = [];
let idCounter = 1;

const createEmployee = (req, res) => {
  const { fullName, jobTitle, country, salary } = req.body;
  const newEmployee = {
    id: idCounter++,
    fullName,
    jobTitle,
    country,
    salary,
  };

  employees.push(newEmployee);

  res.status(201).json(newEmployee);
};

module.exports = {
  create: createEmployee,
};
