const request = require("supertest");
const app = require("../src/app");

describe("Employee API", () => {
  describe("POST /employees", () => {
    it("Should create an employee with valid data", async () => {
      const employee = {
        fullName: "Udayaprakash",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 1000000,
      };

      const res = await request(app).post("/employees").send(employee);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(employee);
      expect(res.body).toHaveProperty("id");
    });

    it("Should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/employees")
        .send({ fullName: "Udayaprakash" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /employees", () => {
    it("Should return all employees", async () => {
      await request(app).post("/employees").send({
        fullName: "Udayaprakash",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 1000000,
      });

      const res = await request(app).get("/employees");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
