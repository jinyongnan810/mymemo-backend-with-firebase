import express from "express";
require("express-async-errors");
import { json } from "body-parser";
import cors from "cors";

import cookieSesion from "cookie-session";

import CurrentUserRouter from "./routers/current-user";
import SignInRouter from "./routers/signin";
import SignOutRouter from "./routers/signout";
import SignUpRouter from "./routers/signup";
import MemoListRouter from "./routers/memo-list";
import MemoSingleRouter from "./routers/memo-single";
import MemoCreateRouter from "./routers/memo-create";
import MemoUpdateRouter from "./routers/memo-update";
import MemoDeleteRouter from "./routers/memo-delete";
import FileUploadRouter from "./routers/file-upload";
import MemoTranferRouter from "./routers/transfer-data";
import { NotFoundError } from "./errors/not-found-error";
import { handleError } from "./middlewares/error-handler";

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://y-kin.com",
    "https://www.y-kin.com",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("trust proxy", true); // trust ingress nginx
app.use(
  cookieSesion({
    signed: false, // no encryption
    secure: process.env.NODE_ENV === "production", // only https
    sameSite: "none",
  })
);
app.use(json());
// auth routes
app.use(CurrentUserRouter);
app.use(SignInRouter);
app.use(SignOutRouter);
app.use(SignUpRouter);
// memo routes
app.use(MemoListRouter);
app.use(MemoSingleRouter);
app.use(MemoCreateRouter);
app.use(MemoUpdateRouter);
app.use(MemoDeleteRouter);
app.use(FileUploadRouter);
// app.use(MemoTranferRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(handleError);

export { app };
