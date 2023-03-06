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
    return null
  }
})

controllers.getAllWords = jest.fn((e) => {
  const words = [
    'limit', 'elite', 'exuberant', 'destruction', 'present', 'three'
  ];
  if (e) {
    return { "words": words.filter(word => word.length == e) }
  } else {
    return { "words": words }
  }
})

// tests for definition get api
describe('Test Definition GET API', () => {
  // test for existing word
  test('Test for existing word', async () => {
    const response = await request(app).get('/api/monkey/definition');
    expect(response.body.word).toEqual("monkey");
    expect(response.body.definitions).toBeDefined()
  })
  // test for non existant word
  test('Test for non existant word', async () => {
    const response = await request(app).get('/api/asdasd/definition');
    expect(response.body.word).not.toBeDefined();
    expect(response.body.word).not.toEqual("monkey");
  })
});

// tests for dictionary get api
describe('Test Dictionary GET API', () => {
  // test for all words
  test('Test Retrieving all words', async () => {
    const response = await request(app).get('/api/dictionary');
    expect(response.body).toContain("elite");
    expect(response.body).not.toContain("daousbofia");
  })
  // test for specific length
  test('Test for retrieving all words of Specific length', async () => {
    const response = await request(app).get('/api/dictionary?length=5');
    expect(response.body).toContain("three");
    expect(response.body).not.toContain("present");
  })
});

