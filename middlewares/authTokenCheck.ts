import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const { JWT_SECRET } = process.env;

export const authTokenCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Gather the jwt access token from the request header
  const token = req.headers["x-auth-token"] as string;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" }); // if there isn't any token
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    // @ts-ignore
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
