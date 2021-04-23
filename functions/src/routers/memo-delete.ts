import express, {Request, Response} from "express";
import {BadRequestError} from "../errors/bad-request-error";
import {UnAuthorizedError} from "../errors/unauthorized-error";
import {currentUser} from "../middlewares/current-user";
import {requireAuth} from "../middlewares/require-auth";
import {Memo} from "../models/memo";
const router = express.Router();

router.delete(
    "/api/memo/:id",
    currentUser,
    requireAuth,
    async (req: Request, res: Response) => {
      const id = req.params["id"];

      const memo = await Memo.findById(id);
      if (!memo) {
        throw new BadRequestError("Memo not exists!");
      }
      if (memo.user.id.toString() !== req.currentUser!.id) {
        throw new UnAuthorizedError();
      }
      memo.isDeleted = true;
      await memo.save();
      return res.send({});
    }
);

export default router;
