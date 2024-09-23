const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  deflocation: {
    type: {
      type: String, // 'Point' is required for GeoJSON format
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers: [longitude, latitude]
      required: true,
    },
  },

  //possible errors!
  regevents: {
    type: [String],
    default: [],
  },

  usertype: {
    type: String,
    enum: ["Admin", "User", "Trucker"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
