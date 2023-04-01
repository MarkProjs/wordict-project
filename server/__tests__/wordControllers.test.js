import wordControllers from "../controllers/wordControllers";
import {Words} from "../db/db.js";
import { jest } from '@jest/globals';
jest.mock("../db/db.js");


Words.findOne = jest.fn( async () => {
  return {word: "hello"};
});

Words.count = jest.fn( async () => {
  return 0;
});

Words.getRandomUsingVal = jest.fn( async () => {
  return "word";
});

Words.getOnlyWordFields = jest.fn( async () => {
  return [{word:"hello"}, {word:"two"}];
});
// TESTS

/**
 * tests the random word function
 */
test("random word test", async () => {
  const response = await wordControllers.getRandomWord();
  expect(response).toBe('word');

});
/**
 * tests the getDefinition function
 */
test("getDefinitionTest", async () => {
  const response = await wordControllers.getDefinition();
  expect(response.word).toBe("hello");
});
/**
 * test getAllWords dunction
 */
test("get all words test", async () => {
  const response = await wordControllers.getAllWords();
  expect(response.words[0]).toBe("hello");
  expect(response.words[1]).toBe("two");
  expect(response.count).toBe(2);
});
