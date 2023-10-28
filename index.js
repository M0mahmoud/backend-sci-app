import { config } from "dotenv";
import express, { json } from "express";

import connectDB from "./db/database.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/userRoute.js";

config();
const app = express();
app.use(json());
const port = process.env.PORT || 3000;

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use("*", (_req, res) => {
  res.json({ msg: "Server running..." });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening: ${port}`);
    });
  })
  .catch((err) => console.log(err));
