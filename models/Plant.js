const { Schema, model } = require("mongoose");

const PlantSchema = new Schema(
  {
    plantName: {
      type: String,
      required: true,
    },
    plantDisease: {
      type: String,
    },
    image: {
      type: String,
      data: Buffer,
      contentType: String,
    },
    hasDisease: {
      type: Boolean,
      default: false,
    },
    treatment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Plant = model("Plant", PlantSchema);
module.exports = Plant;
