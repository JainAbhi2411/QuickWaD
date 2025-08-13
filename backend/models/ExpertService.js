const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const expertServiceSchema = new mongoose.Schema({
  name: String,
  icon: String,
  price: Number,
  duration: String,
  rating: Number,
  description: String,
  features: [String],
  badge: String,
  image: String,
  type: { type: String, required: true }, // New field for type
  addons: [addonSchema]
}, { timestamps: true });

const ExpertService = mongoose.model('ExpertService', expertServiceSchema);

module.exports = ExpertService;
