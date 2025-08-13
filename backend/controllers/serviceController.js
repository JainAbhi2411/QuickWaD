const ExpertService = require('../models/ExpertService');
const OnlineService = require('../models/OnlineService');
const PremiumService = require('../models/PremiumService');
const ServiceCategory = require('../models/serviceCategory'); // Import the ServiceCategory model

// Search controller to handle searching across all service types
exports.searchServices = async (req, res) => {
  const { query } = req.query;
  
  try {
    const regex = new RegExp(query, 'i'); // Case-insensitive search

    // Search across all models
    const expertServices = await ExpertService.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    });

    const onlineServices = await OnlineService.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    });

    const premiumServices = await PremiumService.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    });

    const categoryServices = await ServiceCategory.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    }).populate({
      path: 'services',
      match: {
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { features: { $regex: regex } }
        ]
      }
    });

    // Flatten the services within the categories
    let allCategoryServices = [];
    categoryServices.forEach(category => {
      allCategoryServices = [
        ...allCategoryServices,
        ...category.services
      ];
    });

    // Combine all the results
    const allServices = [
      ...expertServices,
      ...onlineServices,
      ...premiumServices,
      ...allCategoryServices
    ];

    res.status(200).json({ services: allServices });

  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ message: 'Server error during search' });
  }
};
// Service detail controller
exports.getServiceDetail = async (req, res) => {
  const { serviceId } = req.params;  // Service ID from URL

  try {
    // Check in ExpertService
    let service = await ExpertService.findById(serviceId);
    if (service) {
      return res.status(200).json({ service, type: 'expert' });
    }

    // Check in OnlineService
    service = await OnlineService.findById(serviceId);
    if (service) {
      return res.status(200).json({ service, type: 'online' });
    }

    // Check in PremiumService
    service = await PremiumService.findById(serviceId);
    if (service) {
      return res.status(200).json({ service, type: 'premium' });
    }

    // Check in ServiceCategory and populate the service
    const category = await ServiceCategory.findOne({ 'services._id': serviceId });
    if (category) {
      const serviceDetail = category.services.find(s => s._id.toString() === serviceId);
      return res.status(200).json({ service: serviceDetail, type: 'category' });
    }

    // If no service found
    return res.status(404).json({ message: 'Service not found' });
    
  } catch (error) {
    console.error('Error fetching service details:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};