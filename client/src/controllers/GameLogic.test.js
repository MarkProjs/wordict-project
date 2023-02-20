import * as GameLogic from "./GameLogic.js"

describe("Input submission tests", () => {
  test("Valid Input", () => {
    expect(GameLogic.validateInput("W")).toBe(true);
  });
  test("Invalid Input", () => {
    expect(GameLogic.validateInput("@")).toBe(false);
  });
});

describe("Word check tests", () => {
  test("All Right", () => {
    let expected = [
      GameLogic.RIGHT, 
      GameLogic.RIGHT, 
      GameLogic.RIGHT, 
      GameLogic.RIGHT, 
      GameLogic.RIGHT
    ]
    expect(GameLogic.checkSubmission("hello", "hello")).toEqual(expected);
  });
  test("All Wrong", () => {
    let expected = [
      GameLogic.WRONG, 
      GameLogic.WRONG, 
      GameLogic.WRONG, 
      GameLogic.WRONG, 
      GameLogic.WRONG
    ]
    expect(GameLogic.checkSubmission("waist", "hello")).toEqual(expected);
  });
  test("All Half Right", () => {
    let expected = [
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT
    ]
    expect(GameLogic.checkSubmission("lleoh", "hello")).toEqual(expected);
  });
});