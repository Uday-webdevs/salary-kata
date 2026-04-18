const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employee.controller");

// ✅ SPECIFIC routes FIRST
router.get("/metrics/country/:country", employeeController.getMetricsByCountry);
router.get("/:id/salary", employeeController.getSalary);

// ✅ THEN GENERIC routes
router.post("/", employeeController.create);
router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.delete);

module.exports = router;
