import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const cloudinary = require("cloudinary").v2;
const router = express.Router();

router.post(
  "/api/upload",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const file = req.body.data;
    try {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: "ml_default",
      });
      res.send(uploadResponse);
    } catch (error) {
      console.log("Error uploading:", error);
      throw error;
    }
  }
);

export default router;
