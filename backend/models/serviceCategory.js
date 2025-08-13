const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  features: { type: [String], required: true },
  addons: [addonSchema],
  type: { type: String, required: true }
});

const serviceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  serviceCount: { type: Number, required: true },
  services: [serviceSchema],
}, { timestamps: true });

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

module.exports = ServiceCategory;
