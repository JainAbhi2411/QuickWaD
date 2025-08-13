const express = require('express');
const router = express.Router();
const {
  getAllOnlineServices,
  getOnlineServiceById,
  createOnlineService,
  updateOnlineService,
  deleteOnlineService
} = require('../controllers/onlineServiceController');

// Routes for online service
router.get('/online-services', getAllOnlineServices);
router.get('/online-services/:id', getOnlineServiceById);
router.post('/online-services', createOnlineService);
router.put('/online-services/:id', updateOnlineService);
router.delete('/online-services/:id', deleteOnlineService);

module.exports = router;
