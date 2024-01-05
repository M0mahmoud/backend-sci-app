const { config } = require("dotenv");
const express = require("express");

const connectDB = require("./db/database.js");
const authRoute = require("./routes/auth.js");
const plantRoute = require("./routes/plant.js");
const userRoute = require("./routes/userRoute.js");

config();
const app = express();
app.use(express.json());
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
app.use("/admin", userRoute);
app.use("/plant", plantRoute);

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
