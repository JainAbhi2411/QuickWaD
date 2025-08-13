const express = require('express');
const router = express.Router();
const {
  getAllExpertServices,
  getExpertServiceById,
  createExpertService,
  updateExpertService,
  deleteExpertService
} = require('../controllers/expertServiceController');

// Routes for expert service
router.get('/expert-services', getAllExpertServices); // Fetch all services
router.get('/expert-services/:id', getExpertServiceById); // Fetch one service by ID
router.post('/expert-services', createExpertService); // Create a new service
router.put('/expert-services/:id', updateExpertService); // Update a service
router.delete('/expert-services/:id', deleteExpertService); // Delete a service

module.exports = router;
