import Plant from "../models/Plant.js";
import User from "../models/User.js";
import HttpStatus from "../utils/HttpStatus.js";

export const uploadNewPLant = async (req, res, next) => {
  const { plantName, plantDisease, image, hasDisease, userId } = req.body;
  // TODO Validation
  try {
    const user = await User.findById(userId);
    console.log("user:", user);
    if (!user) {
      const error = new Error(`Could not find User!`);
      error.statusCode = 404;
      throw error;
    }

    const newPlant = new Plant({
      plantName,
      hasDisease,
      plantDisease,
      image,
    });
    const savedPlant = await newPlant.save();

    user.plants.push(savedPlant._id);
    await user.save();

    return res.json({
      status: HttpStatus.SUCCESS,
      plant: savedPlant,
      user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const recentPLants = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId).populate("plants");
    const recentPlants = user.plants;
    return res.json({
      status: HttpStatus.SUCCESS,
      recentPlants,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
