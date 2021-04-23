import express, {Request, Response} from "express";
import {BadRequestError} from "../errors/bad-request-error";
import {Memo} from "../models/memo";
const router = express.Router();

router.get("/api/memo/:id", async (req: Request, res: Response) => {
  const id = req.params["id"];
  try {
    const memo = await Memo.findById(id);
    return res.send(memo);
  } catch (error) {
    throw new BadRequestError("Memo not found!");
  }
});

export default router;
