const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const onlineServiceSchema = new mongoose.Schema({
  name: String,
  icon: String,
  price: Number,
  duration: String,
  rating: Number,
  description: String,
  features: [String],
  badge: String,
  image: String,  // Optional image for Online Services
  type: { type: String, required: true }, // New field for type
  addons: [addonSchema]
}, { timestamps: true });

const OnlineService = mongoose.model('OnlineService', onlineServiceSchema);

module.exports = OnlineService;
