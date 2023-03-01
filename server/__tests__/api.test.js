import app from "../app.js";
import request from "supertest";
import controllers from "../controllers/controllers.js";
import { jest } from '@jest/globals';
jest.mock('../controllers/controllers.js');

// Mock Controllers
controllers.getDefinition = jest.fn((e) => {
  if (e === 'monkey') {
    return {
      "word": "monkey",
      "definitions": [
        "a small to medium-sized primate that typically has a long tail, most kinds of which live in trees in tropical countries."
      ]
    }
  } else {
    return {
      "word": "not found"
    }
  }
})

controllers.getAllWords = jest.fn((e) => {
  const words = [
    'limit', 'elite', 'exuberant', 'destruction', 'present', 'three'
  ];
  if (e) {
    console.log("e")
    return { "words": words.filter(word => word.length == e) }
  } else {
    console.log("hehexd")
    return { "words": words }
  }
})

// tests for definition get api
describe('GET /api/three/definition', () => {
  // test for existing word
  test('/api/monkey/definition', async () => {
    const response = await request(app).get('/api/monkey/definition');
    expect(response.body.word).toEqual("monkey");
    expect(response.body.definitions).toBeDefined()
  })
  // test for non existant word
  test('fail /api/asdasd/definition', async () => {
    const response = await request(app).get('/api/asdasd/definition');
    expect(response.body.word).toEqual("not found");
    expect(response.body.word).not.toEqual("monkey");
  })
});

// tests for dictionary get api
describe('GET /api/dictionary', () => {
  // test for all words
  test('/api/dictionary', async () => {
    const response = await request(app).get('/api/dictionary');
    expect(response.body).toContain("elite");
    expect(response.body).not.toContain("daousbofia");
  })
  // test for specific length
  test('/api/dictionary?length=5', async () => {
    const response = await request(app).get('/api/dictionary?length=5');
    expect(response.body).toContain("three");
    expect(response.body).not.toContain("present");
  })
});

