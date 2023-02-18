import app from "../app.js";
import request from "supertest";

describe('GET /api/monkey/definition', () => {
  // success
  test('/api/monkey/definition', async () => {
    const response = await request(app).get('/api/monkey/definition');
    expect(response.body.word).toEqual("monkey");
  })
  // fail
  test('fail /api/monkey/definition', async () => {
    const response = await request(app).get('/api/monkey/definition');
    expect(response.body.word).not.toEqual("gorilla");
  })
});