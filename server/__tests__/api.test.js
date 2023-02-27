import app from "../app.js";
import request from "supertest";
import { disconnect, connect } from "../db/db.js";

// tests for definition get api
describe('GET /api/three/definition', () => {
  // success
  test('/api/three/definition', async () => {
    const response = await request(app).get('/api/three/definition');
    expect(response.body.word).toEqual("three");
  })
  // fail
  test('fail /api/three/definition', async () => {
    const response = await request(app).get('/api/three/definition');
    expect(response.body.word).not.toEqual("four");
  })
});

// tests for dictionary get api
describe('GET /api/dictionary', () => {
  // success
  test('/api/dictionary', async () => {
    const response = await request(app).get('/api/dictionary');
    // this is using mock data and is subject to change
    expect(response.body.includes("three")).toBe(true); 
  })
  // fail
  test('fail /api/dictionary', async () => {
    const response = await request(app).get('/api/dictionary');
    expect(response.body.includes("daousbofia")).toBe(false);
  })
});

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});