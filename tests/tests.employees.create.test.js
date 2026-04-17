const request = require("supertest");
const app = require("../src/app");

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
});
