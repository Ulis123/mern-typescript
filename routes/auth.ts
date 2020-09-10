import express, { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { signIn, signUp } from "../validators";
import { generateAccessToken } from "../helpers";
import { config } from "dotenv";
config();

const router = express.Router();

router.post(
  "/api/login",
  signIn,
  async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchesPassword(password))) {
        return res
          .status(400)
          .json({ message: "Incorrect email or password. Please try again." });
      }

      const payload = { user: { id: user.id } };
      const token = await generateAccessToken(payload);
      res.setHeader("x-auth-token", token);

      return res.json({ message: "Log In success", user, token });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/api/signup",
  signUp,
  async (req: Request, res: Response, _next: NextFunction) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = await User.create(req.body);

        const payload = { user: { id: newUser.id } };
        const token = await generateAccessToken(payload);
        res.setHeader("x-auth-token", token);

        return res.json({ message: "Sign Up success", user: newUser, token });
      }
      return res.status(400).json({ message: "User is already exists" });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/api/signout",
  async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      res.setHeader("x-auth-token", "");
      return res.status(200).json({ message: "Sign Out success" });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
