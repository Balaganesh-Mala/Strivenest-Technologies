// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientRequest', required: true },
  clientName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  serviceType: { type: String },
  projectDetails: { type: String },
  projectId: { type: String, unique: true }, // custom project id e.g., PRJ-2025-001
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  developerName: { type: String },
  startDate: { type: Date, default: Date.now },
  deadline: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  remarks: { type: String },
  status: { type: String, enum: ['Assigned', 'In Progress', 'Completed'], default: 'Assigned' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
