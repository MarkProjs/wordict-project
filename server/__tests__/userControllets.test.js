import userControllers from "../controllers/userControllers";
import { Users } from "../db/db.js";
import { jest } from '@jest/globals';
jest.mock("../db/db.js");

//set up
const saveFunc = jest
  .spyOn(Users.prototype, 'save')
  .mockImplementation(() => {}); 


Users.getUserFavorites = jest.fn((query) => {
  if(!query.email){
    throw new Error("TEST FAILED: input not valid");
  }
  return ["apple", "papa"];
});
  
Users.addUserFavoriteWord = jest.fn((email, word) => {
  if(!email || !word){
    throw new Error("TEST FAILED: input not valid");
  }
});

Users.removeUserFavoriteWord = jest.fn((email, word) => {
  if(!email || !word){
    throw new Error("TEST FAILED: input not valid");
  }
});

Users.findOneAndUpdate = jest.fn((user, newName) => {
  if(!user.email || !newName.name){
    throw new Error("TEST FAILED: input not valid");
  }
});

Users.getUserData = jest.fn(async (query) => {
  if(query.email === "greg"){
    return {name: "Grigor"};
  }else{
    return false;
  }
});


Users.updatePicture = jest.fn(async (email, pic) => {
  if(!email || !pic){
    throw new Error("TEST FAILED: input not valid");
  }
});

Users.updateUserElo = jest.fn(async (email, elo) => {
  if(!email || !elo){
    throw new Error("TEST FAILED: input not valid");
  }
});

Users.updateFavorites = jest.fn(async (email, faves) => {
  if(!email || !faves){
    throw new Error("TEST FAILED: input not valid");
  }
});
Users.getAllUsersForLeaderboard = jest.fn(async () => {
  return [{name: "Grigor"}, {name: "Nolan"}];
});

//TESTS

/**
 * resets Users mock before every run
 */
beforeEach(() => {
  // Clear all calls to methods:
  saveFunc.mockClear();
});

describe("testing user controllers", () => {
  /**
   * test getUserFavorites function
   */
  test("test get favortie words", async () =>{
    let response = await userControllers.getUserFavorites({
      email: "smth"
    });
    expect(response[0]).toBe("apple");
    expect(response[1]).toBe("papa");
  })
  /**
   * tests getUserInfo method
   */
  test("test getUserInfo", async () => {
    const response = await userControllers.getUserInfo({email:'greg'});
    expect(response.name).toBe("Grigor");
  });
  /**
   * tests getAllUsers function
   */
  test("test get all users", async () => {
    const response = await userControllers.getAllUsers();
    expect(response[0].name).toBe("Grigor");
    expect(response[1].name).toBe("Nolan");
  });
  /**
   * test updatePicture function
   */
  test("test update Picture", async () => {
    await userControllers.updatePicture( {email:"Test"}, "urlPic");
    expect(Users.updatePicture).toHaveBeenCalledWith("Test", "urlPic");  
    expect(Users.updatePicture).toHaveBeenCalledTimes(1);
  });
  /**
   * tests updateFavorites function
   */
  test("test update Favorites", async () => {
    await userControllers.updateFavorites( {email:"Test"}, ["faves1", "faves2"]);
    expect(Users.updateFavorites).toHaveBeenCalledWith("Test", ["faves1", "faves2"]);  
    expect(Users.updateFavorites).toHaveBeenCalledTimes(1);
  });
  /**
   * tests updateElo function
   */
  test("test update Elo", async () => {
    await userControllers.updateElo( {email:"Test"}, 100);
    expect(Users.updateUserElo).toHaveBeenCalledWith("Test", 100);  
    expect(Users.updateUserElo).toHaveBeenCalledTimes(1);
  });
  /**
   * test addUserIfNew With new user
   */
  test("test addUserIfNew with new user", async () =>{
    await userControllers.addUserIfNew({email:'newEmail'});
    expect(saveFunc).toHaveBeenCalledTimes(1);
  });
  /**
   * test addUSerIFnew with old user
   */
  test("test addUserIfNew with new user", async () =>{
    await userControllers.addUserIfNew({email:'greg'});
    expect(saveFunc).toHaveBeenCalledTimes(0);
  });
  /**
   * test updateName function
   */
  test("test updateName function", async () => {
    await userControllers.updateName({email:"grer"}, "newNmae");
    expect(Users.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });
  /**
   * test postUSerFavoriteWord where word should be removed form favorites
   */
  test("test postUserFavoriteWord where the word is already a fav", async () => {
    await userControllers.postUserFavoriteWord({email:"email"}, "word", true);
    expect(Users.removeUserFavoriteWord).toHaveBeenCalledTimes(1);
  });
  /**
   * test postUSerFavoriteWord where word should be added tofavorites
   */
  test("test postUserFavoriteWord where the word is already a fav", async () => {
    await userControllers.postUserFavoriteWord({email:"email"}, "word", );
    expect(Users.addUserFavoriteWord).toHaveBeenCalledTimes(1);
  });
});