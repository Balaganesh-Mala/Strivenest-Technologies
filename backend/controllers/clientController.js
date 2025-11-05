// controllers/clientController.js
const ClientRequest = require('../models/ClientRequest');

// Create quote
exports.createQuote = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message } = req.body;
    const quote = await ClientRequest.create({ name, email, phone, serviceType, message });
    res.status(201).json({ success: true, data: quote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get all quotes (admin)
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await ClientRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: quotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update status (e.g., Pending -> Accepted / Declined)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'Accepted', 'Declined'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const quote = await ClientRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found' });
    res.json({ success: true, data: quote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete quote
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await ClientRequest.findByIdAndDelete(id);
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found' });
    res.json({ success: true, message: 'Quote deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
