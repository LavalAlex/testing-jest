import app from "../src/app.js";
import request from "supertest";

describe("GET /tasks", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });
  test("should respond with an array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toEqual([]);
  });
});

describe("POST /tasks", () => {
  describe("given a title and content", () => {
    const newTask = {
      title: "New title",
      content: "New content",
    };
    it("should respond with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.statusCode).toBe(200);
    });

    it("should have a content-type: apllication/json in header", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    it("should respond a task ID", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("when title and content is missing",() => {
      it("should respond with a 400 status code", async ()=>{
          const res = await request(app).post('tasks').send({content: "New Content"})
          expect(res.statusCode).toBe(400)
      })
  
      it("should respond with a 400 status code", async ()=>{
        const res = await request(app).post('tasks').send({title:"New title"})
        expect(res.statusCode).toBe(400)
    })
    })
});
