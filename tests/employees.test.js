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

  describe("GET /employees/:id", () => {
    it("Should return an employee by id", async () => {
      const createdEmp = await request(app).post("/employees").send({
        fullName: "Udayaprakash",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 1000000,
      });

      const id = createdEmp.body.id;

      const res = await request(app).get(`/employees/${id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.fullName).toBe("Udayaprakash");
    });

    it("Should return 404 if employee not found", async () => {
      const res = await request(app).get("/employees/9999");

      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /employees/:id", () => {
    it("Should update an existing employee", async () => {
      const createdEmp = await request(app).post("/employees").send({
        fullName: "Udayaprakash",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 1000000,
      });

      const id = createdEmp.body.id;

      const res = await request(app).put(`/employees/${id}`).send({
        fullName: "R.V.Udayaprakash",
        jobTitle: "Senior Software Engineer",
        country: "India",
        salary: 2000000,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.fullName).toBe("R.V.Udayaprakash");
      expect(res.body.salary).toBe(2000000);
    });

    it("Should return 404 if employee doesn't exist.", async () => {
      const res = await request(app).put("/employees/9999").send({
        fullName: "Guest",
        jobTitle: "None",
        country: "India",
        salary: 1000,
      });

      expect(res.statusCode).toBe(404);
    });

    it("Should return 400 if required fields are missing.", async () => {
      const createdEmp = await request(app).post("/employees").send({
        fullName: "Udayaprakash",
        jobTitle: "Dev",
        country: "India",
        salary: 300000,
      });

      const id = createdEmp.body.id;

      const res = await request(app)
        .put(`/employees/${id}`)
        .send({ fullName: "Udayaprakash" });
 
      expect(res.statusCode).toBe(400);
    });
  });

  describe("DELETE /employees/:id", ()=>{
    it("Should delete an existing employee", async ()=>{
      const createdEmp = await request(app).post("/employees").send({
        fullName: "Udayaprakash",
        jobTitle: "Dev",
        country: "India",
        salary: 300000,
      })

      const id = createdEmp.body.id

      const res = await request(app).delete(`/employees/${id}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.message).toBe("Employee deleted.")
    })

    it("Should return 404 if the employee does not exist", async ()=>{
      const res = await request(app).delete("/employees/9999")

      expect(res.statusCode).toBe(404)
      // expect(res.body).toHaveProperty("error")
    })
  })
});
