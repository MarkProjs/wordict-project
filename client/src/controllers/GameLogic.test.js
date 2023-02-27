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
  test("All Right Different Capitalisation", () => {
    let expected = [
      GameLogic.RIGHT, 
      GameLogic.RIGHT, 
      GameLogic.RIGHT, 
      GameLogic.RIGHT, 
      GameLogic.RIGHT
    ]
    expect(GameLogic.checkSubmission("HElLo", "heLlO")).toEqual(expected);
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
  test("All Wrong Different Capitalisation", () => {
    let expected = [
      GameLogic.WRONG, 
      GameLogic.WRONG, 
      GameLogic.WRONG, 
      GameLogic.WRONG, 
      GameLogic.WRONG
    ]
    expect(GameLogic.checkSubmission("WaIsT", "hello")).toEqual(expected);
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
  test("All Half Right Different Capitalisation", () => {
    let expected = [
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT
    ]
    expect(GameLogic.checkSubmission("LLeoh", "HEllo")).toEqual(expected);
  });
  test("No Duplicate Half Right", () => {
    let expected = [
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.HALF_RIGHT, 
      GameLogic.WRONG, 
      GameLogic.WRONG
    ]
    expect(GameLogic.checkSubmission("eppeep", "people")).toEqual(expected);
  })
  test("Invalid Submission", () => {
    expect(() => GameLogic.checkSubmission(undefined, "hello")).toThrow(new Error("Invalid inputs"))
  })
});