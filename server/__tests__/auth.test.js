import app from "../app.js";
import request from "supertest";
import userControllers from "../controllers/userControllers.js";
import auth from "../routes/auth.js";
import { jest } from '@jest/globals';
jest.mock("../routes/auth.js");
jest.mock('../controllers/userControllers.js');


//mocks

jest.spyOn(auth.client, 'verifyIdToken')
  .mockImplementation(() => {
    return {getPayload: () => {
      return { 
        name: "Greg", 
        email: "g@email", 
        picture: "picUrl" 
      }; 
    }}
  });

userControllers.updateElo = jest.fn(async (user, elo) => {
  if(!user.email || !elo){
    throw new Error("TEST FAILED: input not valid");
  }
});
userControllers.addUserIfNew = jest.fn(async (user) => {
  if(!user.email){
    throw new Error("TEST FAILED: input not valid");
  }
});


// auth.sessionHandler = jest.fn((req, res, next) => {
//   next();
// });
// auth.isAuthenticated = jest.fn((req, res, next) => {
// //   req.session.regenerate(function () {
// //     req.session.user = {
// //       email: "some_email@smth.com",
// //       name: "Greg",
// //       picture: "someUrl"
// //     };
// //   });
//   next();
// });

const response = await request(app).post('/auth/logged-in-check').send({token:100});
console.log(response.statusCode);

describe("tests for auth route", () => {

  /**
   * test base auth input
   */
  test("test login check", async () => {
    let response = await request(app).get('/auth/logged-in-check').expect(200);
    console.log(response.status);

  });
  
//   test("test update elo", async () => {
//     await request(app).post('/auth/update-elo').expect(200).send({elo:100});
//     expect(userControllers.updateElo).toHaveBeenCalledTimes(1);
//   });

});