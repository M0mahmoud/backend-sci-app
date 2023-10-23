const { config } = require("dotenv");
const express = require("express");
const connectDB = require("./db/database");
const userRoute = require("./routes/userRoute");
const { Server } = require("socket.io");

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

// export const io = new Server(app.listen(port), {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   },
// });

connectDB()
  .then(() => {
    const io = require("./socket");
    const httpServer = app.listen(3000);
    io.init(httpServer);

    const socketIO = io.getIO();

    socketIO.on("connection", () => {
      console.log("Connected to server!");
      // You can now attach other event listeners to 'socket' here
    });
  })

  .catch((err) => console.log(err));
