const OnlineService = require('../models/OnlineService');

// Get all online services
const getAllOnlineServices = async (req, res) => {
  try {
    const services = await OnlineService.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching online services', error });
  }
};

// Get a single online service by ID
const getOnlineServiceById = async (req, res) => {
  try {
    const service = await OnlineService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Online service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching online service', error });
  }
};

// Create a new online service
const createOnlineService = async (req, res) => {
  try {
    const newService = new OnlineService(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating online service', error });
  }
};

// Update an existing online service by ID
const updateOnlineService = async (req, res) => {
  try {
    const updatedService = await OnlineService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Online service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating online service', error });
  }
};

// Delete an online service by ID
const deleteOnlineService = async (req, res) => {
  try {
    const deletedService = await OnlineService.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Online service not found' });
    }
    res.status(200).json({ message: 'Online service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting online service', error });
  }
};

module.exports = {
  getAllOnlineServices,
  getOnlineServiceById,
  createOnlineService,
  updateOnlineService,
  deleteOnlineService
};
