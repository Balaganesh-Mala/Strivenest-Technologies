// controllers/developerController.js
const User = require('../models/User');

// Get all developers (for admin dropdown)
exports.getDevelopers = async (req, res) => {
  try {
    const devs = await User.find({ role: 'Developer' }).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: devs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Add developer (admin)
exports.addDeveloper = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Developer already exists' });

    const dev = await User.create({ name, email, password, role: 'Developer' });
    res.status(201).json({ success: true, data: { id: dev._id, name: dev.name, email: dev.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
