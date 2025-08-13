const ExpertService = require('../models/ExpertService');

// Get all expert services
const getAllExpertServices = async (req, res) => {
  try {
    const services = await ExpertService.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expert services', error });
  }
};

// Get a single expert service by ID
const getExpertServiceById = async (req, res) => {
  try {
    const service = await ExpertService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Expert service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expert service', error });
  }
};

// Create a new expert service
const createExpertService = async (req, res) => {
  try {
    const newService = new ExpertService(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expert service', error });
  }
};

// Update an existing expert service by ID
const updateExpertService = async (req, res) => {
  try {
    const updatedService = await ExpertService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Expert service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expert service', error });
  }
};

// Delete an expert service by ID
const deleteExpertService = async (req, res) => {
  try {
    const deletedService = await ExpertService.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Expert service not found' });
    }
    res.status(200).json({ message: 'Expert service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expert service', error });
  }
};

module.exports = {
  getAllExpertServices,
  getExpertServiceById,
  createExpertService,
  updateExpertService,
  deleteExpertService
};
