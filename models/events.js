const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,    // Title is required
        trim: true,        // Removes leading/trailing spaces
    },
    description: {
        type: String,
        required: true,    // Description is required
        trim: true,
    },
    date: {
        type: Date,
        required: true,    // Event date is required
    },
    location: {
        type: String,
        required: true,    // Location is required
    },
    regcount: {
        type: Number,
        default: 0,
        required: true,
    }
});

// // Middleware to update the updatedAt field on document update
// eventSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
