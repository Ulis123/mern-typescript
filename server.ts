import express, { Request, Response } from "express";
import path from "path";
import logger from "morgan";
import helmet from "helmet";

import router from "./routes/auth";
import routerUser from "./routes/user";
import connectDB from "./db";
connectDB();

const { NODE_ENV, PORT } = process.env;
const IN_PROD = NODE_ENV === "production";

const app = express();
const port = PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/", router);
app.use("/", routerUser);

if (IN_PROD) {
  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (_req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

// {
//   "email": "sfdgsdf@gmail.com",
//   "password": "3cdDxb45dcb#"
// }
