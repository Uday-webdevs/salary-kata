const Joi = require("joi");

// Common reusable schema
const employeeSchema = Joi.object({
  fullName: Joi.string().trim().min(2).required(),
  jobTitle: Joi.string().trim().min(2).required(),
  country: Joi.string().trim().min(2).required(),
  salary: Joi.number().positive().required(),
});

// For update (same rules)
const updateEmployeeSchema = employeeSchema;

module.exports = {
  employeeSchema,
  updateEmployeeSchema,
};
