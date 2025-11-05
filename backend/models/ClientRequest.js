// models/ClientRequest.js
const mongoose = require('mongoose');

const clientRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  serviceType: { type: String, required: true }, // e.g., Web, App, WordPress, Cloud
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClientRequest', clientRequestSchema);
