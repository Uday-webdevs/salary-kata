const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employee.controller");

router.post("/", employeeController.create);
router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.put("/:id", employeeController.update);

module.exports = router;
