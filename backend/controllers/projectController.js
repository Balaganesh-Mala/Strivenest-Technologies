// controllers/projectController.js
const Project = require('../models/Project');
const ClientRequest = require('../models/ClientRequest');
const User = require('../models/User');

// Helper to generate a simple projectId (you can improve format)
const generateProjectId = async () => {
  const count = await Project.countDocuments();
  const id = `PRJ-${new Date().getFullYear()}-${(count + 1).toString().padStart(3, '0')}`;
  return id;
};

// Create Project (assign)
exports.createProject = async (req, res) => {
  try {
    const {
      clientId,
      developerId,
      startDate,
      deadline,
      priority,
      remarks,
    } = req.body;

    const client = await ClientRequest.findById(clientId);
    if (!client) return res.status(404).json({ success: false, message: 'Client request not found' });

    const developer = developerId ? await User.findById(developerId) : null;
    const projectId = await generateProjectId();

    const project = await Project.create({
      clientId: client._id,
      clientName: client.name,
      email: client.email,
      phone: client.phone,
      serviceType: client.serviceType,
      projectDetails: client.message,
      projectId,
      developerId: developer ? developer._id : null,
      developerName: developer ? developer.name : '',
      startDate: startDate ? new Date(startDate) : new Date(),
      deadline: deadline ? new Date(deadline) : null,
      priority: priority || 'Medium',
      remarks: remarks || '',
      status: 'Assigned'
    });

    // Optionally update the client request status to Accepted/Assigned
    client.status = 'Accepted';
    await client.save();

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get all projects (admin)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get projects for a developer
exports.getProjectsByDeveloper = async (req, res) => {
  try {
    const { id } = req.params; // developerId
    const projects = await Project.find({ developerId: id }).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update project status
exports.updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Assigned', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const project = await Project.findByIdAndUpdate(id, { status }, { new: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update project (general edit)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const project = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
