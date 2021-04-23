import express, {Request, Response} from "express";
import {Memo} from "../models/memo";
const router = express.Router();

router.get("/api/memo/list", async (req: Request, res: Response) => {
  const list = await Memo.find({isDeleted: false});
  return res.send(list);
});

export default router;
