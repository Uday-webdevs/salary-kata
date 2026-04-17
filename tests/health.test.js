const request = require("supertest");
const app = require("../src/app");

describe("GET /health", () => {
  it("Should return OK", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "OK" });
  });
});
