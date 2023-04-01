import app from "../app.js";
import request from "supertest";
import wordControllers from "../controllers/wordControllers";
import userControllers from "../controllers/userControllers.js";
import { jest } from '@jest/globals';
jest.mock('../controllers/wordControllers');
jest.mock('../controllers/userControllers.js');

// Mock Controllers
wordControllers.getDefinition = jest.fn((e) => {
  if (e === 'monkey') {
    return {
      "word": "monkey",
      "definitions": [
        "a small to medium-sized primate that typically has a long tail," +
        " most kinds of which live in trees in tropical countries."
      ]
    }
  } else {
    return null
  }
})

wordControllers.getAllWords = jest.fn((e) => {
  const words = [
    'limit', 'elite', 'exuberant', 'destruction', 'present', 'three'
  ];
  if (e) {
    e = parseInt(e);
    console.log(words.filter(word => word.length === e))
    return { "words": words.filter(word => word.length === e) }
  } else {
    return { "words": words }
  }
})

userControllers.getAllUsers = jest.fn(() => {
  return [
    { name: "jacky", elo: 100 },
    { name: "jeremy", elo: 90 }
  ]
})

userControllers.getUser = jest.fn(() => {
  return {
    "name": "MonkeyMan",
    "image": "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/" +
      "GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg",
    "favoriteWords": ["happy", "rooty", "earthworm"],
    "elo": 100
  }
})

// tests for definition get api
describe('Test Definition GET API', () => {
  // test for existing word
  test('Test for existing word', async () => {
    const response = await request(app).get('/api/monkey/definition');
    expect(response.body.word).toEqual("monkey");
    expect(response.body.definitions).toBeDefined()
  });
  // test for non existant word
  test('Test for non existant word', async () => {
    const response = await request(app).get('/api/asdasd/definition');
    expect(response.body.word).not.toBeDefined();
    expect(response.body.word).not.toEqual("monkey");
  });
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

//TODO figure out how to fake auth for tests
// tests for user get api
// describe('Test User GET API', () => {
//   // test for latest user
//   test('Test Retrieving latest user', async () => {
//     const response = await request(app).get('/auth');
//     expect(response.body.name).toEqual("MonkeyMan");
//     expect(response.body.image).toContain("//");
//     expect(response.body.favoriteWords).toBeDefined();
//     expect(response.body.elo).toEqual(100);
//   })
// })

describe('Test all users GET API', () => {
  test('Retrieving all users', async () => {
    const response = await request(app).get('/api/all-users');
    expect(response.body[0].name).toEqual("jacky")
    expect(response.body[0].elo).toEqual(100)
  })
})