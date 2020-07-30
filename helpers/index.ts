import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const { JWT_SECRET } = process.env;

export const generateAccessToken = (payload: { user: { id: string } }) => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1h" });
};
