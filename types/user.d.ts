import { Document, Model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {
  hash: (password: string) => Promise<string>;
}
