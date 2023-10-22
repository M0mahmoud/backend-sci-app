import { config } from "dotenv";
import express from "express";
import { connectDB } from "./db/database.js";
import userRoute from "./routes/userRoute.js";
import { Server } from "socket.io";

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

app.use("/user", userRoute);

// connectDB()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`listening: ${port}`);
//     });
//   })
//   .catch((err) => console.log(err));

export const io = new Server(app.listen(port), {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

connectDB()
  .then(() => {
    io.on("connection", (_socket) => {
      console.log("Connected to server!");
    });
  })

  .catch((err) => console.log(err));
