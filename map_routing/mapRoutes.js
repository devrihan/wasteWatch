const express = require('express');
const { getDistanceMatrix } = require('../controllers/mapController');
const router = express.Router();

// Route to fetch Distance Matrix
router.get('/distancematrix', getDistanceMatrix);
module.exports = router;
