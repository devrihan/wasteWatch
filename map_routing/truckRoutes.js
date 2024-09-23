const express = require('express');
const { startJourney } = require('../controllers/truckController');
const router = express.Router();

// Truck journey route
router.post('/startjourney', startJourney);

module.exports = router;
