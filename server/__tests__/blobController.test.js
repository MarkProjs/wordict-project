import { jest } from '@jest/globals';
import {containerClient, imageUpload} from "../controllers/blobController";
jest.mock("../controllers/blobController");


//set up
const uploadFunc = jest.fn(async (data1, data2) => {
  if(!data1 || !data2){
    throw new Error("TEST FAILED: input not valid");
  }
});
jest.spyOn(containerClient, 'getBlockBlobClient')
  .mockImplementation(() => {
    return {uploadData: uploadFunc};
  });

test("Testing image upload", async () => {
  await imageUpload({data:"pic1"});
  expect(uploadFunc).toHaveBeenCalledTimes(1);
});

