const express = require('express');
const serviceCategoryController = require('../controllers/serviceCategoryController');

const router = express.Router();

// Create a service category
router.post('/', serviceCategoryController.createServiceCategory);

// Get all service categories
router.get('/', serviceCategoryController.getAllServiceCategories);

// Get a single service category by ID
router.get('/:id', serviceCategoryController.getServiceCategoryById);

router.get('/category/:id/services', serviceCategoryController.getServicesByCategory);
router.get('/services/:serviceId', serviceCategoryController.getServiceById);
// Update a service category
router.put('/:id', serviceCategoryController.updateServiceCategory);

// Delete a service category
router.delete('/:id', serviceCategoryController.deleteServiceCategory);

module.exports = router;
