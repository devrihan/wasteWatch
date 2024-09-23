const mongoose = require('mongoose');

// Define the bin schema
const binSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  number: {  // User's number, can be null
    type: Number,
    default: null  // Allow null by default
  }
}, { timestamps: true });

// Create the Bin model
const Bin = mongoose.model('Bin', binSchema);

module.exports = Bin;
