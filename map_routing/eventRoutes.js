const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

// Define routes
router.post('/events/', eventController.eventAdd);
router.delete('/events/:id', eventController.eventDelete);
router.get('/events/', eventController.getAllEvents);
module.exports = router;