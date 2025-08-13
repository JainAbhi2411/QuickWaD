const PremiumService = require('../models/PremiumService');

// Get all premium services
const getAllPremiumServices = async (req, res) => {
  try {
    const services = await PremiumService.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching premium services', error });
  }
};

// Get a single premium service by ID
const getPremiumServiceById = async (req, res) => {
  try {
    const service = await PremiumService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Premium service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching premium service', error });
  }
};

// Create a new premium service
const createPremiumService = async (req, res) => {
  try {
    const newService = new PremiumService(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating premium service', error });
  }
};

// Update an existing premium service by ID
const updatePremiumService = async (req, res) => {
  try {
    const updatedService = await PremiumService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Premium service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating premium service', error });
  }
};

// Delete a premium service by ID
const deletePremiumService = async (req, res) => {
  try {
    const deletedService = await PremiumService.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Premium service not found' });
    }
    res.status(200).json({ message: 'Premium service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting premium service', error });
  }
};

module.exports = {
  getAllPremiumServices,
  getPremiumServiceById,
  createPremiumService,
  updatePremiumService,
  deletePremiumService
};
