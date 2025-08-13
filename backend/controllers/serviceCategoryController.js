const ServiceCategory = require('../models/serviceCategory');

// Create a new service category
exports.createServiceCategory = async (req, res) => {
  try {
    const { name, icon, description, serviceCount, services } = req.body;
    const newServiceCategory = new ServiceCategory({ name, icon, description, serviceCount, services });
    await newServiceCategory.save();
    res.status(201).json(newServiceCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service category', error });
  }
};

// Get all service categories
exports.getAllServiceCategories = async (req, res) => {
  try {
    const serviceCategories = await ServiceCategory.find();
    res.status(200).json(serviceCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service categories', error });
  }
};

// Get a single service category by ID
exports.getServiceCategoryById = async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findById(req.params.id);
    if (!serviceCategory) {
      return res.status(404).json({ message: 'Service Category not found' });
    }
    res.status(200).json(serviceCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service category', error });
  }
};
// Get a service by its ID across all categories
exports.getServiceById = async (req, res) => {
    console.log(req.params);
  try {
    const { serviceId } = req.params;  // Service ID from the request parameter
    
    // Search for the service across all categories
    const category = await ServiceCategory.findOne({ "services._id": serviceId });

    if (!category) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Find the specific service in the category
    const service = category.services.find(service => service._id.toString() === serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Return the service data
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
};
// Update a service category
exports.updateServiceCategory = async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!serviceCategory) {
      return res.status(404).json({ message: 'Service Category not found' });
    }
    res.status(200).json(serviceCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service category', error });
  }
};

// Delete a service category
exports.deleteServiceCategory = async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findByIdAndDelete(req.params.id);
    if (!serviceCategory) {
      return res.status(404).json({ message: 'Service Category not found' });
    }
    res.status(200).json({ message: 'Service Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service category', error });
  }
};
// Get all services of a specific category
exports.getServicesByCategory = async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findById(req.params.id);
    if (!serviceCategory) {
      return res.status(404).json({ message: 'Service Category not found' });
    }
    // Assuming `services` is an array in the category document that contains the service data
    res.status(200).json(serviceCategory); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services for the category', error });
  }
};