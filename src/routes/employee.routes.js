const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employee.controller");

router.post("/", employeeController.create);
router.get("/", employeeController.getAll);

module.exports = router;
