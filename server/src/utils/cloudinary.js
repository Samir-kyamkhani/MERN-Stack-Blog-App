import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //node file system

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return "File Not Found !" || null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // remove the local save file as upload operation is successfull
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the local save file as upload operation failed

    return null; // return null as upload operation failed
  }
};

const deleteOnCloudinary = async (findePost) => {
  try {
    if (!findePost) return "File Not Found !" || null;

    const oldThhumbnail = findePost.thumbnail;
    const splitThumbnail = oldThhumbnail.split("/");
    const thumbnailFile = splitThumbnail[splitThumbnail.length - 1];
    const splitDotThumbnail = thumbnailFile.split(".")[0];

    await cloudinary.uploader.destroy(splitDotThumbnail, {
      resource_typ: "auto",
    })

    
  } catch (error) {
    return null; // return null as upload operation failed
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
