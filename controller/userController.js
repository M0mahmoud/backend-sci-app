import User from "../models/User.js";
import HttpStatus from "../utils/HttpStatus.js";

export const adminGetUsers = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);
    console.log("user:", user);
    if (!user) {
      const error = new Error(`Could not find User!`);
      error.statusCode = 404;
      throw error;
    }
    const allUsers = await User.find();
    const isUserAdmin = user.isAdmin;

    if (!isUserAdmin) {
      res.status(401).json({
        status: HttpStatus.FAIL,
        msg: "User Not Have Any Permissions...",
      });
    }

    return res.json({
      status: HttpStatus.SUCCESS,
      users: allUsers,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { idOfUserWillDel } = req.body;

  try {
    const user = await User.findById(idOfUserWillDel);
    if (!user) {
      const error = new Error(`Could not find User!`);
      error.statusCode = 404;
      throw error;
    }

    await User.findOneAndDelete({ _id: idOfUserWillDel });
    return res.status(200).json({ status: HttpStatus.SUCCESS, data: null });
  } catch (err) {
    console.log("err:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
