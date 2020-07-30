import mongoose from "mongoose";
import { config } from "dotenv";
config();

const { MONGO_ADMIN_PASSWORD, MONGO_ADMIN_NAME, MONGO_CLUSTER } = process.env;

const db = `mongodb+srv://${MONGO_ADMIN_NAME}:${MONGO_ADMIN_PASSWORD}@mern-steck-test.gefv0.mongodb.net/${MONGO_CLUSTER}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

export default connectDB;
