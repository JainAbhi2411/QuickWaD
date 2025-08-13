const express = require('express');
const router = express.Router();
const {
  getAllPremiumServices,
  getPremiumServiceById,
  createPremiumService,
  updatePremiumService,
  deletePremiumService
} = require('../controllers/premiumServiceController');

// Routes for premium service
router.get('/premium-services', getAllPremiumServices);
router.get('/premium-services/:id', getPremiumServiceById);
router.post('/premium-services', createPremiumService);
router.put('/premium-services/:id', updatePremiumService);
router.delete('/premium-services/:id', deletePremiumService);

module.exports = router;
