const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Search services route
router.get('/services/search', serviceController.searchServices);

// Get service detail route
router.get('/services/:serviceId', serviceController.getServiceDetail);

module.exports = router;
