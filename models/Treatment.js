const { Schema, model } = require("mongoose");

const PlantTreatment = new Schema(
  {
    plantId: {
      type: String,
      required: true,
    },
    plantName: {
      type: String,
    },
    plantDisease: {
      type: String,
    },
    treatment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Treatment = model("Treatment", PlantTreatment);
module.exports = Treatment;
