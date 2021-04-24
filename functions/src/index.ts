import * as functions from "firebase-functions";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
process.env.MONGO_PWD =
  process.env.MONGO_PWD ?? functions.config().mymemo.dbkey;
process.env.JWT_KEY = process.env.JWT_KEY ?? functions.config().mymemo.jwtkey;
process.env.CLOUDINARY_CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME ??
  functions.config().mymemo.cloudinarycloudname;
process.env.CLOUDINARY_API_KEY =
  process.env.CLOUDINARY_API_KEY ?? functions.config().mymemo.cloudinaryapikey;
process.env.CLOUDINARY_API_SECRET =
  process.env.CLOUDINARY_API_SECRET ??
  functions.config().mymemo.cloudinaryapisecret;

import { app } from "./app";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

mongoose
  .connect(
    `mongodb+srv://jinyongnan:${process.env.MONGO_PWD}@cluster0.xk5om.gcp.mongodb.net/mymemo-3?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DB connected.");
  })
  .catch((error) => {
    console.error(error.message);
  });
export const mymemo = functions.https.onRequest(app);
