import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloudinary = async (localpath) => {
  try {
    if (!localpath) return null;
    console.log("Attempting to upload image at:", localpath);

    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });

    fs.unlink(localpath, (err) => {
      if (err) {
        console.error("Error removing file:", err);
      }
    });
    console.log(response.url);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);

    if (fs.existsSync(localpath)) {
      fs.unlinkSync(localpath);
    }

    return null;
  }
};

export default uploadCloudinary;
