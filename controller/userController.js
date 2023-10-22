import { io } from "../index.js";
import User from "../models/User.js";
import {} from "socket.io";

// ####  ----Request Data
// {
//   "name": "Name From Form app",
// }
export const createUser = async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = new User({ name });
    await newUser.save();
    io.emit("user", newUser);
    return res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a user." });
  }
};

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find();
    return res.json({ users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};
//  ###------------Response
// {
//   "users": [
//   {
//   "_id": "6535a7f25d3fcec5a76ce3d6",
//   "name": "Mahmoud",
//   "createdAt": "2023-10-22T22:53:38.715Z",
//   "updatedAt": "2023-10-22T22:53:38.715Z",
//   "__v": 0
//   },

//   {
//   "_id": "6535a7fc5d3fcec5a76ce3d8",
//   "name": "Ali",
//   "createdAt": "2023-10-22T22:53:48.629Z",
//   "updatedAt": "2023-10-22T22:53:48.629Z",
//   "__v": 0
//   },
//   ....
//   ]
//   }
