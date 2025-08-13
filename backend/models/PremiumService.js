const mongoose = require('mongoose');

const workflowStepSchema = new mongoose.Schema({
  step: Number,
  title: String,
  description: String,
  duration: String
});

const portfolioItemSchema = new mongoose.Schema({
  title: String,
  image: String,
  client: String
});

const premiumServiceSchema = new mongoose.Schema({
  name: String,
  icon: String,
  image: String,
  description: String,
  price: Number,
  duration: String,
  rating: Number,
  features: [String],
  workflow: [workflowStepSchema],
  portfolio: [portfolioItemSchema],
  type: { type: String, required: true } // New field for type
}, { timestamps: true });

const PremiumService = mongoose.model('PremiumService', premiumServiceSchema);

module.exports = PremiumService;
