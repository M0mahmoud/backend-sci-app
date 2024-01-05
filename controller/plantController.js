const Treatment = require("../models/Treatment");
const User = require("../models/User");
const HttpStatus = require("../utils/HttpStatus");

const uploadNewPLant = async (req, res, next) => {
  const { plantName, plantDisease, image, hasDisease, userId, plantId } =
    req.body;
  // TODO Validation
  try {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error(`Could not find User!`);
      error.statusCode = 404;
      throw error;
    }

    const existingTreatment = await Treatment.findOne({ plantId });

    const newPlant = new Plant({
      plantName,
      hasDisease,
      plantDisease,
      image,
    });

    if (hasDisease) {
      newPlant.treatment = existingTreatment.treatment;
    }
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

const recentPLants = async (req, res, next) => {
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
module.exports = {
  uploadNewPLant,
  recentPLants,
};
