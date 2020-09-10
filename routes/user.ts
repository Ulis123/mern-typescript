import express, { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { authTokenCheck } from "../middlewares/authTokenCheck";
import { config } from "dotenv";
config();

const router = express.Router();

router.get(
  "/api/me",
  authTokenCheck,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const user = await User.findById(userId).select(
        "-password -_id -createdAt -updatedAt -username"
      );

      return res.json({ user });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
