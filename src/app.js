const express = require("express");
const app = express();

const employeeRouter = require("./routes/employee.routes");

app.use(express.json());
app.use("/employees", employeeRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
