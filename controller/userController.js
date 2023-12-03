import Treatment from "../models/Treatment.js";
import User from "../models/User.js";
import HttpStatus from "../utils/HttpStatus.js";

export const adminGetUsers = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);
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

    const response = allUsers.filter((us) => us.email !== user.email);

    return res.json({
      status: HttpStatus.SUCCESS,
      users: response,
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

export const getOneUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    return res.json({ user });
  } catch (error) {
    console.log("error:", error);
  }
};

export const getPlantTreatment = async (req, res, next) => {
  // TODO: User Validation
  const { userId, plantId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error(`Could not find User!`);
      error.statusCode = 404;
      throw error;
    }

    const existingTreatment = await Treatment.findOne({ plantId });
    if (!existingTreatment) {
      const error = new Error(`Plant Treatment Not Found!`);
      error.statusCode = 404;
      throw error;
    }

    const treatment = existingTreatment.treatment;
    return res.json({
      status: HttpStatus.SUCCESS,
      data: { treatment },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const editPlantTreatment = async (req, res, next) => {
  // TODO: User Validation
  const { userId, plantId, plantDisease, treatment } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error(`Could not find User!`);
      error.statusCode = 404;
      throw error;
    }

    const isUserAdmin = user.isAdmin;
    if (!isUserAdmin) {
      res.status(401).json({
        status: HttpStatus.FAIL,
        msg: "User Not Have Any Permissions...",
      });
    }

    const existingTreatment = await Treatment.findOne({ plantId });
    if (!existingTreatment) {
      const error = new Error(`Plant treatment not found!`);
      error.statusCode = 404;
      throw error;
    }

    existingTreatment.plantDisease = plantDisease;
    existingTreatment.treatment = treatment;

    const updatedTreatment = await existingTreatment.save();
    return res.json({
      status: HttpStatus.SUCCESS,
      data: updatedTreatment,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
