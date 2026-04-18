const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employee.controller");

router.post("/", employeeController.create);
router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.delete);
router.get("/:id/salary", employeeController.getSalary);

module.exports = router;
