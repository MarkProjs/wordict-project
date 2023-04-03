import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
dotenv.config();


const sasToken = process.env.AZURE_SAS;
const containerName = "helloblob";
const storageAccountName = process.env.storageresourcename || "azure1533777";
const serviceUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
const blobService = new BlobServiceClient(serviceUrl);
const containerClient = blobService.getContainerClient(containerName);


/**
 * 
 * @param {FileObject} pictureFile 
 * @returns {String} url to the picture blob on asure
 */
async function imageUpload(pictureFile){
  console.log(containerClient);
  const path = pictureFile.name;
  const blobPublicUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/`;
  const blobClient = containerClient.getBlockBlobClient(path);
  console.log(blobClient);
  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: pictureFile.mimetype } };
  await blobClient.uploadData(pictureFile.data, options);

  return blobPublicUrl + path;
}

//exporting client for testing
export {containerClient, imageUpload};