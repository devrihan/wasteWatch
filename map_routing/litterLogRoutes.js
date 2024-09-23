const express = require('express');
const litterLogController = require('../controllers/litterLogController');
const router = express.Router();

// Define routes for litter logs
router.post('/litter-log-add', litterLogController.litterLogAdd);
router.delete('/litterlogdelete/:id', litterLogController.litterLogDelete);
router.get('/getalllitterlogs', litterLogController.getAllLitterLogs);

module.exports = router;