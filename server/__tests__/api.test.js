import app from "../app.js";
import request from "supertest";

// tests for definition get api
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

// tests for dictionary get api
describe('GET /api/dictionary', () => {
  // success
  test('/api/dictionary', async () => {
    const response = await request(app).get('/api/dictionary');
    // this is using mock data and is subject to change
    expect(response.body[2].word).toEqual("stick"); 
  })
  // fail
  test('fail /api/dictionary', async () => {
    const response = await request(app).get('/api/dictionary');
    expect(response.body[0].word).not.toEqual("gorilla");
  })
});