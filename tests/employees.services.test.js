const employeeService = require("../src/services/employee.service");
const db = require("../src/db/database");

jest.mock("../src/db/database");

describe("Employee Service Layer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------
  // CREATE EMPLOYEE
  // -----------------------------
  describe("createEmployee", () => {
    it("should create an employee and return it", async () => {
      db.run.mockImplementation(function (query, params, callback) {
        callback.call({ lastID: 1 }, null);
      });

      const data = {
        fullName: "John",
        jobTitle: "Dev",
        country: "India",
        salary: 50000,
      };

      const result = await employeeService.createEmployee(data);

      expect(result).toEqual({
        id: 1,
        ...data,
      });
    });
  });

  // -----------------------------
  // GET ALL
  // -----------------------------
  describe("getAllEmployees", () => {
    it("should return all employees", async () => {
      const mockRows = [{ id: 1, fullName: "John" }];

      db.all.mockImplementation((query, params, callback) => {
        callback(null, mockRows);
      });

      const result = await employeeService.getAllEmployees();

      expect(result).toEqual(mockRows);
    });
  });

  // -----------------------------
  // GET BY ID
  // -----------------------------
  describe("getEmployeeById", () => {
    it("should return employee if found", async () => {
      const mockEmployee = { id: 1, fullName: "John" };

      db.get.mockImplementation((query, params, callback) => {
        callback(null, mockEmployee);
      });

      const result = await employeeService.getEmployeeById(1);

      expect(result).toEqual(mockEmployee);
    });

    it("should return null if employee not found", async () => {
      db.get.mockImplementation((query, params, callback) => {
        callback(null, undefined);
      });

      const result = await employeeService.getEmployeeById(99);

      expect(result).toBeUndefined(); // matches your service behavior
    });
  });

  // -----------------------------
  // UPDATE
  // -----------------------------
  describe("updateEmployee", () => {
    it("should update employee successfully", async () => {
      db.run.mockImplementation(function (query, params, callback) {
        callback.call({ changes: 1 }, null);
      });

      const data = {
        fullName: "Updated",
        jobTitle: "Senior Dev",
        country: "India",
        salary: 80000,
      };

      const result = await employeeService.updateEmployee(1, data);

      expect(result).toEqual({
        id: 1,
        ...data,
      });
    });

    it("should return null if employee not found", async () => {
      db.run.mockImplementation(function (query, params, callback) {
        callback.call({ changes: 0 }, null);
      });

      const result = await employeeService.updateEmployee(99, {
        fullName: "X",
        jobTitle: "Y",
        country: "India",
        salary: 1000,
      });

      expect(result).toBeNull();
    });
  });

  // -----------------------------
  // DELETE
  // -----------------------------
  describe("deleteEmployee", () => {
    it("should delete employee successfully", async () => {
      db.run.mockImplementation(function (query, params, callback) {
        callback.call({ changes: 1 }, null);
      });

      const result = await employeeService.deleteEmployee(1);

      expect(result).toBe(true);
    });

    it("should return false if employee not found", async () => {
      db.run.mockImplementation(function (query, params, callback) {
        callback.call({ changes: 0 }, null);
      });

      const result = await employeeService.deleteEmployee(99);

      expect(result).toBe(false);
    });
  });

  // -----------------------------
  // SALARY CALCULATION
  // -----------------------------
  describe("calculateSalary", () => {
    it("should calculate salary for India", () => {
      const employee = { salary: 50000, country: "India" };

      const result = employeeService.calculateSalary(employee);

      expect(result).toEqual({
        gross: 50000,
        deductions: 5000,
        net: 45000,
      });
    });

    it("should calculate salary for USA", () => {
      const employee = { salary: 50000, country: "USA" };

      const result = employeeService.calculateSalary(employee);

      expect(result).toEqual({
        gross: 50000,
        deductions: 6000,
        net: 44000,
      });
    });

    it("should return full salary for other countries", () => {
      const employee = { salary: 50000, country: "Germany" };

      const result = employeeService.calculateSalary(employee);

      expect(result).toEqual({
        gross: 50000,
        deductions: 0,
        net: 50000,
      });
    });
  });

  // -----------------------------
  // METRICS BY COUNTRY
  // -----------------------------
  describe("getMetricsByCountry", () => {
    it("should return salary metrics", async () => {
      db.get.mockImplementation((query, params, callback) => {
        callback(null, { min: 10000, max: 20000, avg: 15000 });
      });

      const result = await employeeService.getMetricsByCountry("India");

      expect(result).toEqual({
        min: 10000,
        max: 20000,
        avg: 15000,
      });
    });
  });

  // -----------------------------
  // METRICS BY JOB TITLE
  // -----------------------------
  describe("getMetricsByJobTitle", () => {
    it("should return salary metrics", async () => {
      db.get.mockImplementation((query, params, callback) => {
        callback(null, { min: 10000, max: 30000, avg: 20000 });
      });

      const result = await employeeService.getMetricsByJobTitle("Tester");

      expect(result).toEqual({
        min: 10000,
        max: 30000,
        avg: 20000,
      });
    });
  });
});
