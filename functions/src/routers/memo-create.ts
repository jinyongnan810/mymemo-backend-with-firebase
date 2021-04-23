import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { Memo } from "../models/memo";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/memo",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const user = await User.findById(req.currentUser!.id);
    if (!user) {
      throw new BadRequestError("User not exists!");
    }
    const newMemo = Memo.build({ title, content, user });
    await newMemo.save();
    return res.send(newMemo);
  }
);

export default router;
